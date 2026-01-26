import { useState, useEffect } from "react";
import { X, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const educationalNuggets = [
  {
    title: "Did you know?",
    message: "Chlorine in tap water damages your skin barrier daily, triggering eczema, psoriasis, and rosacea flare-ups.",
  },
  {
    title: "Hard Water Alert",
    message: "Mineral deposits from hard water clog pores and cause dryness, itching, and chronic irritation.",
  },
  {
    title: "Expert Tip",
    message: "Dermatologists recommend filtering shower water to reduce skin inflammation and sensitivity.",
  },
  {
    title: "Root Cause",
    message: "Your expensive skincare can't work if chlorine is damaging your skin barrier every shower.",
  },
  {
    title: "Why Creams Fail",
    message: "Moisturizers can't heal skin that's being attacked by chlorine and heavy metals daily.",
  },
  {
    title: "Real Results",
    message: "Most customers report reduced redness and calmer skin within the first 2 weeks of use.",
  },
  {
    title: "Urgent Warning",
    message: "Unfiltered shower water makes eczema, psoriasis, and rosacea progressively worse over time.",
  },
  {
    title: "Skin Science",
    message: "Chlorine strips natural oils from your skin, leaving it dry, irritated, and vulnerable.",
  },
  {
    title: "Water Quality Matters",
    message: "99% of tap water contains chlorine and heavy metals that irritate sensitive skin.",
  },
  {
    title: "Breaking the Cycle",
    message: "Dry skin → itching → scratching → inflammation → flare-ups. Break the cycle at the source.",
  },
  {
    title: "Product Absorption",
    message: "Damaged skin barriers absorb only 20% of skincare products. Healthy skin absorbs 80%+.",
  },
  {
    title: "Customer Favorite",
    message: "Join 14,000+ customers who transformed their skin by changing their shower water.",
  },
  {
    title: "Quick Relief",
    message: "Feel the difference from your very first shower. Softer water, calmer skin, less irritation.",
  },
  {
    title: "15-Stage Filtration",
    message: "Our shower head removes chlorine, heavy metals, and sediments that trigger skin conditions.",
  },
  {
    title: "Eczema Relief",
    message: "Customers with eczema report 70% fewer flare-ups after switching to filtered shower water.",
  },
  {
    title: "Psoriasis Solution",
    message: "Hard water worsens psoriasis plaques. Filtered water helps calm and reduce inflammation.",
  },
  {
    title: "Rosacea Recovery",
    message: "Chlorine triggers rosacea redness. Remove it at the source for visibly calmer skin.",
  },
  {
    title: "Acne Prevention",
    message: "Chlorine and hard water clog pores and disrupt your skin's natural balance. Filter it out.",
  },
  {
    title: "Money-Back Guarantee",
    message: "Try risk-free with our 30-day money-back guarantee. Your satisfaction is our priority.",
  },
];

export const EducationalPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentNugget, setCurrentNugget] = useState(educationalNuggets[0]);
  const [nuggetIndex, setNuggetIndex] = useState(0);

  useEffect(() => {
    // Show first popup after 5 seconds
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    return () => clearTimeout(initialTimer);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Auto-hide after 6 seconds
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      
      // Show next nugget after 12 seconds
      setTimeout(() => {
        const nextIndex = (nuggetIndex + 1) % educationalNuggets.length;
        setNuggetIndex(nextIndex);
        setCurrentNugget(educationalNuggets[nextIndex]);
        setIsVisible(true);
      }, 12000);
    }, 6000);

    return () => clearTimeout(hideTimer);
  }, [isVisible, nuggetIndex]);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: 100, y: 20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-50 max-w-sm"
        >
          <div className="bg-card border border-accent/30 rounded-xl shadow-2xl overflow-hidden">
            <div className="bg-accent/10 px-4 py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-accent" />
                <span className="text-sm font-semibold text-accent">{currentNugget.title}</span>
              </div>
              <button
                onClick={handleClose}
                className="text-muted-foreground hover:text-foreground transition-colors p-1 hover:bg-muted rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="px-4 py-3">
              <p className="text-sm text-foreground leading-relaxed">
                {currentNugget.message}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
