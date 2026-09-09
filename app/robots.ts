import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rmnlove.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'], // बॉट्स को इंटरनल API क्रॉल करने से रोकता है
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}