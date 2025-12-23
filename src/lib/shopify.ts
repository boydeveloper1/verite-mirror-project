import { toast } from "sonner";

const SHOPIFY_API_VERSION = "2025-07";
const SHOPIFY_STORE_PERMANENT_DOMAIN = "lovable-project-xf971.myshopify.com";
const SHOPIFY_STOREFRONT_URL = `https://${SHOPIFY_STORE_PERMANENT_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = "260c226a5e1daf9a85b39eb082c9827a";

export interface ShopifyProduct {
  node: {
    id: string;
    title: string;
    description: string;
    handle: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: Array<{
        node: {
          url: string;
          altText: string | null;
        };
      }>;
    };
    variants: {
      edges: Array<{
        node: {
          id: string;
          title: string;
          price: {
            amount: string;
            currencyCode: string;
          };
          availableForSale: boolean;
          selectedOptions: Array<{
            name: string;
            value: string;
          }>;
        };
      }>;
    };
    options: Array<{
      name: string;
      values: string[];
    }>;
  };
}

const STOREFRONT_QUERY = `
  query GetProducts($first: Int!, $query: String) {
    products(first: $first, query: $query) {
      edges {
        node {
          id
          title
          description
          handle
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 5) {
            edges {
              node {
                url
                altText
              }
            }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                availableForSale
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
          options {
            name
            values
          }
        }
      }
    }
  }
`;

const GET_PRODUCT_BY_HANDLE = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
            selectedOptions {
              name
              value
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;

const CART_CREATE_MUTATION = `
  mutation cartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  price {
                    amount
                    currencyCode
                  }
                  product {
                    title
                    handle
                  }
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const CART_DISCOUNT_CODES_UPDATE = `
  mutation cartDiscountCodesUpdate($cartId: ID!, $discountCodes: [String!]!) {
    cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
      cart {
        id
        checkoutUrl
        discountCodes {
          code
          applicable
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// Determine the best discount code based on cart contents
function getBestDiscountCode(items: CartItem[]): string | null {
  // Group items by product type
  let mistCount = 0;
  let showerheadCount = 0;

  for (const item of items) {
    const handle = item.product.node.handle.toLowerCase();
    if (handle.includes('shower') || handle.includes('filter')) {
      showerheadCount += item.quantity;
    } else if (handle.includes('mist') || handle.includes('scalp')) {
      mistCount += item.quantity;
    }
  }

  // Determine best discount - prioritize higher discounts
  // Mist discounts: 4+ = 15%, 3 = 10%, 2 = 5%
  // Showerhead discounts: 3+ = 10%, 2 = 5%
  
  const discounts: { code: string; percentage: number }[] = [];

  if (mistCount >= 4) {
    discounts.push({ code: 'MIST-BEST-15', percentage: 15 });
  } else if (mistCount === 3) {
    discounts.push({ code: 'MIST-TRIO-10', percentage: 10 });
  } else if (mistCount === 2) {
    discounts.push({ code: 'MIST-DUO-5', percentage: 5 });
  }

  if (showerheadCount >= 3) {
    discounts.push({ code: 'SHOWER-FAMILY-10', percentage: 10 });
  } else if (showerheadCount === 2) {
    discounts.push({ code: 'SHOWER-DUO-5', percentage: 5 });
  }

  // Return the highest percentage discount
  if (discounts.length === 0) return null;
  discounts.sort((a, b) => b.percentage - a.percentage);
  return discounts[0].code;
}

export async function storefrontApiRequest(query: string, variables: Record<string, unknown> = {}) {
  const response = await fetch(SHOPIFY_STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  if (response.status === 402) {
    toast.error("Shopify: Payment required", {
      description: "Shopify API access requires an active Shopify billing plan.",
    });
    return null;
  }

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(`Error calling Shopify: ${data.errors.map((e: { message: string }) => e.message).join(", ")}`);
  }

  return data;
}

export async function fetchProducts(first: number = 20, query?: string): Promise<ShopifyProduct[]> {
  const data = await storefrontApiRequest(STOREFRONT_QUERY, { first, query });
  if (!data) return [];
  return data.data.products.edges;
}

export async function fetchProductByHandle(handle: string) {
  const data = await storefrontApiRequest(GET_PRODUCT_BY_HANDLE, { handle });
  if (!data) return null;
  return data.data.productByHandle;
}

export interface CartItem {
  product: ShopifyProduct;
  variantId: string;
  variantTitle: string;
  price: {
    amount: string;
    currencyCode: string;
  };
  quantity: number;
  selectedOptions: Array<{
    name: string;
    value: string;
  }>;
}

export async function createStorefrontCheckout(items: CartItem[]): Promise<string> {
  try {
    const lines = items.map((item) => ({
      quantity: item.quantity,
      merchandiseId: item.variantId,
    }));

    const cartData = await storefrontApiRequest(CART_CREATE_MUTATION, {
      input: {
        lines,
      },
    });

    if (!cartData) {
      throw new Error("Failed to create cart");
    }

    if (cartData.data.cartCreate.userErrors.length > 0) {
      throw new Error(
        `Cart creation failed: ${cartData.data.cartCreate.userErrors.map((e: { message: string }) => e.message).join(", ")}`,
      );
    }

    let cart = cartData.data.cartCreate.cart;

    if (!cart.checkoutUrl) {
      throw new Error("No checkout URL returned from Shopify");
    }

    // Apply discount code if applicable
    const discountCode = getBestDiscountCode(items);
    if (discountCode) {
      const discountData = await storefrontApiRequest(CART_DISCOUNT_CODES_UPDATE, {
        cartId: cart.id,
        discountCodes: [discountCode],
      });

      if (discountData?.data?.cartDiscountCodesUpdate?.cart?.checkoutUrl) {
        cart = discountData.data.cartDiscountCodesUpdate.cart;
      }
    }

    const url = new URL(cart.checkoutUrl);
    url.searchParams.set("channel", "online_store");
    return url.toString();
  } catch (error) {
    console.error("Error creating storefront checkout:", error);
    throw error;
  }
}
