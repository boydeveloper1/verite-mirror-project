// Mist Reviews Database - Force rebuild v1 - 127 reviews
export interface MistReview {
  id: string;
  name: string;
  date: string;
  rating: 5; // All reviews are 5 stars
  title: string;
  content: string;
  verified: boolean;
  helpful: number;
  category: string;
}

// Categories for the mist product
export const mistReviewCategories = [
  { value: 'all', label: 'All Categories' },
  { value: 'edge-regrowth', label: 'Edge Regrowth' },
  { value: 'shedding', label: 'Reduced Shedding' },
  { value: 'itch-relief', label: 'Itch Relief' },
  { value: 'wig-braids', label: 'Wig & Braid Users' },
  { value: 'texture', label: 'Scalp Texture' },
];

// Total "claimed" reviews for display
export const TOTAL_MIST_REVIEWS = 127;
export const MIST_RATING = "4.9";

const reviewTitles = [
  "Finally something that actually works!",
  "My edges are coming back",
  "Life changing product",
  "Best scalp treatment ever",
  "No more itching!",
  "Obsessed with this mist",
  "Worth every penny",
  "Game changer for my routine",
  "My braids don't hurt anymore",
  "Wig wearer essential",
  "Saw results in weeks",
  "Baby hairs are growing",
  "My scalp finally feels calm",
  "Reduced shedding dramatically",
  "This is the real deal",
  "Can't live without it now",
  "My hair stylist noticed!",
  "Better than prescription treatments",
  "Cooling relief is amazing",
  "Perfect for sensitive scalp",
];

const reviewContents = [
  "I tried every growth serum out there. Nothing worked until I realized the problem was inflammation. This mist calmed my scalp in days. Week 4: I see baby hairs. Week 8: My edges are BACK.",
  "I used to dread getting my braids done because of the pain. Now I spray this right after installation and the relief is instant. My scalp stays calm the entire time.",
  "As someone who wears wigs daily, my edges were suffering. This has become part of my morning routine. My hairline has never looked better.",
  "I was skeptical at first but this actually works. My scalp feels so much better and I can see new growth along my edges.",
  "I have tried everything and nothing compares to this. The cooling sensation is amazing and my hair is growing back.",
  "The itching under my wig was unbearable. This spray stopped it completely. I can finally wear my wigs comfortably all day.",
  "After years of tight ponytails, my edges were gone. Two months with this product and I can see real progress.",
  "I keep my hair in braids most of the time. This keeps my scalp healthy and my hair growing underneath.",
  "I spent so much money on products that did not work. This is the only one that actually delivered results.",
  "Added this to my morning routine and the difference is incredible. My scalp is no longer dry and flaky.",
  "The relief I feel after spraying this is amazing. My scalp thanks me every day.",
  "I was hesitant about the price but the results speak for themselves. My hair has never been healthier.",
  "My shedding has reduced by at least 70%. I used to lose handfuls in the shower. Now barely anything.",
  "The peppermint cooling sensation is heavenly. My inflamed scalp finally has relief.",
  "I've dealt with traction alopecia for years. This is the first product that's helped my edges recover.",
  "My dermatologist recommended finding something for inflammation. This did the trick!",
  "I spray this morning and night religiously. The consistency has paid off - visible baby hairs!",
  "Perfect for postpartum hair loss. My scalp was so irritated and this calmed everything down.",
  "I've recommended this to all my friends. We're all seeing results together.",
  "The formula is so lightweight. No greasiness, no buildup. Just results.",
];

const names = [
  "Michelle T.", "Jasmine R.", "Tiffany W.", "Keisha M.", "Danielle S.",
  "Aaliyah J.", "Brianna C.", "Crystal D.", "Destiny H.", "Ebony L.",
  "Faith N.", "Gabrielle P.", "Harmony Q.", "Imani R.", "Jade S.",
  "Kendra T.", "Latoya U.", "Monica V.", "Natasha W.", "Olivia X.",
  "Patricia Y.", "Quinn Z.", "Rhonda A.", "Simone B.", "Tamika C.",
  "Unique D.", "Vanessa E.", "Whitney F.", "Yvonne G.", "Zara H.",
];

const timeUnits = [
  "2 minutes ago", "5 minutes ago", "12 minutes ago", "23 minutes ago",
  "1 hour ago", "2 hours ago", "3 hours ago", "5 hours ago",
  "Yesterday", "2 days ago", "3 days ago", "4 days ago", "5 days ago",
  "1 week ago", "2 weeks ago", "3 weeks ago", "1 month ago", "2 months ago",
];

const categories = ['edge-regrowth', 'shedding', 'itch-relief', 'wig-braids', 'texture'];

function generateReviews(): MistReview[] {
  const reviews: MistReview[] = [];
  const REVIEW_COUNT = 127;

  for (let i = 0; i < REVIEW_COUNT; i++) {
    const nameIndex = i % names.length;
    const titleIndex = i % reviewTitles.length;
    const contentIndex = i % reviewContents.length;
    const dateIndex = Math.min(i, timeUnits.length - 1);
    const categoryIndex = i % categories.length;

    reviews.push({
      id: `mist-review-${i + 1}`,
      name: names[nameIndex],
      date: i < timeUnits.length ? timeUnits[i] : `${Math.floor(i / 10) + 1} months ago`,
      rating: 5, // All reviews are 5 stars
      title: reviewTitles[titleIndex],
      content: reviewContents[contentIndex],
      verified: Math.random() > 0.15, // 85% verified
      helpful: Math.floor(Math.random() * 50) + (REVIEW_COUNT - i), // More recent = fewer helpful votes
      category: categories[categoryIndex],
    });
  }

  return reviews;
}

export const mistReviews: MistReview[] = generateReviews();
