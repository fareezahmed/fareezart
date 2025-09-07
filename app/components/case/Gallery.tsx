'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

/**
 * Case Study Gallery component
 * Features:
 * - Responsive grid layout
 * - Image lightbox/modal functionality
 * - Video support with lazy loading
 * - Lottie animation support
 * - Accessibility with keyboard navigation
 */
interface GalleryItem {
  id: string;
  type: 'image' | 'video' | 'lottie';
  src: string;
  alt: string;
  caption?: string;
  thumbnail?: string;
}

interface GalleryProps {
  items: GalleryItem[];
  title?: string;
  className?: string;
}

export default function Gallery({
  items,
  title = "Project Gallery",
  className = ''
}: GalleryProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;

      if (e.key === 'Escape') {
        setIsModalOpen(false);
        setSelectedItem(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const openModal = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <section 
        className={`py-16 lg:py-20 ${className}`}
        aria-labelledby="gallery-heading"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 
            id="gallery-heading"
            className="text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center"
          >
            {title}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="group cursor-pointer"
                onClick={() => openModal(item)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openModal(item);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View ${item.alt} in full size`}
              >
                <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 group-hover:shadow-lg transition-shadow duration-200">
                  {item.type === 'image' && (
                    <Image
                      src={item.thumbnail || item.src}
                      alt={item.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />
                  )}

                  {item.type === 'video' && (
                    <div className="relative w-full h-full">
                      <Image
                        src={item.thumbnail || item.src}
                        alt={item.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-colors duration-200">
                          <svg className="w-6 h-6 text-gray-900 ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}

                  {item.type === 'lottie' && (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">Animation</span>
                    </div>
                  )}

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                </div>

                {item.caption && (
                  <p className="text-sm text-gray-600 mt-2 text-center">
                    {item.caption}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="relative max-w-4xl max-h-full w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
              aria-label="Close modal"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="bg-white rounded-lg overflow-hidden">
              {selectedItem.type === 'image' && (
                <div className="relative aspect-[4/3] lg:aspect-[16/9]">
                  <Image
                    src={selectedItem.src}
                    alt={selectedItem.alt}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 80vw"
                    priority
                  />
                </div>
              )}

              {selectedItem.type === 'video' && (
                <div className="relative aspect-[16/9]">
                  <video
                    src={selectedItem.src}
                    controls
                    autoPlay
                    className="w-full h-full object-contain"
                    aria-label={selectedItem.alt}
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}

              {selectedItem.type === 'lottie' && (
                <div className="relative aspect-[4/3] lg:aspect-[16/9] bg-gray-100 flex items-center justify-center">
                  <div className="w-full h-full" data-lottie-src={selectedItem.src}>
                    <span className="text-gray-500">Loading animation...</span>
                  </div>
                </div>
              )}

              {selectedItem.caption && (
                <div className="p-4">
                  <p className="text-gray-700">{selectedItem.caption}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
