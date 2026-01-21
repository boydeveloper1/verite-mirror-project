export interface Review {
  id: string;
  name: string;
  date: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  content: string;
  category: 'water-quality' | 'hair-results' | 'installation' | 'scalp-health' | 'value';
  verified: boolean;
  helpful: number;
}

export const showerHeadReviewCategories = [
  { value: 'all', label: 'All Categories' },
  { value: 'water-quality', label: 'Water Quality' },
  { value: 'hair-results', label: 'Hair Results' },
  { value: 'installation', label: 'Installation' },
  { value: 'scalp-health', label: 'Scalp Health' },
  { value: 'value', label: 'Value' },
];

export const mistReviewCategories = [
  { value: 'all', label: 'All Categories' },
  { value: 'itch-relief', label: 'Itch Relief' },
  { value: 'edge-regrowth', label: 'Edge Regrowth' },
  { value: 'shedding', label: 'Shedding Reduction' },
  { value: 'protective-styles', label: 'Protective Styles' },
  { value: 'overall', label: 'Overall Experience' },
];

const names = [
  "Crystal M.", "Denise W.", "Aaliyah P.", "Brianna H.", "Jasmine T.", "Keisha L.", "Monica R.", "Tiffany J.", "Sierra K.", "Destiny A.",
  "Ebony C.", "Faith B.", "Gabrielle S.", "Hope D.", "Imani F.", "Jade N.", "Kiara G.", "Latoya V.", "Maya E.", "Nia Q.",
  "Olivia Z.", "Porsha U.", "Queen Y.", "Raven O.", "Simone I.", "Tamara X.", "Unique W.", "Vivian A.", "Whitney H.", "Xena M.",
  "Yolanda C.", "Zaria T.", "Amber F.", "Briana D.", "Chanel R.", "Diamond L.", "Essence B.", "Francesca J.", "Grace K.", "Harmony P.",
  "Iris S.", "Julia V.", "Kira N.", "Lila G.", "Mia E.", "Nina Q.", "Ophelia Z.", "Penelope Y.", "Rachel X.", "Sandra W.",
  "Teresa U.", "Ulani T.", "Vera S.", "Wanda R.", "Alexis M.", "Bianca L.", "Carmen T.", "Deja R.", "Erica H.", "Fiona P.",
  "Georgia B.", "Helena C.", "Ingrid D.", "Jackie E.", "Kennedy F.", "Lucia G.", "Mariana H.", "Natasha I.", "Oona J.", "Patricia K.",
  "Quinn L.", "Rosa M.", "Selena N.", "Tatiana O.", "Ursula P.", "Valentina Q.", "Wendy R.", "Xiomara S.", "Yara T.", "Zoe U.",
  "Adriana V.", "Beatriz W.", "Carolina X.", "Daniela Y.", "Elena Z.", "Fernanda A.", "Guadalupe B.", "Hortensia C.", "Isabella D.", "Josefina E.",
  "Karla F.", "Liliana G.", "Margarita H.", "Nadia I.", "Ofelia J.", "Paloma K.", "Quintina L.", "Rebeca M.", "Susana N.", "Tania O."
];

const titles = {
  'water-quality': [
    "My scalp finally stopped itching!", "Softest water ever", "No more chlorine smell", "Incredible water pressure",
    "Water quality changed my life", "Hard water problem solved", "Whole bathroom smells better", "No more product buildup",
    "Chlorine was the culprit", "Pure water showers now", "Best water ever", "Clean, soft water", "Water feels amazing",
    "Finally clean water", "Crystal clear difference", "Pure shower experience", "Water transformation", "Soft water at last"
  ],
  'hair-results': [
    "Game changer for my edges", "My hair products finally work!", "Reduced shedding dramatically", "Baby hairs are growing back",
    "My hair finally shines", "Hair growth is accelerating", "Visible hair transformation", "My stylist noticed the difference",
    "Hair shedding stopped", "Edges filling in!", "Hair texture improved", "Strong, healthy hair", "Hair is amazing now",
    "Complete hair transformation", "Incredible results", "Hair breakage reduced", "Curl pattern restored", "Shine is back"
  ],
  'installation': [
    "Installation was so easy", "No tools needed at all", "Beautiful chrome finish", "Quick and easy setup",
    "Easy maintenance", "Super easy setup", "Effortless install", "Simple installation", "Easy, effective filter",
    "5 minute install", "No plumber needed", "DIY friendly", "Foolproof setup", "Perfect fit first try"
  ],
  'scalp-health': [
    "No more scalp inflammation", "My braids last longer now", "My scalp can finally breathe", "Inflammation is gone",
    "My wig sits better now", "No more flaky scalp", "Scalp feels renewed", "Scalp pH is balanced", "Finally healthy scalp",
    "Scalp inflammation cleared", "Dermatologist approved results", "No more irritation", "Calm, soothed scalp", "Scalp healed completely"
  ],
  'value': [
    "Worth every single penny", "Spa-like experience", "Best purchase I've made", "Worth the investment",
    "Best decision for my hair", "Changed my hair game", "My whole family uses it", "Perfect investment",
    "Luxury shower experience", "Transformed my routine", "Best money ever spent", "Would buy again instantly", "Gift for myself"
  ]
};

