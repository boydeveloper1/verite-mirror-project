// Review images - URLs for hair transformation and product received photos
// These are placeholder URLs - in production, replace with actual customer photo URLs

export const hairTransformationImages = [
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1595959183082-7b570b7e1dfa?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1560869713-bf0e94e5d7f4?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1522337094846-8a818192de1f?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop",
];

export const productReceivedImages = [
  "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1583209814683-c023dd293cc6?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
];

// Function to get a random image for a review
export const getReviewImage = (index: number, total: number): string | undefined => {
  // Only first ~100 reviews have images (about 58% of 172)
  if (index >= 100) return undefined;
  
  // Alternate between hair transformation and product received images
  const isHairImage = index % 3 !== 2; // 2 out of 3 are hair images
  const images = isHairImage ? hairTransformationImages : productReceivedImages;
  const imageIndex = index % images.length;
  
  return images[imageIndex];
};
