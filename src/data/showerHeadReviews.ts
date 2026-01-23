export interface Review {
  id: string;
  name: string;
  date: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  content: string;
  category: 'eczema' | 'psoriasis' | 'rosacea' | 'acne' | 'sensitive-skin' | 'installation';
  verified: boolean;
  helpful: number;
}

export const showerHeadReviewCategories = [
  { value: 'all', label: 'All Conditions' },
  { value: 'eczema', label: 'Eczema' },
  { value: 'psoriasis', label: 'Psoriasis' },
  { value: 'rosacea', label: 'Rosacea' },
  { value: 'acne', label: 'Acne' },
  { value: 'sensitive-skin', label: 'Sensitive Skin' },
  { value: 'installation', label: 'Installation' },
];

export const mistReviewCategories = [
  { value: 'all', label: 'All Categories' },
  { value: 'itch-relief', label: 'Itch Relief' },
  { value: 'edge-regrowth', label: 'Edge Regrowth' },
  { value: 'shedding', label: 'Shedding Reduction' },
  { value: 'protective-styles', label: 'Protective Styles' },
  { value: 'overall', label: 'Overall Experience' },
];

// Names representing adults 30-55 demographic
const names = [
  "Sarah M., 42", "Jennifer L., 38", "Michelle K., 45", "Amanda R., 35", "Stephanie H., 41", "Nicole P., 39", "Christina B., 47", "Rebecca T., 36", "Laura S., 44", "Angela D.",
  "Maria G., 52", "Lisa W., 48", "Patricia N., 51", "Linda C., 49", "Susan E., 43", "Karen A., 46", "Nancy J., 37", "Betty F., 53", "Dorothy I., 40", "Sandra O.",
  "Michael R., 44", "David K., 38", "James T., 47", "Robert H., 41", "William P., 35", "Richard S., 50", "Joseph B., 43", "Thomas N., 39", "Charles M., 48", "Daniel L.",
  "Jessica W., 34", "Ashley V., 32", "Emily Z., 36", "Megan Y., 33", "Hannah X., 31", "Rachel Q., 37", "Lauren U., 35", "Samantha C., 38", "Katherine B., 40", "Victoria A.",
  "Christopher G., 45", "Matthew E., 42", "Andrew D., 39", "Joshua F., 36", "Brandon I., 33", "Ryan J., 41", "Kevin K., 44", "Brian L., 38", "Steven M., 47", "Timothy N.",
  "Elizabeth O., 49", "Margaret P., 52", "Catherine Q., 46", "Deborah R., 51", "Diane S., 48", "Carol T., 43", "Ruth U., 55", "Sharon V., 50", "Cynthia W., 45", "Donna X.",
  "Mark Y., 40", "Paul Z., 37", "George A., 54", "Kenneth B., 49", "Edward C., 46", "Ronald D., 52", "Anthony E., 43", "Gary F., 47", "Larry G., 51", "Frank H.",
  "Barbara I., 44", "Susan J., 39", "Jessica K., 35", "Sarah L., 41", "Karen M., 48", "Nancy N., 53", "Lisa O., 46", "Betty P., 50", "Helen Q., 54", "Donna R.",
  "Jeffrey S., 38", "Scott T., 42", "Gregory U., 45", "Raymond V., 49", "Benjamin W., 36", "Samuel X., 41", "Patrick Y., 44", "Jack Z., 48", "Dennis A., 52", "Jerry B.",
  "Theresa C., 47", "Ann D., 43", "Janet E., 39", "Catherine F., 35", "Frances G., 51", "Gloria H., 48", "Alice I., 44", "Janice J., 40", "Marie K., 36", "Jean L."
];

