import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "product" | "article";
  product?: {
    name: string;
    price: string;
    currency: string;
    image: string;
    description: string;
  };
  article?: {
    publishedTime: string;
    author: string;
  };
}

const DEFAULT_TITLE = "VERITÉ SCALP | Scalp Care Before Hair Care";
const DEFAULT_DESCRIPTION = "Stop scalp inflammation and unlock natural hair growth. Dermatologist recommended scalp soothing mist with visible results in 4-8 weeks. Free worldwide shipping.";
const DEFAULT_IMAGE = "https://storage.googleapis.com/gpt-engineer-file-uploads/kI1BYPbCXAcws49ynyKOS0HZgWo1/social-images/social-1765573736226-Gemini_Generated_Image_tmt54mtmt54mtmt5.png";
const SITE_URL = "https://veritescalp.com";

export const SEOHead = ({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url = SITE_URL,
  type = "website",
  product,
  article,
}: SEOHeadProps) => {
  const fullTitle = title ? `${title} | VERITÉ SCALP` : DEFAULT_TITLE;
  
  // JSON-LD structured data
  const getStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "VERITÉ SCALP",
      url: SITE_URL,
      logo: "https://storage.googleapis.com/gpt-engineer-file-uploads/kI1BYPbCXAcws49ynyKOS0HZgWo1/uploads/1765955531769-e_ba-removebg-preview.png",
      description: DEFAULT_DESCRIPTION,
      sameAs: [],
    };

    if (product) {
      return {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.name,
        description: product.description,
        image: product.image,
        brand: {
          "@type": "Brand",
          name: "VERITÉ SCALP",
        },
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: product.currency,
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Organization",
            name: "VERITÉ SCALP",
          },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "127",
        },
      };
    }

    if (article) {
      return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description: description,
        image: image,
        datePublished: article.publishedTime,
        author: {
          "@type": "Person",
          name: article.author,
        },
        publisher: {
          "@type": "Organization",
          name: "VERITÉ SCALP",
          logo: {
            "@type": "ImageObject",
            url: "https://storage.googleapis.com/gpt-engineer-file-uploads/kI1BYPbCXAcws49ynyKOS0HZgWo1/uploads/1765955531769-e_ba-removebg-preview.png",
          },
        },
      };
    }

    return baseData;
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="VERITÉ SCALP" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(getStructuredData())}
      </script>
    </Helmet>
  );
};
