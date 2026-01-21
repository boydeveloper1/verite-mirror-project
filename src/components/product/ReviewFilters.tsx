import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ReviewFiltersProps {
  categories: { value: string; label: string }[];
  selectedRating: number | null;
  selectedCategory: string;
  sortBy: string;
  onRatingChange: (rating: number | null) => void;
  onCategoryChange: (category: string) => void;
  onSortChange: (sort: string) => void;
  totalReviews: number;
  filteredCount: number;
  displayedCount: number;
}

const sortOptions = [
  { value: 'recent', label: 'Most Recent' },
  { value: 'helpful', label: 'Most Helpful' },
  { value: 'highest', label: 'Highest Rated' },
  { value: 'lowest', label: 'Lowest Rated' },
];

const ratingOptions = [
  { value: null, label: 'All' },
  { value: 5, label: '5' },
  { value: 4, label: '4' },
  { value: 3, label: '3' },
  { value: 2, label: '2' },
  { value: 1, label: '1' },
];

export const ReviewFilters = ({
  categories,
  selectedRating,
  selectedCategory,
  sortBy,
  onRatingChange,
  onCategoryChange,
  onSortChange,
  totalReviews,
  filteredCount,
  displayedCount,
}: ReviewFiltersProps) => {
  return (
    <div className="space-y-4 mb-8">
      {/* Rating Filter Pills */}
      <div className="space-y-2">
        <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Filter by Rating
        </label>
        <div className="flex flex-wrap gap-2">
          {ratingOptions.map((option) => (
            <button
              key={option.value ?? 'all'}
              onClick={() => onRatingChange(option.value)}
              className={cn(
                "inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                selectedRating === option.value
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-foreground hover:bg-secondary/80"
              )}
            >
              {option.label}
              {option.value && (
                <Star className="w-3.5 h-3.5 fill-current" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Category and Sort Dropdowns */}
      <div className="flex flex-wrap gap-3">
        <div className="min-w-[160px]">
          <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">
            Category
          </label>
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger className="w-full bg-background">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="bg-background border border-border z-50">
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="min-w-[160px]">
          <label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1.5 block">
            Sort By
          </label>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-full bg-background">
              <SelectValue placeholder="Most Recent" />
            </SelectTrigger>
            <SelectContent className="bg-background border border-border z-50">
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {displayedCount.toLocaleString()} of {totalReviews.toLocaleString()} reviews
      </div>
    </div>
  );
};
