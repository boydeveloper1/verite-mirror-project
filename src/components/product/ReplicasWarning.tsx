import { AlertTriangle, Shield, CheckCircle } from "lucide-react";

export const ReplicasWarning = () => {
  return (
    <div className="my-8 p-6 rounded-2xl bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 border border-red-200 dark:border-red-800/50">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/50 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-red-800 dark:text-red-300 mb-2 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Beware of Cheap Replicas!
          </h3>
          <p className="text-sm text-red-700 dark:text-red-400 leading-relaxed mb-4">
            We've noticed unauthorized sellers offering fake VERITÉ SCALP products at lower prices. 
            These knockoffs may contain harmful ingredients that can damage your scalp and hair. 
            <strong> Only purchase from our official website</strong> to ensure you receive the authentic, 
            dermatologist-formulated product.
          </p>
          <div className="flex flex-wrap gap-4 text-xs">
            <span className="inline-flex items-center gap-1.5 text-accent font-medium">
              <CheckCircle className="w-4 h-4" />
              100% Authentic Guarantee
            </span>
            <span className="inline-flex items-center gap-1.5 text-accent font-medium">
              <CheckCircle className="w-4 h-4" />
              Lab Tested Formula
            </span>
            <span className="inline-flex items-center gap-1.5 text-accent font-medium">
              <CheckCircle className="w-4 h-4" />
              30-Day Money Back
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
