import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { ShoppingBag } from "lucide-react";

const firstNames = [
  "Sarah", "Emily", "Jessica", "Ashley", "Amanda", "Brittany", "Stephanie", "Jennifer",
  "Michelle", "Nicole", "Lauren", "Megan", "Rachel", "Samantha", "Katherine", "Christina",
  "Danielle", "Heather", "Elizabeth", "Melissa", "Tiffany", "Rebecca", "Amy", "Angela",
  "Maria", "Diana", "Lisa", "Patricia", "Linda", "Barbara", "Susan", "Margaret"
];

const cities = [
  "New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio",
  "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville", "Fort Worth", "Columbus",
  "Charlotte", "Indianapolis", "Seattle", "Denver", "Boston", "Nashville", "Atlanta",
  "Portland", "Miami", "Tampa", "Minneapolis", "Las Vegas", "Sacramento", "Raleigh",
  "Orlando", "San Francisco", "Detroit", "Memphis", "Cleveland", "Kansas City", "Salt Lake City"
];

const products = [
  "Scalp Soothing Mist",
  "Revitalizing Shower Filter",
  "Complete Scalp Care Bundle"
];

const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const PurchaseNotifications = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Check if user has dismissed notifications this session
    const dismissed = sessionStorage.getItem("purchaseNotificationsDismissed");
    if (dismissed) return;

    const showNotification = () => {
      const name = getRandomItem(firstNames);
      const city = getRandomItem(cities);
      const product = getRandomItem(products);

      toast(
        <div className="flex items-start gap-3">
          <div className="p-2 bg-accent/10 rounded-full">
            <ShoppingBag className="w-4 h-4 text-accent" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">
              {name} from {city}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              just purchased {product}
            </p>
          </div>
        </div>,
        {
          duration: 4000,
          position: "bottom-left",
          className: "border border-border shadow-lg",
        }
      );

      // Schedule next notification (random 45-90 seconds)
      const nextDelay = 45000 + Math.random() * 45000;
      timeoutRef.current = setTimeout(showNotification, nextDelay);
    };

    // Initial delay before first notification (15-30 seconds)
    const initialDelay = isFirstRender.current ? 15000 + Math.random() * 15000 : 0;
    isFirstRender.current = false;

    timeoutRef.current = setTimeout(showNotification, initialDelay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return null;
};
