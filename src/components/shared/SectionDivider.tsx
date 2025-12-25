interface SectionDividerProps {
  variant?: "wave" | "line" | "gradient";
  className?: string;
}

export const SectionDivider = ({ variant = "line", className = "" }: SectionDividerProps) => {
  if (variant === "wave") {
    return (
      <div className={`w-full overflow-hidden ${className}`}>
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-12 md:h-16 fill-current text-secondary"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
        </svg>
      </div>
    );
  }

  if (variant === "gradient") {
    return (
      <div className={`w-full py-8 ${className}`}>
        <div className="container mx-auto px-4 md:px-10">
          <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        </div>
      </div>
    );
  }

  // Default line variant
  return (
    <div className={`w-full ${className}`}>
      <div className="container mx-auto px-4 md:px-10">
        <div className="h-px bg-border" />
      </div>
    </div>
  );
};
