import { useState, useEffect } from "react";
import { X, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const educationalNuggets = [
  {
    title: "Did you know?",
    message: "Scalp inflammation is the #1 hidden cause of hair loss in women with protective styles. Fix it first!",
  },
  {
    title: "Hair Growth Secret",
    message: "70% of hair shedding can be reduced in just 3 weeks by addressing scalp inflammation.",
  },
  {
    title: "Hard Water Alert",
    message: "Chlorine and heavy metals in tap water irritate your scalp daily, blocking hair follicles.",
  },
  {
    title: "Expert Tip",
    message: "Dermatologists say: treat your scalp environment BEFORE using any growth products.",
  },
  {
    title: "Root Cause",
    message: "A healthy scalp is the foundation for thick, strong hair. Most growth products ignore this.",
  },
  {
    title: "Why Serums Fail",
    message: "Your growth serum won't work if inflammation is blocking absorption. Clear the path first.",
  },
  {
    title: "Real Results",
    message: "98% of VERITÉ customers recommend us. Join 5,000+ women regrowing their edges.",
  },
  {
    title: "Urgent Warning",
    message: "Untreated scalp inflammation can permanently damage hair follicles. Don't wait.",
  },
  {
    title: "Protective Style Tip",
    message: "Braids, wigs & extensions trap bacteria. Daily scalp care prevents hidden damage.",
  },
  {
    title: "Game Changer",
    message: "Customers see visible edge regrowth in 4-8 weeks. Your hair is waiting to grow.",
  },
  {
    title: "Scalp Science",
    message: "Your scalp has 100,000+ hair follicles. Inflammation can block nutrients to ALL of them.",
  },
  {
    title: "Water Quality Matters",
    message: "Hard water leaves mineral deposits on your scalp that suffocate hair follicles.",
  },
  {
    title: "Breaking the Cycle",
    message: "Itchy scalp → scratching → inflammation → hair loss. Break the cycle at the source.",
  },
  {
    title: "Product Absorption",
    message: "An inflamed scalp absorbs only 20% of hair products. A healthy scalp absorbs 80%+.",
  },
  {
    title: "Customer Favorite",
    message: "Our Scalp Soothing Mist has helped 5,000+ women regrow their edges naturally.",
  },
  {
    title: "Quick Relief",
    message: "Feel instant cooling relief within seconds of application. Your scalp will thank you.",
  },
  {
    title: "Natural Ingredients",
    message: "Tea Tree Oil, Aloe Vera & Peppermint work together to calm and heal your scalp.",
  },
  {
    title: "No More Buildup",
    message: "Product buildup clogs follicles and causes inflammation. Start with a clean slate.",
  },
  {
    title: "Edge Regrowth",
    message: "Visible edge regrowth starts in as little as 4 weeks with consistent scalp care.",
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
