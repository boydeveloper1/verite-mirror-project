import {
  sendShopifyAnalytics,
  getClientBrowserParameters,
  AnalyticsEventName,
  type ShopifyPageViewPayload,
  type ShopifyAddToCartPayload,
} from '@shopify/hydrogen-react';

// Shopify shop configuration
const SHOPIFY_STORE_PERMANENT_DOMAIN = 'lovable-project-xf971.myshopify.com';

// Extract shop ID from domain (format: gid://shopify/Shop/{id})
const SHOP_ID = 'gid://shopify/Shop/95542050116';

const shopData = {
  shopId: SHOP_ID,
  currency: 'USD' as const,
  acceptedLanguage: 'EN' as const,
  hydrogenSubchannelId: '0',
};

// Generate a unique page load ID for tracking
function generatePageLoadId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Track page view event (for Sessions metric)
export function trackPageView(url: string): void {
  try {
    const payload = {
      ...getClientBrowserParameters(),
      ...shopData,
      hasUserConsent: true,
      shopifySalesChannel: 'headless' as const,
      storefrontId: undefined,
      pageType: 'page',
      resourceId: null,
      canonicalUrl: url,
    } as ShopifyPageViewPayload;

    sendShopifyAnalytics({
      eventName: AnalyticsEventName.PAGE_VIEW,
      payload,
    });
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
}

// Track product view event
export function trackProductView(
  product: {
    id: string;
    title: string;
    handle: string;
    vendor?: string;
  },
  variant: {
    id: string;
    title: string;
    price: { amount: string; currencyCode: string };
  },
  url: string
): void {
  try {
    const payload = {
      ...getClientBrowserParameters(),
      ...shopData,
      hasUserConsent: true,
      shopifySalesChannel: 'headless' as const,
      storefrontId: undefined,
      pageType: 'product',
      resourceId: product.id,
      canonicalUrl: url,
      products: [
        {
          productGid: product.id,
          variantGid: variant.id,
          name: product.title,
          variantName: variant.title,
          brand: product.vendor || 'Verité',
          category: undefined,
          price: variant.price.amount,
          sku: undefined,
          quantity: 1,
        },
      ],
    } as ShopifyPageViewPayload;

    sendShopifyAnalytics({
      eventName: AnalyticsEventName.PAGE_VIEW,
      payload,
    });
  } catch (error) {
    console.error('Failed to track product view:', error);
  }
}

// Track add to cart event
export function trackAddToCart(
  product: {
    id: string;
    title: string;
    handle: string;
    vendor?: string;
  },
  variant: {
    id: string;
    title: string;
    price: { amount: string; currencyCode: string };
  },
  quantity: number,
  cartId?: string
): void {
  try {
    const payload = {
      ...getClientBrowserParameters(),
      ...shopData,
      hasUserConsent: true,
      shopifySalesChannel: 'headless' as const,
      storefrontId: undefined,
      cartId: cartId || generatePageLoadId(),
      totalValue: parseFloat(variant.price.amount) * quantity,
      products: [
        {
          productGid: product.id,
          variantGid: variant.id,
          name: product.title,
          variantName: variant.title,
          brand: product.vendor || 'Verité',
          category: undefined,
          price: variant.price.amount,
          sku: undefined,
          quantity,
        },
      ],
    } as ShopifyAddToCartPayload;

    sendShopifyAnalytics({
      eventName: AnalyticsEventName.ADD_TO_CART,
      payload,
    });
  } catch (error) {
    console.error('Failed to track add to cart:', error);
  }
}

// Track checkout initiation
export function trackInitiateCheckout(
  cartItems: Array<{
    product: {
      node: {
        id: string;
        title: string;
        handle: string;
      };
    };
    variantId: string;
    variantTitle: string;
    price: { amount: string; currencyCode: string };
    quantity: number;
  }>,
  totalValue: number,
  cartId?: string
): void {
  try {
    const products = cartItems.map((item) => ({
      productGid: item.product.node.id,
      variantGid: item.variantId,
      name: item.product.node.title,
      variantName: item.variantTitle,
      brand: 'Verité',
      category: undefined,
      price: item.price.amount,
      sku: undefined,
      quantity: item.quantity,
    }));

    const payload = {
      ...getClientBrowserParameters(),
      ...shopData,
      hasUserConsent: true,
      shopifySalesChannel: 'headless' as const,
      storefrontId: undefined,
      cartId: cartId || generatePageLoadId(),
      totalValue,
      products,
    } as ShopifyAddToCartPayload;

    sendShopifyAnalytics({
      eventName: AnalyticsEventName.ADD_TO_CART,
      payload,
    });
  } catch (error) {
    console.error('Failed to track checkout initiation:', error);
  }
}
