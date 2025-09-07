import { Metadata } from 'next';
import Bio from '../components/about/Bio';
import ToolsGrid from '../components/about/ToolsGrid';
import HowIWork from '../components/about/HowIWork';

/**
 * About Page
 * Features:
 * - Clean, minimalist design inspired by Martin Ollivere
 * - Three main sections: Bio, Tools, and Work Process
 * - Framer Motion animations with reduced motion support
 * - Lazy-loaded images and optimized performance
 * - Accessibility-first approach
 */

export const metadata: Metadata = {
  title: 'About - FareezArt',
  description: 'Learn about Fareez, a frontend developer and designer with 5+ years of experience creating digital experiences that are both functional and delightful.',
  keywords: [
    'about',
    'frontend developer',
    'designer',
    'portfolio',
    'experience',
    'skills',
    'tools',
    'process'
  ],
  openGraph: {
    title: 'About Fareez - Frontend Developer & Designer',
    description: 'Learn about my journey, tools, and approach to creating exceptional digital experiences.',
    type: 'profile',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'Fareez - Frontend Developer and Designer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Fareez - Frontend Developer & Designer',
    description: 'Learn about my journey, tools, and approach to creating exceptional digital experiences.',
    images: ['/og-image.svg'],
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Bio Section */}
      <Bio />

      {/* Tools Grid Section */}
      <ToolsGrid />

      {/* How I Work Section */}
      <HowIWork />
    </main>
  );
}

