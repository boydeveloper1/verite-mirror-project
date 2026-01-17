import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, createStorefrontCheckout } from '@/lib/shopify';
import { toast } from 'sonner';

// Bundle pricing tiers for different product types
const getBundlePricing = (productType: 'mist' | 'showerhead', basePrice: number) => {
  if (productType === 'showerhead') {
    return [
      { minQty: 1, maxQty: 1, pricePerUnit: basePrice }, // Single: $105
      { minQty: 2, maxQty: 2, pricePerUnit: basePrice * 0.95 }, // His & Hers: $99.75
      { minQty: 3, maxQty: Infinity, pricePerUnit: basePrice * 0.9 }, // Family Pack: $94.50
    ];
  }
  // Mist pricing
  return [
    { minQty: 1, maxQty: 1, pricePerUnit: basePrice }, // Starter: $40
    { minQty: 2, maxQty: 2, pricePerUnit: basePrice * 0.95 }, // Growth Duo: $38
    { minQty: 3, maxQty: 3, pricePerUnit: basePrice * 0.9 }, // Full Treatment: $36
    { minQty: 4, maxQty: Infinity, pricePerUnit: basePrice * 0.85 }, // Best for Routine: $34
  ];
};

// Calculate price per unit based on quantity and product type
const calculatePricePerUnit = (quantity: number, productType: 'mist' | 'showerhead', basePrice: number): number => {
  const tiers = getBundlePricing(productType, basePrice);
  const tier = tiers.find(t => quantity >= t.minQty && quantity <= t.maxQty);
  return tier ? tier.pricePerUnit : basePrice;
};

// Determine product type from product handle
const getProductType = (handle: string): 'mist' | 'showerhead' => {
  if (handle.includes('shower') || handle.includes('filter')) {
    return 'showerhead';
  }
  return 'mist';
};

// Get base price for product type
const getBasePrice = (productType: 'mist' | 'showerhead'): number => {
  return productType === 'showerhead' ? 105 : 40;
};

export interface ExtendedCartItem extends CartItem {
  productType: 'mist' | 'showerhead';
  basePrice: number;
}

interface CartStore {
  items: ExtendedCartItem[];
  cartId: string | null;
  checkoutUrl: string | null;
  isLoading: boolean;
  isOpen: boolean;
  
  // Actions
  addItem: (item: CartItem) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  removeItem: (variantId: string) => void;
  clearCart: () => void;
  setCartId: (cartId: string) => void;
  setCheckoutUrl: (url: string) => void;
  setLoading: (loading: boolean) => void;
  setOpen: (open: boolean) => void;
  createCheckout: (windowRef?: Window | null) => Promise<string | null>;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cartId: null,
      checkoutUrl: null,
      isLoading: false,
      isOpen: false,

      addItem: (item) => {
        const { items } = get();
        const existingItem = items.find(i => i.variantId === item.variantId);
        
        // Determine product type and base price
        const productHandle = item.product.node.handle;
        const productType = getProductType(productHandle);
        const basePrice = getBasePrice(productType);
        
        if (existingItem) {
          const newQuantity = existingItem.quantity + item.quantity;
          const newPricePerUnit = calculatePricePerUnit(newQuantity, productType, basePrice);
          
          set({
            items: items.map(i =>
              i.variantId === item.variantId
                ? { 
                    ...i, 
                    quantity: newQuantity,
                    price: {
                      amount: newPricePerUnit.toFixed(2),
                      currencyCode: i.price.currencyCode,
                    }
                  }
                : i
            )
          });
        } else {
          const extendedItem: ExtendedCartItem = {
            ...item,
            productType,
            basePrice,
          };
          set({ items: [...items, extendedItem] });
        }

        // Track Meta Pixel AddToCart event
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'AddToCart', {
            content_name: item.product.node.title,
            content_ids: [item.variantId],
            content_type: 'product',
            value: parseFloat(item.price.amount) * item.quantity,
            currency: item.price.currencyCode,
          });
        }
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }
        
        const { items } = get();
        const item = items.find(i => i.variantId === variantId);
        
        if (item) {
          // Recalculate price based on new quantity
          const newPricePerUnit = calculatePricePerUnit(quantity, item.productType, item.basePrice);
          
          set({
            items: items.map(i =>
              i.variantId === variantId 
                ? { 
                    ...i, 
                    quantity,
                    price: {
                      amount: newPricePerUnit.toFixed(2),
                      currencyCode: i.price.currencyCode,
                    }
                  } 
                : i
            )
          });
        }
      },

      removeItem: (variantId) => {
        set({
          items: get().items.filter(item => item.variantId !== variantId)
        });
      },

      clearCart: () => {
        set({ items: [], cartId: null, checkoutUrl: null });
      },

      setCartId: (cartId) => set({ cartId }),
      setCheckoutUrl: (checkoutUrl) => set({ checkoutUrl }),
      setLoading: (isLoading) => set({ isLoading }),
      setOpen: (isOpen) => set({ isOpen }),

      createCheckout: async (windowRef?: Window | null) => {
        const { items, setLoading, setCheckoutUrl, getTotalPrice } = get();
        if (items.length === 0) return null;

        // Track Meta Pixel InitiateCheckout event
        if (typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'InitiateCheckout', {
            content_ids: items.map(item => item.variantId),
            contents: items.map(item => ({
              id: item.variantId,
              quantity: item.quantity,
            })),
            num_items: items.reduce((sum, item) => sum + item.quantity, 0),
            value: getTotalPrice(),
            currency: items[0]?.price.currencyCode || 'USD',
          });
        }

        setLoading(true);
        try {
          const checkoutUrl = await createStorefrontCheckout(items);
          if (checkoutUrl) {
            setCheckoutUrl(checkoutUrl);
            // Use pre-opened window if provided, otherwise try to open new one
            if (windowRef && !windowRef.closed) {
              windowRef.location.href = checkoutUrl;
            } else {
              const newWindow = window.open(checkoutUrl, '_blank');
              if (!newWindow || newWindow.closed) {
                // Pop-up was blocked, show toast with link
                toast.info('Pop-up blocked', {
                  description: 'Click the button below to complete checkout',
                  action: {
                    label: 'Open Checkout',
                    onClick: () => window.open(checkoutUrl, '_blank'),
                  },
                  duration: 10000,
                });
              }
            }
            return checkoutUrl;
          }
          toast.error('Checkout failed', {
            description: 'Could not create checkout. Please try again.',
          });
          return null;
        } catch (error) {
          console.error('Failed to create checkout:', error);
          toast.error('Checkout failed', {
            description: 'Something went wrong. Please try again.',
          });
          return null;
        } finally {
          setLoading(false);
        }
      },

      getTotalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      getTotalPrice: () => {
        // Calculate total using the bundle price per unit * quantity
        return get().items.reduce((sum, item) => {
          const pricePerUnit = parseFloat(item.price.amount);
          return sum + (pricePerUnit * item.quantity);
        }, 0);
      },
    }),
    {
      name: 'verite-scalp-cart',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
