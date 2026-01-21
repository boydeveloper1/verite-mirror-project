import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useShopifyCookies } from '@shopify/hydrogen-react';
import { trackPageView } from '@/lib/shopify-analytics';

/**
 * Hook to initialize Shopify analytics tracking.
 * - Sets up Shopify cookies for session tracking
 * - Tracks page views on route changes
 * 
 * Usage: Call this hook once in App.tsx
 */
export function useShopifyAnalytics(): void {
  const location = useLocation();
  
  // Initialize Shopify tracking cookies
  useShopifyCookies({ hasUserConsent: true });

  // Track page views on route changes
  useEffect(() => {
    const url = `${window.location.origin}${location.pathname}${location.search}`;
    trackPageView(url);
  }, [location.pathname, location.search]);
}
