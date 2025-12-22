import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroBannerProps {
  title: string;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
  backgroundImage?: string;
}

const defaultBg = "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=1920&h=600&fit=crop";

export const PageHeroBanner = ({ 
  title, 
  subtitle, 
  breadcrumbs, 
  backgroundImage 
}: PageHeroBannerProps) => {
  return (
    <section 
      className="relative min-h-[300px] md:min-h-[400px] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage || defaultBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70" />
      
      {/* Content */}
      <div className="relative z-10 text-center px-4 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center justify-center gap-2 text-sm text-white/80 mb-6 animate-fade-in">
          <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
          {breadcrumbs.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-white/50" />
              {item.href ? (
                <Link to={item.href} className="hover:text-white transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-white font-medium">{item.label}</span>
              )}
            </div>
          ))}
        </nav>

        {/* Title */}
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-wide animate-fade-in-up">
          {title}
        </h1>
        
        {/* Subtitle */}
        {subtitle && (
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto animate-fade-in-up [animation-delay:200ms]">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};
