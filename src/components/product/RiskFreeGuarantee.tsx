import { Shield, CheckCircle, RefreshCw, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface RiskFreeGuaranteeProps {
  variant?: "badge" | "seal" | "expanded";
}

export const RiskFreeGuarantee = ({ variant = "badge" }: RiskFreeGuaranteeProps) => {
  if (variant === "badge") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 px-3 py-1.5 rounded-lg text-sm font-medium"
      >
        <Shield className="w-4 h-4 fill-green-100" />
        <span>Try Risk-Free</span>
      </motion.div>
    );
  }

  if (variant === "seal") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl"
      >
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
            <Shield className="w-6 h-6 text-white fill-white/20" />
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
            <CheckCircle className="w-3.5 h-3.5 text-yellow-800" />
          </div>
        </div>
        <div className="flex-1">
          <p className="font-semibold text-green-800 text-sm">100% Satisfaction Guaranteed</p>
          <p className="text-xs text-green-600">30-day money-back • No questions asked</p>
        </div>
      </motion.div>
    );
  }

  // Expanded variant
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="guarantee" className="border rounded-xl bg-gradient-to-r from-green-50/50 to-emerald-50/50 border-green-200/50">
        <AccordionTrigger className="px-4 py-3 hover:no-underline">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-foreground">Our 30-Day Guarantee</p>
              <p className="text-xs text-muted-foreground">100% satisfaction or your money back</p>
            </div>
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-4">
          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3">
              <div className="p-1.5 bg-green-100 rounded-full">
                <RefreshCw className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-sm">Full Refund Within 30 Days</p>
                <p className="text-xs text-muted-foreground">Not satisfied? Get a complete refund, no questions asked.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-1.5 bg-green-100 rounded-full">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-sm">No Restocking Fees</p>
                <p className="text-xs text-muted-foreground">We believe in our products. You won't pay a cent for returns.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-1.5 bg-green-100 rounded-full">
                <Clock className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-sm">Easy Return Process</p>
                <p className="text-xs text-muted-foreground">Simple email to our support team. We handle everything.</p>
              </div>
            </div>

            <Link 
              to="/refund-policy" 
              className="inline-block text-sm text-accent hover:underline mt-2"
            >
              View full refund policy →
            </Link>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
