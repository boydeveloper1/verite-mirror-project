import { AlertTriangle } from "lucide-react";

export const ReplicasWarning = () => {
  return (
    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 mb-4">
      <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
      <p className="text-xs text-amber-700 dark:text-amber-300">
        <strong>Watch Out For Cheap Replicas.</strong> <br/> Only Verité Scalp guarantees high quality product used by thousands to stop scalp inflammation and fast track hair growth. 
    </div>
  );
};
