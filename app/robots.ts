import { MetadataRoute } from 'next'

/**
 * Robots.txt configuration for SEO
 * Allows all bots and references sitemap
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://fareezart.vercel.app/sitemap.xml',
  }
}