const contents = {
  'water-quality': [
    "I never knew my shower water was the problem. After just one week with this filter, my scalp stopped itching completely. The water feels so soft and my hair is already shinier.",
    "The water feels SO soft compared to before. My skin and hair are both benefiting. No more dryness or irritation.",
    "I could always smell chlorine in my bathroom before. Now the water smells clean and fresh. And my hair is so much healthier!",
    "Not only is my scalp healthier, but the water pressure is AMAZING. It's like a spa shower every day. My whole family loves it.",
    "You can literally feel the difference in water quality. It's softer, cleaner, and better for your hair in every way.",
    "I live in a hard water area and it was destroying my hair. This filter solved the problem completely. Total transformation!",
    "No more chlorine smell in my bathroom. The water smells and feels clean. My hair and skin are thriving.",
    "I used to have so much buildup on my scalp. The filtered water rinses clean every time. My products work better now.",
    "I never realized chlorine was causing my hair problems. This filter removes 99% of it and my hair shows the difference!",
    "Every shower is now a pure water shower. My hair loves it and shows it with shine and strength."
  ],
  'hair-results': [
    "I've been losing my edges for years and nothing worked. Two weeks with this shower filter and I can already feel less hair coming out when I wash.",
    "I couldn't understand why my expensive products weren't working. Turns out there was a mineral barrier on my scalp from hard water. This filter changed everything!",
    "I used to see so much hair in my drain after every shower. After 3 weeks with this filter, the shedding has reduced by at least 60%. I'm in shock.",
    "I noticed new baby hairs along my hairline after just 4 weeks of using this filter. My edges are slowly coming back to life!",
    "My hair texture has completely changed. It's softer, shinier, and stronger. I never knew my water was causing so much damage.",
    "I've been tracking my hair growth and it's definitely faster since installing this filter. My follicles are finally in a healthy environment.",
    "My hairstylist asked what I changed because my scalp looks so much healthier. I told her about this filter immediately!",
    "I used to lose handfuls of hair in the shower. Now I barely see any hair in my drain. This filter stopped my shedding.",
    "My edges are actually filling in! After years of loss, I'm finally seeing regrowth. This filter removed the barrier that was stopping growth.",
    "My natural curls are so much more defined now. The hard water was ruining my curl pattern!"
  ],
  'installation': [
    "I'm not handy at all but I installed this in under 5 minutes. No tools needed! And the results have been incredible for my hair.",
    "I installed this completely by hand. So easy! And the difference in water quality is immediately noticeable.",
    "It looks beautiful in my bathroom AND it works amazingly. The chrome finish is high quality and matches my fixtures.",
    "Had this installed in under 5 minutes. Immediately noticed the difference in water softness.",
    "The filter is easy to maintain and the touch-to-clean nozzles prevent mineral buildup. Practical and effective!",
    "Super easy installation. Even I could do it without help. Working perfectly with great water pressure.",
    "Effortless installation. Working perfectly with great water pressure from day one.",
    "The most simple installation. Working beautifully from day one without any issues.",
    "Easy to install and incredibly effective. My hair is transformed after just two weeks.",
    "Quick and easy installation. Immediate improvement in water quality that I could feel right away."
  ],
  'scalp-health': [
    "My dermatologist couldn't figure out why my scalp was always red and irritated. Switched to this filter and the inflammation is GONE.",
    "Since using this filter, my braids look fresher longer. Less buildup, less itching, and my scalp stays healthy even under protective styles.",
    "It's like my scalp can finally breathe! No more clogged follicles from mineral buildup. I can feel the difference when I massage my scalp.",
    "I had chronic scalp inflammation that no product could fix. Turns out it was my water! This filter solved the problem at the source.",
    "My scalp used to be so irritated under my wigs. Now it stays calm and comfortable all day. This filter was the missing piece!",
    "My scalp used to flake so badly. After two weeks with this filter, the flakes are gone. Clean water = healthy scalp!",
    "My scalp feels like it's been renewed. No more tightness, no more irritation. Just healthy, happy scalp every day.",
    "I could tell my scalp pH was off because of constant irritation. This filter balanced everything. My scalp is finally neutral.",
    "Doctor told me I had scalp inflammation. Three weeks with this filter and it's completely cleared up.",
    "After years of problems, my scalp is finally healthy. No more itching, no more flaking, just healthy scalp."
  ],
  'value': [
    "I was skeptical about a shower head helping my hair, but WOW. My scalp used to burn after every shower. Now it feels calm and soothed. Installation took 3 minutes!",
    "This shower head makes every shower feel like a luxury spa treatment. Wide rainfall coverage, great pressure, and filtered water. Perfect!",
    "Out of all the hair products I've bought, this shower filter has made the biggest difference. Should have bought it sooner!",
    "I hesitated because of the price but this filter is worth every dollar. The improvement in my hair and scalp health is priceless.",
    "Installing this filter was the best decision I made for my hair this year. Wish I had done it sooner!",
    "I thought I had tried everything for my hair. This filter changed the game completely. Clean water is the foundation.",
    "I bought this for my hair but everyone in my house has noticed improvements. My husband's dry scalp is better too!",
    "Perfect investment in my hair's future. No regrets at all. Best money I've ever spent on hair care.",
    "The rainfall pattern is so luxurious. It feels like a high-end spa every time I shower. And my hair has never been healthier.",
    "This filter has transformed my entire hair care routine. Everything works better when you start with clean water."
  ]
};

