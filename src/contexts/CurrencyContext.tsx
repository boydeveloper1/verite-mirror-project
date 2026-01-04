import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CurrencyInfo {
  code: string;
  symbol: string;
  rate: number;
}

interface CurrencyContextType {
  currency: CurrencyInfo;
  formatPrice: (amountUSD: number | string) => string;
  isLoading: boolean;
}

const defaultCurrency: CurrencyInfo = {
  code: "USD",
  symbol: "$",
  rate: 1,
};

const CurrencyContext = createContext<CurrencyContextType>({
  currency: defaultCurrency,
  formatPrice: (amount) => `$${parseFloat(String(amount)).toFixed(2)}`,
  isLoading: true,
});

// Country to currency mapping
const countryCurrencyMap: Record<string, { code: string; symbol: string }> = {
  US: { code: "USD", symbol: "$" },
  CA: { code: "CAD", symbol: "CA$" },
  GB: { code: "GBP", symbol: "£" },
  UK: { code: "GBP", symbol: "£" },
  DE: { code: "EUR", symbol: "€" },
  FR: { code: "EUR", symbol: "€" },
  ES: { code: "EUR", symbol: "€" },
  IT: { code: "EUR", symbol: "€" },
  NL: { code: "EUR", symbol: "€" },
  BE: { code: "EUR", symbol: "€" },
  AT: { code: "EUR", symbol: "€" },
  PT: { code: "EUR", symbol: "€" },
  IE: { code: "EUR", symbol: "€" },
  FI: { code: "EUR", symbol: "€" },
  GR: { code: "EUR", symbol: "€" },
  AU: { code: "AUD", symbol: "A$" },
  NZ: { code: "NZD", symbol: "NZ$" },
  NG: { code: "NGN", symbol: "₦" },
  GH: { code: "GHS", symbol: "₵" },
  KE: { code: "KES", symbol: "KSh" },
  ZA: { code: "ZAR", symbol: "R" },
  IN: { code: "INR", symbol: "₹" },
  JP: { code: "JPY", symbol: "¥" },
  CN: { code: "CNY", symbol: "¥" },
  KR: { code: "KRW", symbol: "₩" },
  MX: { code: "MXN", symbol: "MX$" },
  BR: { code: "BRL", symbol: "R$" },
  AE: { code: "AED", symbol: "د.إ" },
  SA: { code: "SAR", symbol: "﷼" },
  SG: { code: "SGD", symbol: "S$" },
  HK: { code: "HKD", symbol: "HK$" },
  CH: { code: "CHF", symbol: "CHF" },
  SE: { code: "SEK", symbol: "kr" },
  NO: { code: "NOK", symbol: "kr" },
  DK: { code: "DKK", symbol: "kr" },
  PL: { code: "PLN", symbol: "zł" },
  PH: { code: "PHP", symbol: "₱" },
  MY: { code: "MYR", symbol: "RM" },
  TH: { code: "THB", symbol: "฿" },
  ID: { code: "IDR", symbol: "Rp" },
};

// Cache keys
const CURRENCY_CACHE_KEY = "verite_currency_cache";
const RATES_CACHE_KEY = "verite_exchange_rates";
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

interface CacheData {
  data: unknown;
  timestamp: number;
}

function getFromCache<T>(key: string): T | null {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    const parsed: CacheData = JSON.parse(cached);
    if (Date.now() - parsed.timestamp > CACHE_DURATION) {
      localStorage.removeItem(key);
      return null;
    }
    return parsed.data as T;
  } catch {
    return null;
  }
}

function setToCache(key: string, data: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
  } catch {
    // Storage full or unavailable
  }
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyInfo>(defaultCurrency);
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeCurrency = async () => {
      try {
        // Check cache first
        const cachedCurrency = getFromCache<CurrencyInfo>(CURRENCY_CACHE_KEY);
        const cachedRates = getFromCache<Record<string, number>>(RATES_CACHE_KEY);

        if (cachedCurrency && cachedRates) {
          setCurrency(cachedCurrency);
          setExchangeRates(cachedRates);
          setIsLoading(false);
          return;
        }

        // Detect country via IP
        let countryCode = "US";
        try {
          const geoResponse = await fetch("https://ipapi.co/json/", {
            signal: AbortSignal.timeout(3000),
          });
          if (geoResponse.ok) {
            const geoData = await geoResponse.json();
            countryCode = geoData.country_code || "US";
          }
        } catch {
          // Fallback to USD if geolocation fails
          console.log("Geolocation failed, defaulting to USD");
        }

        // Get currency for country
        const currencyData = countryCurrencyMap[countryCode] || { code: "USD", symbol: "$" };

        // Fetch exchange rates
        let rates: Record<string, number> = { USD: 1 };
        try {
          const ratesResponse = await fetch(
            "https://open.er-api.com/v6/latest/USD",
            { signal: AbortSignal.timeout(5000) }
          );
          if (ratesResponse.ok) {
            const ratesData = await ratesResponse.json();
            if (ratesData.rates) {
              rates = ratesData.rates;
            }
          }
        } catch {
          console.log("Exchange rates fetch failed, using 1:1 rate");
        }

        const rate = rates[currencyData.code] || 1;
        const newCurrency: CurrencyInfo = {
          code: currencyData.code,
          symbol: currencyData.symbol,
          rate,
        };

        setCurrency(newCurrency);
        setExchangeRates(rates);
        setToCache(CURRENCY_CACHE_KEY, newCurrency);
        setToCache(RATES_CACHE_KEY, rates);
      } catch (error) {
        console.error("Currency initialization error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeCurrency();
  }, []);

  const formatPrice = (amountUSD: number | string): string => {
    const amount = parseFloat(String(amountUSD));
    if (isNaN(amount)) return `${currency.symbol}0.00`;

    const convertedAmount = amount * currency.rate;

    // Format based on currency
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency.code,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(convertedAmount);
    } catch {
      return `${currency.symbol}${convertedAmount.toFixed(2)}`;
    }
  };

  return (
    <CurrencyContext.Provider value={{ currency, formatPrice, isLoading }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
