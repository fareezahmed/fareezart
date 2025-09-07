import { NextRequest, NextResponse } from 'next/server';
import { sanityClient } from '@/lib/sanity';

/**
 * Preview Mode API Route
 * Enables/disables Sanity preview mode for draft content
 */

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  const slug = searchParams.get('slug');

  // Verify the secret token
  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  // Verify the slug exists
  if (slug) {
    const project = await sanityClient.fetch(
      `*[_type == "project" && slug.current == $slug][0]`,
      { slug }
    );

    if (!project) {
      return NextResponse.json({ message: 'Invalid slug' }, { status: 401 });
    }
  }

  // Enable preview mode
  const response = NextResponse.redirect(
    new URL(slug ? `/projects/${slug}` : '/projects', request.url)
  );

  // Set preview mode cookie
  response.cookies.set('__prerender_bypass', 'true', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    maxAge: 60 * 60, // 1 hour
  });

  return response;
}

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');

  // Verify the secret token
  if (secret !== process.env.SANITY_PREVIEW_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }

  // Disable preview mode
  const response = NextResponse.json({ message: 'Preview mode disabled' });

  // Clear preview mode cookie
  response.cookies.delete('__prerender_bypass');

  return response;
}