const recentDates = [
  "2 minutes ago", "5 minutes ago", "8 minutes ago", "12 minutes ago", "18 minutes ago",
  "23 minutes ago", "35 minutes ago", "42 minutes ago", "55 minutes ago",
  "1 hour ago", "2 hours ago", "3 hours ago", "4 hours ago", "5 hours ago", "6 hours ago",
  "8 hours ago", "10 hours ago", "12 hours ago", "14 hours ago", "18 hours ago",
  "Yesterday", "2 days ago", "3 days ago", "4 days ago", "5 days ago", "6 days ago",
  "1 week ago", "1 week ago", "2 weeks ago", "2 weeks ago", "2 weeks ago",
  "3 weeks ago", "3 weeks ago", "3 weeks ago", "1 month ago", "1 month ago",
  "1 month ago", "2 months ago", "2 months ago", "3 months ago"
];

const categories: Array<'water-quality' | 'hair-results' | 'installation' | 'scalp-health' | 'value'> = [
  'water-quality', 'hair-results', 'installation', 'scalp-health', 'value'
];

function generateReviews(): Review[] {
  const reviews: Review[] = [];
  
  for (let i = 0; i < 500; i++) {
    const category = categories[i % categories.length];
    const name = names[i % names.length];
    const titleList = titles[category];
    const contentList = contents[category];
    
    // First 15 reviews are very recent (minutes/hours ago)
    let date: string;
    if (i < 15) {
      date = recentDates[i];
    } else {
      date = recentDates[Math.min(i % recentDates.length + 15, recentDates.length - 1)];
    }
    
    // Mostly 5-star reviews, some 4-star
    const rating: 1 | 2 | 3 | 4 | 5 = i % 10 === 9 ? 4 : 5;
    
    reviews.push({
      id: `sh-${i + 1}`,
      name,
      date,
      rating,
      title: titleList[i % titleList.length],
      content: contentList[i % contentList.length],
      category,
      verified: true,
      helpful: Math.floor(Math.random() * 500) + 50
    });
  }
  
  return reviews;
}

export const showerHeadReviews: Review[] = generateReviews();

export const TOTAL_SHOWER_HEAD_REVIEWS = 14520;
export const SHOWER_HEAD_RATING = 5.0;
