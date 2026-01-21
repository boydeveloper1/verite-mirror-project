import { useShopifyAnalytics } from '@/hooks/useShopifyAnalytics';

/**
 * Provider component that initializes Shopify analytics tracking.
 * Must be placed inside BrowserRouter for access to location.
 */
export function ShopifyAnalyticsProvider(): null {
  useShopifyAnalytics();
  return null;
}
