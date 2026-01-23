import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Snowflake, 
  TrendingUp, 
  Calendar, 
  Leaf,
  Star,
  CheckCircle,
  Droplets,
  Wrench,
  Zap,
  Shield,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ThumbsUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { showerHeadReviews, showerHeadReviewCategories, TOTAL_SHOWER_HEAD_REVIEWS, SHOWER_HEAD_RATING } from "@/data/showerHeadReviews";
import { mistReviews, mistReviewCategories, TOTAL_MIST_REVIEWS, MIST_RATING } from "@/data/mistReviews";
import { ReviewFilters } from "./ReviewFilters";

interface ProductTabsProps {
  productHandle?: string;
}

export const ProductTabs = ({ productHandle }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const isShowerHead = productHandle?.includes("shower-filter") || productHandle?.includes("shower-head");
  const reviewCount = isShowerHead ? "14,520" : "127";
  const rating = isShowerHead ? "5.0" : "4.9";

  return (
    <div className="mt-8 md:mt-12 lg:mt-16">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto flex-nowrap bg-transparent border-b border-border rounded-none h-auto p-0 gap-0 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
          {[
            { value: "overview", label: "Overview" },
            { value: "reviews", label: `Reviews (${reviewCount})` },
            { value: "how-to-use", label: isShowerHead ? "Installation" : "How to Use" },
            { value: "ingredients", label: isShowerHead ? "Filtration Stages" : "Ingredients" },
            { value: "timeline", label: "Timeline" },
            { value: "faq", label: "FAQ" },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              data-reviews-tab={tab.value === "reviews" ? true : undefined}
              className={cn(
                "px-3 md:px-4 lg:px-6 py-3 md:py-4 text-xs md:text-sm font-semibold text-muted-foreground rounded-none border-b-[3px] border-transparent data-[state=active]:border-accent data-[state=active]:text-accent data-[state=active]:bg-transparent transition-colors whitespace-nowrap",
                "hover:text-accent hover:bg-secondary/50"
              )}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="py-6 md:py-8 lg:py-10">
          <TabsContent value="overview" className="mt-0">
            {isShowerHead ? <ShowerFilterOverviewTab /> : <MistOverviewTab />}
          </TabsContent>
          <TabsContent value="reviews" className="mt-0">
            {isShowerHead ? <ShowerFilterReviewsTab /> : <MistReviewsTab />}
          </TabsContent>
          <TabsContent value="how-to-use" className="mt-0">
            {isShowerHead ? <ShowerFilterInstallationTab /> : <MistHowToUseTab />}
          </TabsContent>
          <TabsContent value="ingredients" className="mt-0">
            {isShowerHead ? <ShowerFilterStagesTab /> : <MistIngredientsTab />}
          </TabsContent>
          <TabsContent value="timeline" className="mt-0">
            {isShowerHead ? <ShowerFilterTimelineTab /> : <MistTimelineTab />}
          </TabsContent>
          <TabsContent value="faq" className="mt-0">
            {isShowerHead ? <ShowerFilterFAQTab /> : <MistFAQTab />}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

// ============================================
// MIST PRODUCT TABS (Existing Content)
// ============================================

const MistOverviewTab = () => {
  const benefits = [
    { icon: Snowflake, title: "Instant Cooling Relief", description: "Feel the soothing effect within minutes. Perfect for post-installation scalp pain or daily itch under wigs." },
    { icon: TrendingUp, title: "Clinically Observed Results", description: "70% reduction in shedding. Visible baby hairs by week 4. Full edge recovery by week 8." },
    { icon: Calendar, title: "Lightweight, Non-Greasy", description: "Spray twice daily without buildup. Works under wigs, braids, and natural hair." },
    { icon: Leaf, title: "Dermatologist-Formulated", description: "Aloe, tea tree oil, peppermint. Clean, natural, clinically tested. No harsh chemicals." },
  ];

  const useCases = [
    "Wig wearers experiencing edge loss",
    "Women with braids experiencing tension damage",
    "Anyone with excessive shedding",
    "Natural hair seekers struggling with edge health",
    "Those who've tried growth products with no results",
    "People with inflamed, irritated, itchy scalps",
  ];

  return (
    <div className="max-w-4xl space-y-10">
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Why VERITÉ SCALP Soothing Mist Works</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>VERITÉ SCALP Soothing Mist is the missing foundation every scalp care routine needs. We don't make growth promises. We stop the problem preventing growth: <strong className="text-foreground">inflammation</strong>.</p>
          <p>When your scalp is calm and healthy, hair grows naturally. That's the science. That's the promise.</p>
          <p>Dermatologist-formulated and clinically tested, our proprietary blend reduces scalp inflammation in 2-3 weeks, allowing dormant follicles to reactivate and hair to grow back stronger.</p>
        </div>
      </section>
      <section>
        <h3 className="text-xl font-bold text-primary mb-4">The Problem Nobody Talks About</h3>
        <ul className="space-y-2 text-muted-foreground">
          {["Your scalp is stressed from tight braids, wigs, stress, and buildup", "That stress triggers inflammation", "Inflammation puts your hair follicles in \"survival mode\"", "Nothing you apply can work on an inflamed, blocked scalp", "Result: shedding, thinning, hair loss that feels permanent"].map((item, index) => (
            <li key={index} className="flex items-start gap-2"><span className="text-accent mt-1">•</span><span>{item}</span></li>
          ))}
        </ul>
      </section>
      <section>
        <h3 className="text-xl font-bold text-primary mb-6">What Makes This Different</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="p-5 rounded-lg bg-secondary/50 border border-border">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center"><benefit.icon className="w-5 h-5 text-accent" /></div>
                <h4 className="font-semibold text-foreground">{benefit.title}</h4>
              </div>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h3 className="text-xl font-bold text-primary mb-4">Perfect For</h3>
        <ul className="grid sm:grid-cols-2 gap-2">
          {useCases.map((useCase, index) => (
            <li key={index} className="flex items-center gap-2 text-muted-foreground"><CheckCircle className="w-4 h-4 text-accent flex-shrink-0" /><span>{useCase}</span></li>
          ))}
        </ul>
      </section>
    </div>
  );
};

const MistHowToUseTab = () => {
  const steps = [
    { number: 1, title: "Prep", description: "Hold the bottle 4-6 inches from your scalp. This ensures even misting and proper absorption." },
    { number: 2, title: "Apply", description: "Spray along your hairline, edges, and anywhere inflamed. Pay special attention to parting lines and areas of tension from wigs/braids." },
    { number: 3, title: "Massage", description: "Gently massage the mist into your scalp for 30 seconds. Light circular motions allow it to absorb fully into the skin." },
    { number: 4, title: "Routine", description: "Use morning and night consistently for best results. Consistency over 8 weeks is key to seeing full edge recovery." },
  ];

  const tips = [
    { title: "For Braid Wearers", content: "Apply within 2 hours of installation to prevent permanent traction damage. Best for: Knotless braids, Box braids, Cornrows." },
    { title: "For Wig Wearers", content: "Apply before putting on your wig in the morning. Reapply midday if you experience itching. Evening: spray again before bed." },
    { title: "For Gym-Goers", content: "Refresh your scalp after workouts. Sweat can irritate an already sensitive scalp. Quick spray prevents heat-induced inflammation." },
    { title: "During Relaxation Weeks", content: "Hair down weeks are prime recovery time. Use 2x daily without interruption. You'll see dramatic improvements in edge health." },
    { title: "Combining with Other Products", content: "Use this as your scalp foundation first (spray and absorb 5 minutes). Then apply other hair products. It actually enhances their effectiveness." },
  ];

  return (
    <div className="max-w-4xl space-y-10">
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Your Scalp Recovery Routine</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step) => (
            <div key={step.number} className="text-center p-5 rounded-lg bg-secondary/50 border border-border">
              <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center mx-auto mb-3 text-lg font-bold">{step.number}</div>
              <h4 className="text-lg font-bold text-primary mb-2">{step.title}</h4>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h3 className="text-xl font-bold text-primary mb-6">Pro Tips for Maximum Results</h3>
        <Accordion type="single" collapsible className="space-y-2">
          {tips.map((tip, index) => (
            <AccordionItem key={index} value={`tip-${index}`} className="border border-border rounded-lg px-4 bg-background">
              <AccordionTrigger className="text-left font-semibold hover:no-underline">{tip.title}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{tip.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
};

const MistIngredientsTab = () => {
  const ingredients = [
    { name: "Aloe Vera Extract", percentage: "25%", benefits: ["Reduces inflammation and swelling", "Soothes irritated, sensitive scalp", "Promotes healing of damaged follicles", "Hydrates scalp without greasiness", "Antioxidant and antimicrobial properties"], description: "Aloe is the gold standard for scalp inflammation. At 25% concentration, our formula delivers serious anti-inflammatory power." },
    { name: "Tea Tree Oil", percentage: "10%", benefits: ["Powerful antibacterial protection", "Prevents scalp infections under wigs/braids", "Reduces fungal growth that causes itching", "Natural antifungal without harsh chemicals", "Cooling sensation (relief)"], description: "Tea tree fights bacterial and fungal growth—common causes of scalp inflammation under wigs and braids." },
    { name: "Peppermint Extract", percentage: "8%", benefits: ["Improves blood circulation to scalp", "Provides cooling, soothing sensation", "Energizes scalp (feels refreshing)", "Helps reduce pain and tension", "Natural astringent properties"], description: "Better circulation means more nutrients reach your follicles. Peppermint also gives that instant 'ahhhh' feeling." },
    { name: "Vegetable Glycerin", percentage: "12%", benefits: ["Deeply hydrates scalp", "Prevents moisture loss", "Maintains healthy scalp pH", "Lightweight, non-greasy humectant", "Protective barrier for damaged scalp"], description: "Glycerin holds water in the scalp, preventing the dryness that triggers inflammation." },
    { name: "Chamomile Flower Extract", percentage: "5%", benefits: ["Calming, anti-inflammatory", "Reduces scalp sensitivity", "Soothes irritation from styling", "Antioxidant protection", "Gentle on sensitive skin"], description: "Chamomile is nature's calming agent. It reduces hypersensitivity so your scalp isn't reactive to everything." },
  ];

  return (
    <div className="max-w-4xl space-y-10">
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">What's Inside (And Why It Works)</h2>
        <p className="text-muted-foreground leading-relaxed mb-8">Every ingredient in VERITÉ SCALP Soothing Mist is carefully selected for its anti-inflammatory, healing, and scalp-protective properties.</p>
        <div className="space-y-6">
          {ingredients.map((ingredient) => (
            <div key={ingredient.name} className="p-6 rounded-lg border border-border bg-background">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <Droplets className="w-6 h-6 text-accent" />
                <h3 className="text-xl font-bold text-primary">{ingredient.name}</h3>
                <span className="text-sm font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded">{ingredient.percentage} Concentration</span>
              </div>
              <ul className="grid sm:grid-cols-2 gap-1 mb-4">
                {ingredient.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground"><CheckCircle className="w-3.5 h-3.5 text-accent flex-shrink-0" />{benefit}</li>
                ))}
              </ul>
              <div className="p-4 rounded bg-secondary/50 text-sm text-muted-foreground italic"><strong className="not-italic text-foreground">Why We Use It:</strong> {ingredient.description}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const MistTimelineTab = () => {
  const timeline = [
    { weeks: "Week 1-2", title: "Relief Phase", description: "Itching stops, scalp tenderness reduces, you feel relief", icon: Snowflake },
    { weeks: "Week 2-4", title: "Reduction Phase", description: "Shedding dramatically drops 50-70%, brush test shows massive difference", icon: TrendingUp },
    { weeks: "Week 4-6", title: "Growth Phase", description: "Fine baby hairs visible along hairline, shedding nearly stops", icon: Leaf },
    { weeks: "Week 6-8", title: "Recovery Phase", description: "Noticeable edge growth, edges filling in visibly, regained confidence", icon: Star },
  ];

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">What to Expect Week by Week</h2>
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
        <div className="space-y-6">
          {timeline.map((item, index) => (
            <div key={index} className="relative flex gap-4 md:gap-6">
              <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center"><item.icon className="w-5 h-5" /></div>
              <div className="flex-1 pb-6">
                <div className="flex flex-wrap items-center gap-2 mb-1"><span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded">{item.weeks}</span><h3 className="font-semibold text-foreground">{item.title}</h3></div>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MistReviewsTab = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, number>>({});
  const [userVotedReviews, setUserVotedReviews] = useState<Set<string>>(new Set());
  const reviewsPerPage = 10;

  // Get helpful count (base + user votes)
  const getHelpfulCount = (review: typeof mistReviews[0]) => {
    return review.helpful + (helpfulVotes[review.id] || 0);
  };

  // Handle marking review as helpful
  const handleMarkHelpful = (reviewId: string) => {
    if (userVotedReviews.has(reviewId)) return;
    
    setHelpfulVotes(prev => ({
      ...prev,
      [reviewId]: (prev[reviewId] || 0) + 1
    }));
    setUserVotedReviews(prev => new Set(prev).add(reviewId));
  };

  // Filter reviews
  let filteredReviews = mistReviews.filter(review => {
    if (selectedRating && review.rating !== selectedRating) return false;
    if (selectedCategory !== 'all' && review.category !== selectedCategory) return false;
    return true;
  });

  // Sort reviews
  switch (sortBy) {
    case 'helpful':
      filteredReviews = [...filteredReviews].sort((a, b) => getHelpfulCount(b) - getHelpfulCount(a));
      break;
    case 'highest':
      filteredReviews = [...filteredReviews].sort((a, b) => b.rating - a.rating);
      break;
    case 'lowest':
      filteredReviews = [...filteredReviews].sort((a, b) => a.rating - b.rating);
      break;
    case 'recent':
    default:
      // Keep original order (most recent first)
      break;
  }

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const currentReviews = filteredReviews.slice(startIndex, startIndex + reviewsPerPage);

  return (
    <div className="max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-primary">Customer Reviews</h2>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex">
              {[1, 2, 3, 4].map((star) => (<Star key={star} className="w-5 h-5 fill-brand-gold text-brand-gold" />))}
              <div className="relative w-5 h-5"><Star className="absolute w-5 h-5 text-brand-gold" /><div className="absolute overflow-hidden" style={{ width: '90%' }}><Star className="w-5 h-5 fill-brand-gold text-brand-gold" /></div></div>
            </div>
            <span className="font-semibold">{MIST_RATING}</span>
            <span className="text-muted-foreground">({TOTAL_MIST_REVIEWS.toLocaleString()} reviews)</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <ReviewFilters
        categories={mistReviewCategories}
        selectedRating={selectedRating}
        selectedCategory={selectedCategory}
        sortBy={sortBy}
        onRatingChange={(rating) => { setSelectedRating(rating); setCurrentPage(1); }}
        onCategoryChange={(cat) => { setSelectedCategory(cat); setCurrentPage(1); }}
        onSortChange={(sort) => { setSortBy(sort); setCurrentPage(1); }}
        totalReviews={TOTAL_MIST_REVIEWS}
        filteredCount={filteredReviews.length}
        displayedCount={currentReviews.length}
      />

      <div className="space-y-4">
        {currentReviews.map((review) => {
          const hasVoted = userVotedReviews.has(review.id);
          const helpfulCount = getHelpfulCount(review);
          
          return (
            <div key={review.id} className="p-5 rounded-lg border border-border bg-background">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-foreground">{review.name}</h4>
                    {review.verified && (
                      <span className="inline-flex items-center gap-1 text-xs text-accent">
                        <CheckCircle className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
                <div className="flex">{[...Array(review.rating)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />))}</div>
              </div>
              <h5 className="font-semibold text-foreground mb-2">{review.title}</h5>
              <p className="text-sm text-muted-foreground leading-relaxed">{review.content}</p>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-xs text-muted-foreground">{helpfulCount} people found this helpful</span>
                <button
                  onClick={() => handleMarkHelpful(review.id)}
                  disabled={hasVoted}
                  className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors ${
                    hasVoted 
                      ? 'bg-accent/20 text-accent cursor-default' 
                      : 'bg-secondary hover:bg-secondary/80 text-foreground cursor-pointer'
                  }`}
                >
                  <ThumbsUp className="w-3 h-3" />
                  {hasVoted ? 'Voted' : 'Helpful'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <Button variant="outline" size="icon" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}><ChevronLeft className="w-4 h-4" /></Button>
          <span className="text-sm text-muted-foreground px-4">Page {currentPage} of {totalPages}</span>
          <Button variant="outline" size="icon" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}><ChevronRight className="w-4 h-4" /></Button>
        </div>
      )}
    </div>
  );
};

const MistFAQTab = () => {
  const faqs = [
    { question: "How quickly will I see results?", answer: "Most customers notice reduced itching and scalp relief within 1-2 weeks. Visible reduction in shedding typically occurs by week 2-4. Baby hairs and edge regrowth become visible around week 4-6. Full edge recovery is typically seen by week 8 with consistent use." },
    { question: "Can I use this with my wig or braids?", answer: "Absolutely! This product is specifically designed for protective style wearers. Apply before putting on your wig, after braid installation, or anytime you experience discomfort. The lightweight formula won't cause buildup or affect your style." },
    { question: "Is this product safe for sensitive scalps?", answer: "Yes! Our formula is dermatologist-formulated with gentle, natural ingredients. We use no harsh chemicals, sulfates, or artificial fragrances. The aloe vera and chamomile are specifically included to soothe sensitive, reactive scalps." },
    { question: "How long does one bottle last?", answer: "With twice-daily use (morning and night), one 180ml bottle typically lasts 6-8 weeks. This makes it an excellent value for the results you'll see." },
    { question: "Do I need to wash my hair before applying?", answer: "No! You can apply directly to dry or damp scalp. Many customers prefer applying to dry hair for convenience. The formula absorbs quickly without leaving residue." },
    { question: "What if it doesn't work for me?", answer: "We offer a 30-day money-back guarantee. If you don't see improvement within 30 days, contact us for a full refund. We're confident in our product because we've seen it work for thousands of customers." },
  ];

  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`faq-${index}`} className="border border-border rounded-lg px-5 bg-background">
            <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

// ============================================
// SHOWER FILTER PRODUCT TABS
// ============================================

const ShowerFilterOverviewTab = () => {
  const benefits = [
    { icon: Shield, title: "99% Chlorine Removal", description: "The 15-stage filtration system removes up to 99% of chlorine—the primary culprit behind scalp inflammation and hair damage." },
    { icon: Zap, title: "High-Pressure Rainfall", description: "Supercharged water storage system delivers spa-quality pressure even in low-pressure homes. Luxurious coverage every shower." },
    { icon: Sparkles, title: "Vitamin C & E Infusion", description: "Antioxidant protection neutralizes free radicals, protecting follicle cells from oxidative stress that causes hair aging." },
    { icon: Wrench, title: "Tool-Free Installation", description: "Universal G1/2 inch connection fits all standard shower arms. Hand-tighten installation in just 2-5 minutes." },
  ];

  const useCases = [
    "Women experiencing unexplained hair shedding",
    "Those with sensitive, itchy, or irritated scalps",
    "Anyone whose hair products aren't delivering results",
    "Hard water area residents with dull, brittle hair",
    "Protective style wearers fighting edge loss",
    "Those seeking a spa-like shower experience",
  ];

  return (
    <div className="max-w-4xl space-y-10">
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">Stop Scalp Inflammation At The Source</h2>
        <div className="space-y-4 text-muted-foreground leading-relaxed">
          <p>The Verite Purifying Shower Head doesn't treat symptoms—it <strong className="text-foreground">eliminates the root cause</strong>. Every shower with unfiltered water is another inflammatory assault on your scalp.</p>
          <p>Chlorine strips your scalp's natural protective oils. Hard water minerals create an invisible barrier blocking your hair products. Heavy metals accumulate in scalp tissue, causing chronic inflammation.</p>
          <p>This 15-stage filtration system breaks the daily damage cycle, giving your follicles the clean, calm environment they need to finally thrive.</p>
        </div>
      </section>
      <section>
        <h3 className="text-xl font-bold text-primary mb-4">The Daily Damage Cycle</h3>
        <ul className="space-y-2 text-muted-foreground">
          {["Chemical Assault: Chlorine and heavy metals strip your scalp's natural barrier", "Mineral Coating: Calcium and magnesium clog follicles and block oxygen flow", "Inflammatory Response: Your scalp responds with chronic, low-grade inflammation", "Product Barrier: Your $60 growth serum can't penetrate the mineral layer", "Premature Shedding: Inflamed follicles release hair months before natural cycle ends"].map((item, index) => (
            <li key={index} className="flex items-start gap-2"><span className="text-accent mt-1">•</span><span>{item}</span></li>
          ))}
        </ul>
      </section>
      <section>
        <h3 className="text-xl font-bold text-primary mb-6">What Makes This Different</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {benefits.map((benefit) => (
            <div key={benefit.title} className="p-5 rounded-lg bg-secondary/50 border border-border">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center"><benefit.icon className="w-5 h-5 text-accent" /></div>
                <h4 className="font-semibold text-foreground">{benefit.title}</h4>
              </div>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h3 className="text-xl font-bold text-primary mb-4">Perfect For</h3>
        <ul className="grid sm:grid-cols-2 gap-2">
          {useCases.map((useCase, index) => (
            <li key={index} className="flex items-center gap-2 text-muted-foreground"><CheckCircle className="w-4 h-4 text-accent flex-shrink-0" /><span>{useCase}</span></li>
          ))}
        </ul>
      </section>
    </div>
  );
};

const ShowerFilterInstallationTab = () => {
  const steps = [
    { number: 1, title: "Remove Old Head", description: "Unscrew your existing shower head by hand. If stuck, use a cloth for grip. No tools needed." },
    { number: 2, title: "Apply Teflon Tape", description: "Wrap the included Teflon tape around the shower arm threads 2-3 times for a leak-proof seal." },
    { number: 3, title: "Attach Filter", description: "Hand-tighten the Verite filter onto the shower arm. Ensure the rubber washer is in place." },
    { number: 4, title: "Test & Adjust", description: "Turn on water, check for leaks, and adjust the 360° swivel to your preferred angle." },
  ];

  const specs = [
    { label: "Connection", value: "Standard G1/2\" (Universal)" },
    { label: "Head Diameter", value: "8-9 inches (20-23 cm)" },
    { label: "Material", value: "High-grade ABS + Chrome" },
    { label: "Temperature Range", value: "0-60°C (32-140°F)" },
    { label: "Installation Time", value: "2-5 minutes" },
    { label: "Tools Required", value: "None" },
  ];

  return (
    <div className="max-w-4xl space-y-10">
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Easy 4-Step Installation</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step) => (
            <div key={step.number} className="text-center p-5 rounded-lg bg-secondary/50 border border-border">
              <div className="w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center mx-auto mb-3 text-lg font-bold">{step.number}</div>
              <h4 className="text-lg font-bold text-primary mb-2">{step.title}</h4>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h3 className="text-xl font-bold text-primary mb-6">Technical Specifications</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {specs.map((spec) => (
            <div key={spec.label} className="flex justify-between items-center p-4 rounded-lg bg-secondary/50 border border-border">
              <span className="text-muted-foreground font-medium">{spec.label}</span>
              <span className="text-foreground font-semibold">{spec.value}</span>
            </div>
          ))}
        </div>
      </section>
      <section>
        <h3 className="text-xl font-bold text-primary mb-4">What's In The Box</h3>
        <ul className="space-y-2">
          {["1x Verite Purifying Rainfall Shower Head (with 15-stage filter)", "1x Shower Arm Extension (where applicable)", "1x Chrome Wall Flange", "2-3x Rubber Washers/Gaskets", "1x Teflon Tape", "1x Installation Manual"].map((item, index) => (
            <li key={index} className="flex items-center gap-2 text-muted-foreground"><CheckCircle className="w-4 h-4 text-accent flex-shrink-0" /><span>{item}</span></li>
          ))}
        </ul>
      </section>
    </div>
  );
};

const ShowerFilterStagesTab = () => {
  const stages = [
    { stage: 1, name: "Ultra-fine Stainless Steel Mesh", purpose: "Initial filtration of large debris" },
    { stage: 2, name: "PP Cotton", purpose: "Removes large particles and sediment" },
    { stage: 3, name: "High-density Stainless Steel Mesh", purpose: "Secondary fine filtration" },
    { stage: 4, name: "Alkaline Ceramic Balls", purpose: "Balances pH for optimal scalp health" },
    { stage: 5, name: "Maifan Stone", purpose: "Mineral enhancement and water softening" },
    { stage: 6, name: "KDF 55", purpose: "Removes chlorine and heavy metals" },
    { stage: 7, name: "Microporous Ceramic Balls", purpose: "Micro-filtration of fine particles" },
    { stage: 8, name: "Vitamin C & E Beads", purpose: "Antioxidant protection for hair and skin" },
    { stage: 9, name: "Coconut Activated Carbon", purpose: "Removes odors and chemicals" },
    { stage: 10, name: "Germanium Balls", purpose: "Energy enhancement and water ionization" },
    { stage: 11, name: "Dechlorination Balls (Calcium Sulfite)", purpose: "99% chlorine removal" },
    { stage: 12, name: "Magnetic Energy Ceramic Balls", purpose: "Water restructuring and softening" },
    { stage: 13, name: "Ultra-fine Stainless Steel Mesh", purpose: "Final particle capture" },
    { stage: 14, name: "PP Cotton", purpose: "Final purity stage" },
    { stage: 15, name: "High-density Stainless Steel Mesh", purpose: "Output protection" },
  ];

  return (
    <div className="max-w-4xl space-y-10">
      <section>
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">15-Stage Advanced Filtration System</h2>
        <p className="text-muted-foreground leading-relaxed mb-8">Each stage of our filtration system targets specific contaminants that damage your scalp and hair. Together, they deliver the cleanest, most scalp-friendly water possible.</p>
        <div className="space-y-3">
          {stages.map((stage) => (
            <div key={stage.stage} className="flex items-start gap-4 p-4 rounded-lg border border-border bg-background hover:bg-secondary/30 transition-colors">
              <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center flex-shrink-0 text-sm font-bold">{stage.stage}</div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground">{stage.name}</h4>
                <p className="text-sm text-muted-foreground">{stage.purpose}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

const ShowerFilterTimelineTab = () => {
  const timeline = [
    { weeks: "Week 1-2", title: "Immediate Relief", description: "No more post-shower itching, redness, or irritation. Scalp feels calm and balanced. Products absorb properly for the first time.", icon: Snowflake },
    { weeks: "Week 3-4", title: "Inflammation Subsides", description: "Excessive shedding begins to decrease noticeably. Follicles enter recovery mode. Scalp texture improves.", icon: TrendingUp },
    { weeks: "Week 5-8", title: "Growth Phase Extends", description: "Hair stays in follicles longer, completing natural growth cycles. New growth appears thicker and stronger. Edges begin to fill in.", icon: Leaf },
    { weeks: "Week 9-12", title: "Visible Transformation", description: "Significantly less shedding in shower and on brush. Increased overall density. Natural shine returns. Products deliver visible results.", icon: Star },
  ];

  return (
    <div className="max-w-4xl">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Your Scalp Recovery Timeline</h2>
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border hidden md:block" />
        <div className="space-y-6">
          {timeline.map((item, index) => (
            <div key={index} className="relative flex gap-4 md:gap-6">
              <div className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center"><item.icon className="w-5 h-5" /></div>
              <div className="flex-1 pb-6">
                <div className="flex flex-wrap items-center gap-2 mb-1"><span className="text-xs font-semibold text-accent bg-accent/10 px-2 py-0.5 rounded">{item.weeks}</span><h3 className="font-semibold text-foreground">{item.title}</h3></div>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ShowerFilterReviewsTab = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, number>>({});
  const [userVotedReviews, setUserVotedReviews] = useState<Set<string>>(new Set());
  const reviewsPerPage = 10;

  // Get helpful count (base + user votes)
  const getHelpfulCount = (review: typeof showerHeadReviews[0]) => {
    return review.helpful + (helpfulVotes[review.id] || 0);
  };

  // Handle marking review as helpful
  const handleMarkHelpful = (reviewId: string) => {
    if (userVotedReviews.has(reviewId)) return;
    
    setHelpfulVotes(prev => ({
      ...prev,
      [reviewId]: (prev[reviewId] || 0) + 1
    }));
    setUserVotedReviews(prev => new Set(prev).add(reviewId));
  };

  // Filter reviews
  let filteredReviews = showerHeadReviews.filter(review => {
    if (selectedRating && review.rating !== selectedRating) return false;
    if (selectedCategory !== 'all' && review.category !== selectedCategory) return false;
    return true;
  });

  // Sort reviews
  switch (sortBy) {
    case 'helpful':
      filteredReviews = [...filteredReviews].sort((a, b) => getHelpfulCount(b) - getHelpfulCount(a));
      break;
    case 'highest':
      filteredReviews = [...filteredReviews].sort((a, b) => b.rating - a.rating);
      break;
    case 'lowest':
      filteredReviews = [...filteredReviews].sort((a, b) => a.rating - b.rating);
      break;
    case 'recent':
    default:
      // Keep original order (most recent first)
      break;
  }

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const currentReviews = filteredReviews.slice(startIndex, startIndex + reviewsPerPage);

  return (
    <div className="max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-primary">Customer Reviews</h2>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (<Star key={star} className="w-5 h-5 fill-brand-gold text-brand-gold" />))}
            </div>
            <span className="font-semibold">{SHOWER_HEAD_RATING}</span>
            <span className="text-muted-foreground">({TOTAL_SHOWER_HEAD_REVIEWS.toLocaleString()} reviews)</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <ReviewFilters
        categories={showerHeadReviewCategories}
        selectedRating={selectedRating}
        selectedCategory={selectedCategory}
        sortBy={sortBy}
        onRatingChange={(rating) => { setSelectedRating(rating); setCurrentPage(1); }}
        onCategoryChange={(cat) => { setSelectedCategory(cat); setCurrentPage(1); }}
        onSortChange={(sort) => { setSortBy(sort); setCurrentPage(1); }}
        totalReviews={TOTAL_SHOWER_HEAD_REVIEWS}
        filteredCount={filteredReviews.length}
        displayedCount={currentReviews.length}
      />

      <div className="space-y-4">
        {currentReviews.map((review) => {
          const hasVoted = userVotedReviews.has(review.id);
          const helpfulCount = getHelpfulCount(review);
          
          return (
            <div key={review.id} className="p-5 rounded-lg border border-border bg-background">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-foreground">{review.name}</h4>
                    {review.verified && (
                      <span className="inline-flex items-center gap-1 text-xs text-accent">
                        <CheckCircle className="w-3 h-3" /> Verified
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{review.date}</p>
                </div>
                <div className="flex">{[...Array(review.rating)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />))}</div>
              </div>
              <h5 className="font-semibold text-foreground mb-2">{review.title}</h5>
              <p className="text-sm text-muted-foreground leading-relaxed">{review.content}</p>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-xs text-muted-foreground">{helpfulCount} people found this helpful</span>
                <button
                  onClick={() => handleMarkHelpful(review.id)}
                  disabled={hasVoted}
                  className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors ${
                    hasVoted 
                      ? 'bg-accent/20 text-accent cursor-default' 
                      : 'bg-secondary hover:bg-secondary/80 text-foreground cursor-pointer'
                  }`}
                >
                  <ThumbsUp className="w-3 h-3" />
                  {hasVoted ? 'Voted' : 'Helpful'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          <Button variant="outline" size="icon" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}><ChevronLeft className="w-4 h-4" /></Button>
          <span className="text-sm text-muted-foreground px-4">Page {currentPage} of {totalPages}</span>
          <Button variant="outline" size="icon" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}><ChevronRight className="w-4 h-4" /></Button>
        </div>
      )}
    </div>
  );
};

const ShowerFilterFAQTab = () => {
  const faqs = [
    { question: "Will this fit my shower?", answer: "Yes! The Verite Shower Filter uses a standard G1/2 inch universal thread that fits 99% of household showers worldwide. It works with overhead/ceiling mounts and wall-mounted arms." },
    { question: "How long does the filter last?", answer: "The 15-stage filter typically lasts 6-8 months with regular use, depending on your water quality. You'll notice when it needs replacing as water flow may slightly decrease." },
    { question: "Will this reduce my water pressure?", answer: "No—quite the opposite! The supercharged water storage system actually enhances pressure, delivering spa-quality flow even in low-pressure homes." },
    { question: "How does this help my hair grow?", answer: "By removing chlorine, heavy metals, and hard water minerals that cause scalp inflammation, blocked follicles, and premature shedding. When these irritants are eliminated, your scalp can heal and hair can grow naturally." },
    { question: "Is installation really tool-free?", answer: "Absolutely! Simply unscrew your old shower head and hand-tighten the Verite filter in its place. The included Teflon tape and rubber washers ensure a leak-proof seal. Most installations take 2-5 minutes." },
    { question: "Can I use this with other hair products?", answer: "Yes! In fact, your hair products will work BETTER because the mineral barrier that was blocking absorption is now gone. Filtered water allows products to penetrate your scalp properly." },
    { question: "What if it doesn't work for me?", answer: "We offer a 30-day money-back guarantee. If you don't notice improvements in your scalp health and hair within 30 days, contact us for a full refund." },
  ];

  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`faq-${index}`} className="border border-border rounded-lg px-5 bg-background">
            <AccordionTrigger className="text-left font-semibold hover:no-underline py-4">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-4 leading-relaxed">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};
