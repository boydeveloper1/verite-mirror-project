export const PaymentMethods = () => {
  return (
    <div className="space-y-2">
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
        Payment Methods
      </p>
      <div className="flex items-center gap-2 flex-wrap">
        {/* Visa */}
        <div className="h-6 w-10 bg-muted/50 rounded flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
          <svg viewBox="0 0 48 32" className="h-4 w-6">
            <rect fill="#1A1F71" width="48" height="32" rx="4"/>
            <text x="24" y="20" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">VISA</text>
          </svg>
        </div>
        
        {/* Mastercard */}
        <div className="h-6 w-10 bg-muted/50 rounded flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
          <svg viewBox="0 0 48 32" className="h-4 w-6">
            <rect fill="#EB001B" width="24" height="32" rx="4"/>
            <rect x="20" fill="#F79E1B" width="28" height="32" rx="4"/>
          </svg>
        </div>
        
        {/* PayPal */}
        <div className="h-6 w-10 bg-muted/50 rounded flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
          <svg viewBox="0 0 48 32" className="h-4 w-6">
            <rect fill="#003087" width="48" height="32" rx="4"/>
            <text x="24" y="19" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">PayPal</text>
          </svg>
        </div>
        
        {/* Apple Pay */}
        <div className="h-6 w-10 bg-muted/50 rounded flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
          <svg viewBox="0 0 48 32" className="h-4 w-6">
            <rect fill="#000" width="48" height="32" rx="4"/>
            <text x="24" y="19" fill="white" fontSize="7" fontWeight="500" textAnchor="middle"> Pay</text>
          </svg>
        </div>
        
        {/* Google Pay */}
        <div className="h-6 w-10 bg-muted/50 rounded flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
          <svg viewBox="0 0 48 32" className="h-4 w-6">
            <rect fill="#fff" stroke="#E0E0E0" width="47" height="31" rx="4"/>
            <text x="24" y="19" fill="#5F6368" fontSize="7" fontWeight="500" textAnchor="middle">G Pay</text>
          </svg>
        </div>
        
        {/* Stripe */}
        <div className="h-6 w-10 bg-muted/50 rounded flex items-center justify-center opacity-70 hover:opacity-100 transition-opacity">
          <svg viewBox="0 0 48 32" className="h-4 w-6">
            <rect fill="#635BFF" width="48" height="32" rx="4"/>
            <text x="24" y="19" fill="white" fontSize="8" fontWeight="bold" textAnchor="middle">Stripe</text>
          </svg>
        </div>
      </div>
    </div>
  );
};