const titles = {
  'eczema': [
    "My eczema finally stopped flaring after every shower",
    "20 years of eczema—this filter changed everything",
    "No more post-shower itching and burning",
    "My dermatologist couldn't believe the improvement",
    "Eczema on my arms cleared up in 3 weeks",
    "I can finally shower without dreading the aftermath",
    "Steroid cream dependency reduced significantly",
    "My skin stopped cracking and bleeding",
    "First time my eczema has been this calm",
    "Hard water was my eczema trigger all along",
    "No more waking up scratching",
    "My kids' eczema improved too",
    "Finally found the root cause of my flare-ups",
    "Shower water was sabotaging my skin",
    "Eczema flares went from daily to rare",
    "Sleep through the night now—no itching",
    "My skin barrier is finally healing",
    "Chlorine was the hidden enemy"
  ],
  'psoriasis': [
    "Psoriasis flare-ups reduced dramatically",
    "My scaling has decreased by 70%",
    "First relief in 15 years of psoriasis",
    "Plaques are finally clearing",
    "Less reliance on prescription medications now",
    "My psoriasis patches are shrinking",
    "Scalp psoriasis finally under control",
    "Doctor noticed improvement at my last visit",
    "Hard water was making my psoriasis worse",
    "Shower doesn't trigger flares anymore",
    "My confidence is coming back",
    "Skin is smoother than it's been in years",
    "Reduced redness and scaling",
    "Can finally wear short sleeves again",
    "Psoriasis journey changed with this filter",
    "Medical bills are decreasing",
    "Inflammation finally subsiding",
    "My skin feels normal for the first time"
  ],
  'rosacea': [
    "My face stopped burning after showers",
    "Rosacea redness reduced significantly",
    "No more post-shower facial flushing",
    "I can finally wear makeup again",
    "Chlorine was triggering my rosacea",
    "Flare-ups went from daily to weekly",
    "My cheeks aren't constantly red anymore",
    "Face feels calm after every shower now",
    "Rosacea under control without harsh treatments",
    "Hot showers no longer trigger flares",
    "My skin tone is evening out",
    "No more burning, stinging sensation",
    "Visible veins are less prominent",
    "People stopped asking if I'm sunburned",
    "Foundation finally matches my skin",
    "Confidence restored after years of hiding",
    "Facial inflammation is gone",
    "My rosacea journey changed overnight"
  ],
  'acne': [
    "Adult acne finally clearing up",
    "Bacne disappeared in 2 weeks",
    "My pores aren't clogged anymore",
    "Chest breakouts stopped completely",
    "Hard water was clogging my pores",
    "Clearer skin without harsh products",
    "Jawline acne finally under control",
    "My expensive skincare finally works",
    "Breakouts reduced by 80%",
    "No more painful cystic acne",
    "Hormonal acne responding better now",
    "Face is clearer than it's been since my 20s",
    "Body acne gone completely",
    "Mineral buildup was the problem",
    "Products absorb properly now",
    "Chloracne was my issue—solved",
    "Fewer breakouts, more confidence",
    "Clear skin at 40 finally"
  ],
  'sensitive-skin': [
    "No more post-shower burning and tightness",
    "My skin stopped reacting to everything",
    "Finally found what was irritating my skin",
    "Sensitive skin calm after every shower",
    "Products no longer burn my face",
    "Skincare routine finally working",
    "No more reactive, angry skin",
    "My skin barrier is finally intact",
    "Dermatitis symptoms disappeared",
    "Hard water sensitivity solved",
    "Gentle on my extremely sensitive skin",
    "No more mystery flare-ups",
    "My skin can tolerate more products now",
    "Irritation and redness gone",
    "Finally comfortable in my own skin",
    "Water pH was disrupting my skin",
    "Chronic sensitivity resolved",
    "My face isn't on fire anymore"
  ],
  'installation': [
    "Easy 5-minute install—immediate results",
    "No tools needed, works perfectly",
    "Beautiful finish, even better results",
    "Universal fit—worked on first try",
    "Quick setup, life-changing results",
    "Husband installed in 3 minutes",
    "Apartment-friendly installation",
    "Looks luxury, works even better",
    "DIY installation, spa-like results",
    "Perfect pressure, beautiful design",
    "Fits any standard shower arm",
    "Easy maintenance, long-lasting filter",
    "Renter-friendly—no landlord permission needed",
    "Quick change when filter needs replacing"
  ]
};

