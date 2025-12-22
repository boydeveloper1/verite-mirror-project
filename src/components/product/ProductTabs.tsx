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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ProductTabsProps {
  productHandle?: string;
}

export const ProductTabs = ({ productHandle }: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  
  const isShowerHead = productHandle?.includes("shower-filter") || productHandle?.includes("shower-head");
  const reviewCount = isShowerHead ? 54 : 127;
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
  const reviewsPerPage = 10;

  const allReviews = [
    { name: "Michelle T.", date: "2 weeks ago", title: "Finally something that actually works!", content: "I tried every growth serum out there. Nothing worked until I realized the problem was inflammation. This mist calmed my scalp in days. Week 4: I see baby hairs. Week 8: My edges are BACK." },
    { name: "Jasmine R.", date: "1 month ago", title: "My braids do not hurt anymore", content: "I used to dread getting my braids done because of the pain. Now I spray this right after installation and the relief is instant. My scalp stays calm the entire time." },
    { name: "Tiffany W.", date: "3 weeks ago", title: "Wig wearer essential", content: "As someone who wears wigs daily, my edges were suffering. This has become part of my morning routine. My hairline has never looked better." },
    { name: "Keisha M.", date: "1 week ago", title: "Life changing product", content: "I was skeptical at first but this actually works. My scalp feels so much better and I can see new growth along my edges." },
    { name: "Danielle S.", date: "2 months ago", title: "Best scalp product ever", content: "I have tried everything and nothing compares to this. The cooling sensation is amazing and my hair is growing back." },
    { name: "Aaliyah J.", date: "3 weeks ago", title: "No more itching", content: "The itching under my wig was unbearable. This spray stopped it completely. I can finally wear my wigs comfortably all day." },
    { name: "Brianna C.", date: "1 month ago", title: "My edges are coming back", content: "After years of tight ponytails, my edges were gone. Two months with this product and I can see real progress." },
    { name: "Crystal D.", date: "2 weeks ago", title: "Perfect for protective styles", content: "I keep my hair in braids most of the time. This keeps my scalp healthy and my hair growing underneath." },
    { name: "Destiny H.", date: "5 weeks ago", title: "Finally found what works", content: "I spent so much money on products that did not work. This is the only one that actually delivered results." },
    { name: "Ebony L.", date: "1 month ago", title: "Game changer for my routine", content: "Added this to my morning routine and the difference is incredible. My scalp is no longer dry and flaky." },
    { name: "Faith N.", date: "3 weeks ago", title: "Obsessed with this product", content: "The relief I feel after spraying this is amazing. My scalp thanks me every day." },
    { name: "Gabrielle P.", date: "2 months ago", title: "Worth every penny", content: "I was hesitant about the price but the results speak for themselves. My hair has never been healthier." },
    { name: "Harmony Q.", date: "1 week ago", title: "Quick results", content: "I noticed a difference within the first week. My scalp feels so much calmer and less irritated." },
    { name: "Imani R.", date: "6 weeks ago", title: "Must have for braids", content: "I get my braids done every 6 weeks and this has saved my edges. No more tension headaches either." },
    { name: "Jade S.", date: "1 month ago", title: "My hairstylist noticed", content: "My hairstylist commented on how healthy my scalp looks. I told her about this product immediately." },
    { name: "Kiara T.", date: "2 weeks ago", title: "No more shedding", content: "I used to lose so much hair in the shower. Now my shedding has reduced dramatically." },
    { name: "Latoya U.", date: "3 months ago", title: "Three bottles in and loving it", content: "I am on my third bottle and my edges are fuller than they have been in years." },
    { name: "Maya V.", date: "1 month ago", title: "Cooling and soothing", content: "The peppermint feels so refreshing. Perfect for those hot summer days under my wig." },
    { name: "Nia W.", date: "2 weeks ago", title: "Finally some relief", content: "I have had scalp issues for years. This is the first product that has given me real relief." },
    { name: "Olivia X.", date: "5 weeks ago", title: "Buying for my sister too", content: "I loved it so much I bought one for my sister who also struggles with her edges." },
    { name: "Porsha Y.", date: "1 month ago", title: "No more flakes", content: "My scalp used to be so dry and flaky. This has completely changed that. My scalp is healthy now." },
    { name: "Queen Z.", date: "3 weeks ago", title: "Gentle but effective", content: "I have sensitive skin and this works without any irritation. So happy I found it." },
    { name: "Raven A.", date: "2 months ago", title: "Regrowth is real", content: "I can see baby hairs all along my hairline. This product is the real deal." },
    { name: "Simone B.", date: "1 week ago", title: "Perfect size bottle", content: "The bottle lasts a long time even with daily use. Great value for what you get." },
    { name: "Tamara C.", date: "6 weeks ago", title: "My go-to product now", content: "I have tried so many products. This is now the only one I use for my scalp." },
    { name: "Unique D.", date: "1 month ago", title: "Fast shipping too", content: "Product arrived quickly and works exactly as described. Very impressed." },
    { name: "Vivian E.", date: "2 weeks ago", title: "Smells amazing", content: "Not only does it work but it smells so good. The natural scent is perfect." },
    { name: "Whitney F.", date: "4 weeks ago", title: "Noticed results quickly", content: "Within two weeks I could feel the difference. My scalp was less tender and itchy." },
    { name: "Xena G.", date: "1 month ago", title: "My edges thank you", content: "My edges were basically gone. Now they are growing back thicker than before." },
    { name: "Yolanda H.", date: "3 weeks ago", title: "Perfect for daily use", content: "I use it every morning and night. It has become an essential part of my routine." },
    { name: "Zaria I.", date: "2 months ago", title: "Highly recommend", content: "I have recommended this to all my friends. Everyone who tries it loves it." },
    { name: "Amber J.", date: "1 week ago", title: "Relief from day one", content: "I felt relief from the very first application. My scalp was so grateful." },
    { name: "Briana K.", date: "5 weeks ago", title: "No more scalp pain", content: "The pain I used to feel after getting braids is gone. This product is a lifesaver." },
    { name: "Chanel L.", date: "1 month ago", title: "My secret weapon", content: "This is my secret weapon for healthy edges. No one believes my hair is natural." },
    { name: "Diamond M.", date: "2 weeks ago", title: "Exceeded expectations", content: "I had low expectations but this product blew me away. Real results!" },
    { name: "Essence N.", date: "6 weeks ago", title: "Love the ingredients", content: "I love that it is all natural. No harsh chemicals on my scalp." },
    { name: "Francesca O.", date: "1 month ago", title: "Perfect for sensitive scalp", content: "My scalp is very sensitive and this works without any burning or irritation." },
    { name: "Grace P.", date: "3 weeks ago", title: "Visible improvement", content: "I took before and after photos. The improvement is visible and amazing." },
    { name: "Hope Q.", date: "2 months ago", title: "Consistent results", content: "I have been using this for two months and the results keep getting better." },
    { name: "Ivy R.", date: "1 week ago", title: "Easy to apply", content: "The spray bottle makes it so easy to apply. Gets right to the scalp." },
    { name: "Jasmin S.", date: "4 weeks ago", title: "No residue", content: "Unlike other products, this does not leave any greasy residue. Love it." },
    { name: "Kayla T.", date: "1 month ago", title: "My hairline is back", content: "I thought my hairline was gone forever. This product proved me wrong." },
    { name: "Lauren U.", date: "2 weeks ago", title: "Best investment", content: "This is the best investment I have made for my hair. Worth every dollar." },
    { name: "Monica V.", date: "5 weeks ago", title: "Finally found the solution", content: "After years of searching, I finally found something that works for my scalp." },
    { name: "Naomi W.", date: "1 month ago", title: "Transformed my hair journey", content: "This product has completely transformed my hair journey. I am so grateful." },
    { name: "Opal X.", date: "3 weeks ago", title: "Lightweight formula", content: "I love how lightweight it is. Does not weigh down my hair at all." },
    { name: "Paris Y.", date: "2 months ago", title: "Stopped my hair loss", content: "I was losing so much hair. This product stopped the loss and promoted growth." },
    { name: "Queenie Z.", date: "1 week ago", title: "Amazing customer service too", content: "Not only is the product great but the customer service is excellent too." },
    { name: "Rosa A.", date: "6 weeks ago", title: "My scalp is happy", content: "For the first time in years, my scalp is happy and healthy." },
    { name: "Serena B.", date: "1 month ago", title: "Repurchased already", content: "I am already on my second bottle. That should tell you how much I love it." },
    { name: "Tiana C.", date: "2 weeks ago", title: "Dermatologist approved", content: "My dermatologist even approved of the ingredients. That gave me confidence." },
    { name: "Uma D.", date: "4 weeks ago", title: "Great for all hair types", content: "I have 4C hair and this works perfectly. Great for all hair types." },
    { name: "Vanessa E.", date: "1 month ago", title: "No more embarrassment", content: "I used to be embarrassed about my edges. Not anymore thanks to this product." },
    { name: "Wendy F.", date: "3 weeks ago", title: "Saw results in two weeks", content: "Two weeks in and I already saw significant improvement. So happy!" },
    { name: "Xiomara G.", date: "2 months ago", title: "My stylist recommends it", content: "My hairstylist now recommends this to all her clients." },
    { name: "Yasmine H.", date: "1 week ago", title: "Travel friendly size", content: "Perfect size for traveling. I never leave home without it now." },
    { name: "Zoe I.", date: "5 weeks ago", title: "Changed my life", content: "I know it sounds dramatic but this product changed my life. My confidence is back." },
    { name: "Alicia J.", date: "1 month ago", title: "No more tension headaches", content: "I used to get terrible headaches from tight styles. This has helped so much." },
    { name: "Bethany K.", date: "2 weeks ago", title: "Cooling sensation is everything", content: "The cooling sensation is so soothing. It is like a spa treatment for my scalp." },
    { name: "Camille L.", date: "6 weeks ago", title: "Real ingredients real results", content: "I love that I can read and understand all the ingredients. And they work!" },
    { name: "Deja M.", date: "1 month ago", title: "My edges are thriving", content: "My edges went from struggling to thriving in just a few weeks." },
    { name: "Erica N.", date: "3 weeks ago", title: "Perfect under wigs", content: "I wear wigs every day and this keeps my scalp comfortable all day long." },
    { name: "Felicia O.", date: "2 months ago", title: "Wish I found this sooner", content: "I wish I had found this product years ago. Better late than never!" },
    { name: "Giselle P.", date: "1 week ago", title: "Baby hairs everywhere", content: "I have so many baby hairs growing in. This product really works." },
    { name: "Hazel Q.", date: "4 weeks ago", title: "Gentle yet powerful", content: "It is gentle enough for daily use but powerful enough to see results." },
    { name: "Indigo R.", date: "1 month ago", title: "No more buildup", content: "My scalp used to have so much buildup. This keeps it clean and fresh." },
    { name: "Jenna S.", date: "2 weeks ago", title: "Perfect for cornrows", content: "I keep my hair in cornrows and this keeps my scalp healthy underneath." },
    { name: "Kendra T.", date: "5 weeks ago", title: "My new holy grail", content: "This is officially my holy grail product for scalp health." },
    { name: "Lisa U.", date: "1 month ago", title: "Affordable and effective", content: "Finally a product that is both affordable and actually works." },
    { name: "Mariah V.", date: "3 weeks ago", title: "My scalp needed this", content: "I did not realize how much my scalp needed this until I started using it." },
    { name: "Nadia W.", date: "2 months ago", title: "Consistent use pays off", content: "I used it consistently for two months and the results are incredible." },
    { name: "Octavia X.", date: "1 week ago", title: "Best purchase this year", content: "This is the best purchase I have made all year. No regrets." },
    { name: "Priscilla Y.", date: "6 weeks ago", title: "Restored my edges", content: "My edges were damaged from years of tight ponytails. This restored them." },
    { name: "Rochelle Z.", date: "1 month ago", title: "Love the natural ingredients", content: "I only use natural products and this fits perfectly into my routine." },
    { name: "Sabrina A.", date: "2 weeks ago", title: "My mom loves it too", content: "I got one for my mom and she loves it just as much as I do." },
    { name: "Tatiana B.", date: "4 weeks ago", title: "Noticeable difference", content: "Everyone keeps asking what I am using on my hair. The difference is noticeable." },
    { name: "Ursula C.", date: "1 month ago", title: "Quick absorption", content: "It absorbs quickly and does not leave my hair feeling wet or greasy." },
    { name: "Valerie D.", date: "3 weeks ago", title: "Perfect for box braids", content: "I get box braids every few months and this is essential for scalp care." },
    { name: "Willow E.", date: "2 months ago", title: "Healthy scalp healthy hair", content: "I finally understand that healthy scalp means healthy hair. This product taught me." },
    { name: "Ximena F.", date: "1 week ago", title: "No more dryness", content: "My scalp used to be so dry it would crack. Not anymore with this product." },
    { name: "Yvonne G.", date: "5 weeks ago", title: "Soothing and healing", content: "My scalp was so damaged. This product is soothing and healing it." },
    { name: "Zelda H.", date: "1 month ago", title: "Five stars all the way", content: "I rarely give five stars but this product deserves every single one." },
    { name: "Andrea I.", date: "2 weeks ago", title: "My go-to scalp spray", content: "This is now my go-to scalp spray. Nothing else compares." },
    { name: "Bianca J.", date: "6 weeks ago", title: "Refreshing feeling", content: "The refreshing feeling after each spray is amazing. I look forward to it." },
    { name: "Candace K.", date: "1 month ago", title: "Reduced inflammation", content: "I had so much inflammation on my scalp. This product reduced it significantly." },
    { name: "Deanna L.", date: "3 weeks ago", title: "Perfect spray mechanism", content: "The spray mechanism is perfect. It distributes the product evenly." },
    { name: "Elena M.", date: "2 months ago", title: "My hair is growing", content: "I can see my hair growing in areas that were completely bald before." },
    { name: "Fiona N.", date: "1 week ago", title: "Love this brand", content: "I love everything about this brand. The product, the packaging, everything." },
    { name: "Gloria O.", date: "4 weeks ago", title: "Gentle formula", content: "The formula is so gentle yet so effective. Perfect for my sensitive scalp." },
    { name: "Helena P.", date: "1 month ago", title: "My scalp is thriving", content: "My scalp went from surviving to thriving thanks to this product." },
    { name: "Iris Q.", date: "2 weeks ago", title: "Instant relief", content: "I feel instant relief every time I spray it. So soothing and calming." },
    { name: "Julia R.", date: "5 weeks ago", title: "Worth the hype", content: "I heard so much about this product. It is definitely worth the hype." },
    { name: "Kira S.", date: "1 month ago", title: "My edges are growing", content: "I cannot believe my edges are actually growing back. I am so happy." },
    { name: "Lila T.", date: "3 weeks ago", title: "Perfect daily spray", content: "I use it every single day. It has become an essential part of my routine." },
    { name: "Mia U.", date: "2 months ago", title: "Transformed my scalp", content: "My scalp was in terrible condition. This product transformed it completely." },
    { name: "Nina V.", date: "1 week ago", title: "Easy to use", content: "So easy to use and the results speak for themselves. Highly recommend." },
    { name: "Ophelia W.", date: "6 weeks ago", title: "No more itchiness", content: "The constant itchiness is gone. My scalp feels so comfortable now." },
    { name: "Penelope X.", date: "1 month ago", title: "Best scalp treatment", content: "I have tried many treatments. This is by far the best one." },
    { name: "Rachel Y.", date: "2 weeks ago", title: "Promoting healthy growth", content: "This product is promoting healthy growth all over my scalp." },
    { name: "Sandra Z.", date: "4 weeks ago", title: "My confidence is back", content: "I was so self-conscious about my edges. My confidence is finally back." },
    { name: "Teresa A.", date: "1 month ago", title: "Amazing results", content: "The results I have seen are nothing short of amazing. Thank you!" },
    { name: "Ulani B.", date: "3 weeks ago", title: "Lightweight and effective", content: "It is so lightweight but still incredibly effective. Perfect combination." },
    { name: "Vera C.", date: "2 months ago", title: "My stylist is impressed", content: "My hairstylist is so impressed with my scalp health now. She wants to try it." },
    { name: "Wanda D.", date: "1 week ago", title: "Soothing and refreshing", content: "Every application is soothing and refreshing. Love this feeling." },
    { name: "Xyla E.", date: "5 weeks ago", title: "No harsh chemicals", content: "I appreciate that there are no harsh chemicals. My scalp appreciates it too." },
    { name: "Yara F.", date: "1 month ago", title: "Finally seeing growth", content: "After years of no growth, I am finally seeing real progress. So grateful." },
    { name: "Zena G.", date: "2 weeks ago", title: "Changed my hair care routine", content: "This product changed my entire hair care routine for the better." },
    { name: "Adriana H.", date: "6 weeks ago", title: "My favorite product", content: "Out of all my hair products, this is my absolute favorite." },
    { name: "Blair I.", date: "1 month ago", title: "Quick and easy", content: "Takes just a minute to apply but the benefits last all day." },
    { name: "Cynthia J.", date: "3 weeks ago", title: "Healthy and happy scalp", content: "For the first time ever, my scalp is both healthy and happy." },
    { name: "Denise K.", date: "2 months ago", title: "Real transformation", content: "I have pictures to prove the transformation. This product works." },
    { name: "Elise L.", date: "1 week ago", title: "Perfect for protective styles", content: "Whether I have braids, twists, or wigs, this product is perfect." },
    { name: "Flora M.", date: "4 weeks ago", title: "My scalp loves it", content: "My scalp literally loves this product. I can feel the difference." },
    { name: "Gwen N.", date: "1 month ago", title: "No more damage", content: "My scalp was so damaged before. Now it is healing and healthy." },
    { name: "Heidi O.", date: "2 weeks ago", title: "Best discovery ever", content: "Discovering this product was the best thing to happen to my hair journey." },
    { name: "Ingrid P.", date: "5 weeks ago", title: "Consistent quality", content: "I have bought multiple bottles and the quality is always consistent." },
    { name: "Joyce Q.", date: "1 month ago", title: "My edges are fuller", content: "My edges are noticeably fuller. I am over the moon with joy." },
    { name: "Karen R.", date: "2 weeks ago", title: "Incredible product", content: "This has made such a difference for my scalp. Absolutely love it." },
    { name: "Lana S.", date: "3 weeks ago", title: "No more problems", content: "All my scalp problems have disappeared since using this spray." },
    { name: "Mercedes T.", date: "1 month ago", title: "Best money spent", content: "This is the best money I have ever spent on hair care." },
  ];

  const totalPages = Math.ceil(allReviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const currentReviews = allReviews.slice(startIndex, startIndex + reviewsPerPage);

  const getRating = (index: number) => {
    return (index % 5 === 0 || index % 7 === 0) ? 4 : 5;
  };

  return (
    <div className="max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-primary">Customer Reviews</h2>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex">
              {[1, 2, 3, 4].map((star) => (<Star key={star} className="w-5 h-5 fill-brand-gold text-brand-gold" />))}
              <div className="relative w-5 h-5"><Star className="absolute w-5 h-5 text-brand-gold" /><div className="absolute overflow-hidden" style={{ width: '90%' }}><Star className="w-5 h-5 fill-brand-gold text-brand-gold" /></div></div>
            </div>
            <span className="font-semibold">4.9</span>
            <span className="text-muted-foreground">({allReviews.length} reviews)</span>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {currentReviews.map((review, index) => {
          const rating = getRating(startIndex + index);
          return (
            <div key={startIndex + index} className="p-5 rounded-lg border border-border bg-background">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                <div><h4 className="font-semibold text-foreground">{review.name}</h4><p className="text-xs text-muted-foreground">{review.date}</p></div>
                <div className="flex">{[...Array(5)].map((_, i) => (<Star key={i} className={cn("w-4 h-4", i < rating ? "fill-brand-gold text-brand-gold" : "text-muted-foreground/30")} />))}</div>
              </div>
              <h5 className="font-semibold text-foreground mb-2">{review.title}</h5>
              <p className="text-sm text-muted-foreground leading-relaxed">{review.content}</p>
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
          <p>The Verite Scalp Purifying Shower Filter doesn't treat symptoms—it <strong className="text-foreground">eliminates the root cause</strong>. Every shower with unfiltered water is another inflammatory assault on your scalp.</p>
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
          {["1x Verite Scalp Purifying Rainfall Shower Head (with 15-stage filter)", "1x Shower Arm Extension (where applicable)", "1x Chrome Wall Flange", "2-3x Rubber Washers/Gaskets", "1x Teflon Tape", "1x Installation Manual"].map((item, index) => (
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
  const reviewsPerPage = 10;

  const allReviews = [
    { name: "Crystal M.", date: "1 week ago", title: "My scalp finally stopped itching!", content: "I never knew my shower water was the problem. After just one week with this filter, my scalp stopped itching completely. The water feels so soft and my hair is already shinier." },
    { name: "Denise W.", date: "2 weeks ago", title: "Game changer for my edges", content: "I've been losing my edges for years and nothing worked. Two weeks with this shower filter and I can already feel less hair coming out when I wash. The pressure is amazing too!" },
    { name: "Aaliyah P.", date: "3 weeks ago", title: "Worth every single penny", content: "I was skeptical about a shower head helping my hair, but WOW. My scalp used to burn after every shower. Now it feels calm and soothed. Installation took 3 minutes!" },
    { name: "Brianna H.", date: "1 month ago", title: "My hair products finally work!", content: "I couldn't understand why my expensive products weren't working. Turns out there was a mineral barrier on my scalp from hard water. This filter changed everything!" },
    { name: "Jasmine T.", date: "2 weeks ago", title: "Incredible water pressure", content: "Not only is my scalp healthier, but the water pressure is AMAZING. It's like a spa shower every day. My whole family loves it." },
    { name: "Keisha L.", date: "1 month ago", title: "Reduced shedding dramatically", content: "I used to see so much hair in my drain after every shower. After 3 weeks with this filter, the shedding has reduced by at least 60%. I'm in shock." },
    { name: "Monica R.", date: "3 weeks ago", title: "No more scalp inflammation", content: "My dermatologist couldn't figure out why my scalp was always red and irritated. Switched to this filter and the inflammation is GONE. Clean water makes such a difference." },
    { name: "Tiffany J.", date: "2 weeks ago", title: "My braids last longer now", content: "Since using this filter, my braids look fresher longer. Less buildup, less itching, and my scalp stays healthy even under protective styles." },
    { name: "Sierra K.", date: "1 week ago", title: "Installation was so easy", content: "I'm not handy at all but I installed this in under 5 minutes. No tools needed! And the results have been incredible for my hair." },
    { name: "Destiny A.", date: "1 month ago", title: "Baby hairs are growing back", content: "I noticed new baby hairs along my hairline after just 4 weeks of using this filter. My edges are slowly coming back to life!" },
    { name: "Ebony C.", date: "2 weeks ago", title: "Softest water ever", content: "The water feels SO soft compared to before. My skin and hair are both benefiting. No more dryness or irritation." },
    { name: "Faith B.", date: "3 weeks ago", title: "My whole family uses it", content: "I bought this for my hair but everyone in my house has noticed improvements. My husband's dry scalp is better too!" },
    { name: "Gabrielle S.", date: "1 month ago", title: "Finally understand the hype", content: "I didn't believe shower water could affect my hair this much. I was wrong. This filter has transformed my hair care routine completely." },
    { name: "Hope D.", date: "2 weeks ago", title: "No more chlorine smell", content: "I could always smell chlorine in my bathroom before. Now the water smells clean and fresh. And my hair is so much healthier!" },
    { name: "Imani F.", date: "1 week ago", title: "Spa-like experience", content: "This shower head makes every shower feel like a luxury spa treatment. Wide rainfall coverage, great pressure, and filtered water. Perfect!" },
    { name: "Jade N.", date: "3 weeks ago", title: "My scalp can finally breathe", content: "It's like my scalp can finally breathe! No more clogged follicles from mineral buildup. I can feel the difference when I massage my scalp." },
    { name: "Kiara G.", date: "1 month ago", title: "Hair growth is accelerating", content: "I've been tracking my hair growth and it's definitely faster since installing this filter. My follicles are finally in a healthy environment." },
    { name: "Latoya V.", date: "2 weeks ago", title: "Best purchase I've made", content: "Out of all the hair products I've bought, this shower filter has made the biggest difference. Should have bought it sooner!" },
    { name: "Maya E.", date: "3 weeks ago", title: "Inflammation is gone", content: "I had chronic scalp inflammation that no product could fix. Turns out it was my water! This filter solved the problem at the source." },
    { name: "Nia Q.", date: "1 week ago", title: "My wig sits better now", content: "My scalp used to be so irritated under my wigs. Now it stays calm and comfortable all day. This filter was the missing piece!" },
    { name: "Olivia Z.", date: "1 month ago", title: "Visible hair transformation", content: "My hair texture has completely changed. It's softer, shinier, and stronger. I never knew my water was causing so much damage." },
    { name: "Porsha U.", date: "2 weeks ago", title: "No more flaky scalp", content: "My scalp used to flake so badly. After two weeks with this filter, the flakes are gone. Clean water = healthy scalp!" },
    { name: "Queen Y.", date: "3 weeks ago", title: "Worth the investment", content: "I hesitated because of the price but this filter is worth every dollar. The improvement in my hair and scalp health is priceless." },
    { name: "Raven O.", date: "1 month ago", title: "My stylist noticed the difference", content: "My hairstylist asked what I changed because my scalp looks so much healthier. I told her about this filter immediately!" },
    { name: "Simone I.", date: "2 weeks ago", title: "No tools needed at all", content: "I installed this completely by hand. So easy! And the difference in water quality is immediately noticeable." },
    { name: "Tamara X.", date: "1 week ago", title: "Hair shedding stopped", content: "I used to lose handfuls of hair in the shower. Now I barely see any hair in my drain. This filter stopped my shedding." },
    { name: "Unique W.", date: "3 weeks ago", title: "Scalp feels renewed", content: "My scalp feels like it's been renewed. No more tightness, no more irritation. Just healthy, happy scalp every day." },
    { name: "Vivian A.", date: "1 month ago", title: "Changed my hair game", content: "I thought I had tried everything for my hair. This filter changed the game completely. Clean water is the foundation." },
    { name: "Whitney H.", date: "2 weeks ago", title: "Edges filling in!", content: "My edges are actually filling in! After years of loss, I'm finally seeing regrowth. This filter removed the barrier that was stopping growth." },
    { name: "Xena M.", date: "3 weeks ago", title: "Pressure is incredible", content: "I was worried about losing water pressure with a filter but it's actually STRONGER! Plus my hair is so much healthier." },
    { name: "Yolanda C.", date: "1 month ago", title: "Whole bathroom smells better", content: "No more chlorine smell in my bathroom. The water smells and feels clean. My hair and skin are thriving." },
    { name: "Zaria T.", date: "2 weeks ago", title: "My hair finally shines", content: "My hair was always dull no matter what I did. Now it actually shines! The mineral coating is finally gone." },
    { name: "Amber F.", date: "1 week ago", title: "Better than expected", content: "I had low expectations but this filter exceeded them all. Installation was easy, water feels amazing, and my hair is transforming." },
    { name: "Briana D.", date: "3 weeks ago", title: "Scalp finally healed", content: "I had sores on my scalp from inflammation. After using this filter, they've healed completely. Clean water made all the difference." },
    { name: "Chanel R.", date: "1 month ago", title: "My growth serums work now!", content: "I was wasting money on growth serums that couldn't penetrate my scalp. Now they actually work because the mineral barrier is gone!" },
    { name: "Diamond L.", date: "2 weeks ago", title: "Luxury shower experience", content: "The rainfall pattern is so luxurious. It feels like a high-end spa every time I shower. And my hair has never been healthier." },
    { name: "Essence B.", date: "3 weeks ago", title: "Hard water problem solved", content: "I live in a hard water area and it was destroying my hair. This filter solved the problem completely. Total transformation!" },
    { name: "Francesca J.", date: "1 month ago", title: "My kids love it too", content: "My daughters' hair is also benefiting from the filtered water. Less tangles, more shine, healthier scalps all around." },
    { name: "Grace K.", date: "2 weeks ago", title: "Finally found the solution", content: "After years of scalp problems, I finally found the solution. It was my water all along! This filter fixed everything." },
    { name: "Harmony P.", date: "1 week ago", title: "Hair breakage reduced", content: "My hair used to break so easily. Since using this filter, the breakage has significantly reduced. My hair is stronger now." },
    { name: "Iris S.", date: "3 weeks ago", title: "Best shower head ever", content: "This is the best shower head I've ever owned. Great pressure, wide coverage, and it's actually helping my hair grow!" },
    { name: "Julia V.", date: "1 month ago", title: "Scalp pH is balanced", content: "I could tell my scalp pH was off because of constant irritation. This filter balanced everything. My scalp is finally neutral." },
    { name: "Kira N.", date: "2 weeks ago", title: "No more product buildup", content: "I used to have so much buildup on my scalp. The filtered water rinses clean every time. My products work better now." },
    { name: "Lila G.", date: "3 weeks ago", title: "Chlorine was the culprit", content: "I never realized chlorine was causing my hair problems. This filter removes 99% of it and my hair shows the difference!" },
    { name: "Mia E.", date: "1 month ago", title: "Transformed my routine", content: "This filter has transformed my entire hair care routine. Everything works better when you start with clean water." },
    { name: "Nina Q.", date: "2 weeks ago", title: "Easy maintenance", content: "The filter is easy to maintain and the touch-to-clean nozzles prevent mineral buildup. Practical and effective!" },
    { name: "Ophelia Z.", date: "1 week ago", title: "My edges are safe", content: "My edges were disappearing. This filter stopped the damage at the source. Now they're recovering!" },
    { name: "Penelope Y.", date: "3 weeks ago", title: "Water quality changed", content: "You can literally feel the difference in water quality. It's softer, cleaner, and better for your hair in every way." },
    { name: "Rachel X.", date: "1 month ago", title: "Dermatologist recommended", content: "My dermatologist actually recommended filtering my shower water. This product delivered exactly what I needed." },
    { name: "Sandra W.", date: "2 weeks ago", title: "Investment in my hair", content: "I see this as an investment in my hair's future. The results speak for themselves. Healthier scalp, stronger hair." },
    { name: "Teresa U.", date: "3 weeks ago", title: "Rainfall is relaxing", content: "The wide rainfall pattern is so relaxing. Plus my hair is healthier. It's a win-win every single shower." },
    { name: "Ulani T.", date: "1 month ago", title: "Fixed my shedding problem", content: "I was shedding excessively for years. This filter fixed the problem in weeks. My drain is finally clear!" },
    { name: "Vera S.", date: "2 weeks ago", title: "Beautiful chrome finish", content: "It looks beautiful in my bathroom AND it works amazingly. The chrome finish is high quality and matches my fixtures." },
    { name: "Wanda R.", date: "1 week ago", title: "Best decision for my hair", content: "Installing this filter was the best decision I made for my hair this year. Wish I had done it sooner!" },
  ];

  const totalPages = Math.ceil(allReviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const currentReviews = allReviews.slice(startIndex, startIndex + reviewsPerPage);

  return (
    <div className="max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-primary">Customer Reviews</h2>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (<Star key={star} className="w-5 h-5 fill-brand-gold text-brand-gold" />))}
            </div>
            <span className="font-semibold">5.0</span>
            <span className="text-muted-foreground">({allReviews.length} reviews)</span>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {currentReviews.map((review, index) => (
          <div key={startIndex + index} className="p-5 rounded-lg border border-border bg-background">
            <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
              <div><h4 className="font-semibold text-foreground">{review.name}</h4><p className="text-xs text-muted-foreground">{review.date}</p></div>
              <div className="flex">{[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />))}</div>
            </div>
            <h5 className="font-semibold text-foreground mb-2">{review.title}</h5>
            <p className="text-sm text-muted-foreground leading-relaxed">{review.content}</p>
          </div>
        ))}
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
