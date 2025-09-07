import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

/**
 * Sanity CMS Configuration
 * Features:
 * - Client for data fetching
 * - Image URL builder for optimized images
 * - Preview mode support
 * - TypeScript integration
 */

// Sanity configuration
export const sanityConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN, // For preview mode
};

// Create Sanity client
export const sanityClient = createClient(sanityConfig);

// Create preview client (with token for draft content)
export const sanityPreviewClient = createClient({
  ...sanityConfig,
  useCdn: false, // Always fetch fresh data in preview mode
  token: process.env.SANITY_API_TOKEN,
});

// Image URL builder
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Helper function to get client based on preview mode
export function getClient(preview = false) {
  return preview ? sanityPreviewClient : sanityClient;
}

// Image optimization helper
export function getOptimizedImageUrl(
  source: SanityImageSource,
  width: number,
  height?: number,
  options: {
    quality?: number;
    format?: 'webp' | 'jpg' | 'png';
    fit?: 'crop' | 'fill' | 'fillmax' | 'max' | 'scale' | 'min';
  } = {}
) {
  const { quality = 80, format = 'webp', fit = 'crop' } = options;
  
  return urlFor(source)
    .width(width)
    .height(height || width)
    .quality(quality)
    .format(format)
    .fit(fit)
    .url();
}

// Revalidation helper
export function revalidateTag(tag: string) {
  // This would be called when content is published
  // Implementation depends on your deployment platform
  console.log(`Revalidating tag: ${tag}`);
}