const contents = {
  'eczema': [
    "I've had eczema for 20 years and tried everything—steroid creams, elimination diets, expensive moisturizers. Nothing worked long-term. Then I learned about how chlorine and hard water damage the skin barrier. Within 2 weeks of using this filter, my post-shower itching stopped completely. I'm in tears writing this.",
    "My dermatologist couldn't figure out why my eczema kept flaring. I was spending $300/month on treatments. A friend suggested my shower water might be the issue. This filter removed 99% of chlorine and my skin hasn't been this calm in years. I wish I'd known about this sooner.",
    "Every shower used to trigger a full-body flare. Burning, itching, cracked skin on my arms and legs. I dreaded bathing. After installing this filter, showers became something I look forward to again. My skin heals between showers now instead of getting worse.",
    "I was using steroid creams daily and worried about long-term side effects. Since switching to filtered water, I've reduced my steroid use by 75%. My skin barrier is actually healing for the first time. This addresses the root cause, not just symptoms.",
    "My eczema was so bad I was losing sleep scratching. My sheets had blood stains from scratching at night. Three weeks with this filter and I'm sleeping through the night. The chlorine in my water was triggering my inflammatory response every single day.",
    "Moved to Phoenix and my eczema exploded. Hard water here is terrible. Dermatologist visits, prescription creams, nothing helped long-term. This filter was my last resort and it actually worked. Should have started with the water, not more creams.",
    "I've spent thousands on eczema treatments over the years. This $118 shower head has done more for my skin than years of prescription medications. The science makes sense—stop putting inflammatory chemicals on your skin every day.",
    "My 8-year-old daughter has severe eczema. We've tried everything. After one week with this filter, her skin stopped cracking open. She can shower without crying now. I'm ordering one for every bathroom in our house.",
    "Hard water was destroying my skin barrier. I could feel the film it left on my skin. This filter removes that completely. My skin can finally retain moisture and my eczema is 80% better.",
    "Every product I put on my skin used to burn. Turns out there was a mineral barrier from hard water blocking absorption and trapping irritants. Clean water changed everything. My serums finally work."
  ],
  'psoriasis': [
    "I've had plaque psoriasis for 15 years. Biologics helped but I still had flares after showers. Turns out the chlorine was undoing my medication's work. This filter lets my treatment actually work. My plaques are finally clearing.",
    "My scalp psoriasis was embarrassing. Flakes everywhere, constant itching. Two weeks with filtered water and the scaling has reduced dramatically. I can wear dark colors again without worrying about flakes on my shoulders.",
    "Spent $500/month on psoriasis medications. Still had flares. My dermatologist finally mentioned water quality. This filter was a fraction of my monthly med cost and my skin has never been better. Why isn't this recommended to every psoriasis patient?",
    "I was ashamed to show my arms and legs. Thick, red, scaly patches everywhere. After 6 weeks with this filter, my plaques are thinner and less red. I'm cautiously optimistic for the first time in years.",
    "The hard water in Texas was making my psoriasis unbearable. Moved from Oregon and my skin went crazy. This filter reproduces the softer water I had before. My psoriasis is calming down significantly.",
    "My psoriasis wasn't responding to topical treatments. Dermatologist kept prescribing stronger creams. Turns out the shower was stripping my skin barrier every day. Clean water + my normal routine = 70% improvement.",
    "I track my psoriasis with photos. The before/after since installing this filter is dramatic. Less inflammation, thinner plaques, skin that actually heals between flares.",
    "Shower water was triggering my psoriasis inflammatory response. I could feel the difference immediately—no more tight, irritated skin after bathing. My body has space to heal now.",
    "My dermatologist asked what changed at my last appointment. My PASI score improved significantly. I told her about the filter. She's now recommending it to other patients.",
    "I was considering more aggressive treatments because nothing was working. This filter was my last try before escalating. Glad I tried it—my psoriasis is more controlled than it's been in a decade."
  ],
  'rosacea': [
    "Hot showers used to make my face look like a tomato for hours. The flushing was so embarrassing. With filtered water, I can take warm showers again and my face stays calm. The chlorine was my main trigger.",
    "My rosacea made me dread mornings. Every shower = red, burning face. Makeup couldn't cover it. After 3 weeks with this filter, my baseline redness has reduced significantly. I feel like myself again.",
    "I spent years avoiding photos because of my rosacea. My cheeks were constantly red and inflamed. This filter calmed my skin in ways that prescription creams never could. Addressing the cause, not the symptoms.",
    "My dermatologist prescribed metro gel, azelaic acid, nothing really worked. Then I learned chlorine can trigger rosacea flares and damage skin in seconds. This filter removes 99% of it. My flares went from daily to rare.",
    "I couldn't wear makeup because my skin was too reactive after showers. Now my skin is calm enough for foundation. It matches my skin tone for the first time in years because there's no underlying redness.",
    "The burning sensation after every shower was unbearable. I started taking cold showers to reduce flushing. With this filter, I can take normal temperature showers again. The chlorine was literally burning my sensitive skin.",
    "Rosacea made me avoid social events because my face would flush unpredictably. Since filtering my shower water, my triggers are more manageable. One less inflammatory assault on my skin each day.",
    "I've had rosacea since my 30s. Now 47, I've tried everything. This is the first thing that actually reduced my baseline redness. The visible veins on my cheeks are less prominent too.",
    "Hard water minerals were sitting on my skin and trapping heat. My face would stay red for hours after washing. Filtered water rinses clean—no residue, no prolonged flushing.",
    "My husband noticed the difference before I did. He said my face isn't as red after showers anymore. The constant inflammation was so normal to me I didn't realize how bad it was until it improved."
  ],
  'acne': [
    "I'm 38 and still dealing with acne like a teenager. Tried everything—Accutane, spironolactone, endless products. Turns out hard water minerals were clogging my pores. Filtered water + my regular routine = finally clear skin.",
    "My bacne was so bad I wouldn't wear tank tops. Within 2 weeks of using this filter, my back started clearing up. The mineral buildup was creating the perfect environment for breakouts.",
    "Hormonal acne on my chin and jawline plagued me for years. Birth control, diet changes, expensive facials. This filter helped more than any of those. The chlorine was disrupting my skin's natural balance.",
    "I was spending $400/month on professional treatments and medical-grade skincare. My aesthetician suggested I look at my water. This filter cost less than one facial and my skin is clearer than it's been in 15 years.",
    "Cystic acne at 42 made me feel hopeless. The painful nodules kept coming no matter what I did. Filtered water allowed my topical treatments to actually penetrate and work. Breakouts are 80% reduced.",
    "Hard water leaves a mineral film that mixes with sebum and clogs pores. I could feel the residue on my skin before. Now my face feels clean after washing—actually clean—and my acne is clearing.",
    "Chest and shoulder breakouts made me self-conscious. I'd layer up even in summer. This filter cleared my body acne in about 3 weeks. The chlorine was irritating my skin and causing inflammation.",
    "My expensive serums and treatments would sit on top of a mineral barrier and never absorb properly. With filtered water, everything works better. My skin can finally accept the products I've been using.",
    "Moved from a soft water area to Arizona. My clear skin became a breakout disaster within months. Hard water was the obvious culprit. This filter brought back my clear skin.",
    "Adult acne made me feel like I was doing something wrong. I ate clean, drank water, had a perfect routine. But I was showering in chlorine and hard water daily. Filtered water was the missing piece."
  ],
  'sensitive-skin': [
    "Every product I tried would burn my face. Dermatologist said I have extremely sensitive skin. Turns out my shower water was irritating my skin so badly that nothing could help. Filtered water calmed my baseline sensitivity.",
    "I wake up with my face on fire every day. Redness, burning, tightness—even with gentle products. This filter removed the irritants from my water and my skin can finally tolerate a normal routine.",
    "I've eliminated dairy, gluten, tried everything. Still had mystery flare-ups. My shower water was the hidden trigger. Chlorine bonds to skin cells within seconds and damages them. Filtered water stopped that damage.",
    "My skin was so reactive I could only use water and nothing else. Now that the water itself is clean, I can actually use moisturizers and sunscreen without burning. Game changer.",
    "Post-shower tightness and burning were my daily reality. I thought that was just normal. It's not. Clean water feels completely different—soft, gentle, non-irritating. My skin noticed immediately.",
    "Dermatitis on my face and neck would flare constantly. Multiple dermatologist visits, prescription creams, nothing worked long-term. This filter addressed the root cause. The inflammation is finally subsiding.",
    "Hard water has a pH of 7.2-7.8 which disrupts the skin's natural 4.5-5.5 balance. My sensitive skin couldn't handle that daily disruption. Filtered water is gentler and my barrier is finally intact.",
    "I used to rush through showers because my skin couldn't handle the water. Now I actually enjoy bathing. No burning, no tightness, no redness afterward.",
    "Every skincare product I bought was a gamble—would it burn or not? Turns out the products weren't the problem. My irritated, barrier-damaged skin from hard water was the issue. Fixed the water, fixed the sensitivity.",
    "I've spent thousands trying to figure out what my skin is sensitive to. Patch tests, allergy tests, elimination trials. The answer was my shower water. Simple once you know, frustrating that no doctor mentioned it."
  ],
  'installation': [
    "I'm not handy at all but installed this in 5 minutes. No tools, just hand-tighten. The included Teflon tape made it leak-proof. Immediately noticed softer water and my skin improved within a week.",
    "My husband installed this while I made coffee. That easy. We live in a hard water area and both of our skin conditions have improved. Best $118 we've spent on our health.",
    "Apartment renter here—no landlord permission needed since you just swap the shower head. Easy to remove when I move. My sensitive skin is so much happier.",
    "The chrome finish looks beautiful in my bathroom. But more importantly, the 15-stage filtration actually works. My rosacea has calmed down significantly in just 2 weeks.",
    "Quick installation, immediately felt the water difference. Softer, no chlorine smell, and my skin stopped burning after showers. Best home upgrade I've made.",
    "I was skeptical about a shower head helping my psoriasis. The installation was so easy I figured I'd try it. Month later, my plaques are thinner and less inflamed. Worth every penny.",
    "Universal G1/2 fit connected to my shower arm perfectly. Water pressure is actually better than my old shower head. And my eczema is improving—bonus!",
    "Takes 2-5 minutes to install. No plumber needed. The touch-to-clean nozzles make maintenance easy. Filter lasts 6-8 months. My sensitive skin thanks me daily.",
    "Installed this myself as someone who can barely change a lightbulb. Crystal clear instructions. Immediate improvement in water quality and my skin started healing within days.",
    "We have three bathrooms and I've ordered filters for all of them. Installation was so simple. My whole family has noticed improvements in their skin—eczema, acne, and general sensitivity all better."
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

const categories: Array<'eczema' | 'psoriasis' | 'rosacea' | 'acne' | 'sensitive-skin' | 'installation'> = [
  'eczema', 'psoriasis', 'rosacea', 'acne', 'sensitive-skin', 'installation'
];

// Force rebuild v3 - 500 reviews generating 50 pages with skin condition focus
function generateReviews(): Review[] {
  const reviews: Review[] = [];
  const REVIEW_COUNT = 500; // 500 reviews = 50 pages at 10 per page
  
  for (let i = 0; i < REVIEW_COUNT; i++) {
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
    
    // All 5-star reviews
    const rating: 5 = 5;
    
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
