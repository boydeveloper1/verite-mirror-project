import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, ZoomIn, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface ProductImage {
  url: string;
  altText: string | null;
}

interface ProductImageGalleryProps {
  images: ProductImage[];
  productTitle: string;
  productHandle?: string;
}

export const ProductImageGallery = ({ images, productTitle, productHandle }: ProductImageGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const currentImage = images[selectedIndex];
  
  // Only show bestseller badge for the mist product, not the shower head
  const isShowerHead = productHandle?.includes("shower-filter") || productHandle?.includes("shower-head");
  const showBestsellerBadge = !isShowerHead;

  return (
    <div className="space-y-3 md:space-y-4 max-w-[80%] mx-auto lg:max-w-full lg:mx-0 lg:scale-[0.8] lg:origin-top-left">
      {/* Main Image Container */}
      <div className="relative w-full aspect-square bg-secondary rounded-lg overflow-hidden border border-border shadow-soft group">
        {/* Best Seller Badge - Only for Mist */}
        {showBestsellerBadge && (
          <div className="absolute top-2 left-2 md:top-3 md:left-3 z-10 animate-fade-in">
            <span className="bg-accent text-accent-foreground text-[10px] md:text-xs font-semibold px-2 py-1 md:px-3 md:py-1.5 rounded shadow-lg">
              Best Seller
            </span>
          </div>
        )}

        {/* Main Image */}
        {currentImage ? (
          <img
            src={currentImage.url}
            alt={currentImage.altText || productTitle}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No image available
          </div>
        )}

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-background"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-background"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </>
        )}

        {/* Zoom Button */}
        <button
          onClick={() => setIsZoomed(true)}
          className="absolute bottom-2 right-2 md:bottom-3 md:right-3 flex items-center gap-1 md:gap-1.5 px-2 py-1 md:px-3 md:py-1.5 rounded bg-background/80 backdrop-blur-sm text-[10px] md:text-xs font-semibold text-accent hover:bg-background transition-colors"
        >
          <ZoomIn className="w-3 h-3 md:w-3.5 md:h-3.5" />
          Zoom
        </button>

        {/* Image Counter (Mobile) */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3 md:hidden bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-medium">
            {selectedIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div className="flex gap-1.5 md:gap-2 overflow-x-auto pb-2 md:grid md:grid-cols-6 md:overflow-visible scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "flex-shrink-0 w-14 h-14 md:w-full md:h-auto md:aspect-square rounded overflow-hidden border-2 transition-all",
                selectedIndex === index
                  ? "border-accent opacity-100"
                  : "border-transparent opacity-70 hover:opacity-100 hover:border-border"
              )}
            >
              <img
                src={image.url}
                alt={image.altText || `${productTitle} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Zoom Modal */}
      <Dialog open={isZoomed} onOpenChange={setIsZoomed}>
        <DialogContent className="max-w-4xl w-full p-0 bg-background border-none">
          <VisuallyHidden>
            <DialogTitle>Product Image Zoom</DialogTitle>
          </VisuallyHidden>
          <div className="relative">
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-background transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {currentImage && (
              <img
                src={currentImage.url}
                alt={currentImage.altText || productTitle}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            )}

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                {selectedIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
