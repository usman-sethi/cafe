import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: string;
  image?: string;
  structuredData?: Record<string, any>;
}

export function SEO({ 
  title, 
  description, 
  canonical, 
  type = "website", 
  image = "/images/img_38464f4b.jpg",
  structuredData 
}: SEOProps) {
  const siteName = "Luna Café";
  const fullTitle = `${title} | ${siteName}`;
  const url = canonical || (typeof window !== 'undefined' ? window.location.href : '');

  // Default AEO/LocalBusiness structured data
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "CafeOrCoffeeShop",
    "name": siteName,
    "image": image,
    "url": url,
    "telephone": "+1-555-0199",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Artisan Way",
      "addressLocality": "Portland",
      "addressRegion": "OR",
      "postalCode": "97204",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 45.523064,
      "longitude": -122.676483
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "07:00",
      "closes": "19:00"
    },
    "priceRange": "$$"
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* GEO Meta Tags */}
      <meta name="geo.region" content="US-OR" />
      <meta name="geo.placename" content="Portland" />
      <meta name="geo.position" content="45.523064;-122.676483" />
      <meta name="ICBM" content="45.523064, -122.676483" />

      {/* AEO (Answer Engine Optimization) - JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
    </Helmet>
  );
}
