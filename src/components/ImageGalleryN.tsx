// src/components/ImageGallery.tsx
'use client';

import { useState, useRef, useEffect, TouchEvent } from 'react';
import { TodoImage } from '@/components/TodoImage';

interface GalleryImage {
  id: string;
  path: string;
  alt: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  initialIndex?: number;
}

export default function ImageGallery({
  images,
  initialIndex = 0,
}: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const thumbnailsRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const hasMultipleImages = images.length > 1;

  // Scroll thumbnail vào giữa khi index thay đổi
  useEffect(() => {
    if (thumbnailsRef.current) {
      const active = thumbnailsRef.current.children[currentIndex] as HTMLElement;
      active?.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  }, [currentIndex]);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  // Xử lý swipe
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    const SWIPE_THRESHOLD = 60; // pixel để coi là swipe thật

    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) {
        // gạt sang trái → next
        goToNext();
      } else {
        // gạt sang phải → previous
        goToPrevious();
      }
    }

    // Reset
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  if (images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="w-full min-w-0 space-y-4">
      {/* Main image container – thêm touch events ở đây */}
      <div
        className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 shadow-sm select-none"
        onTouchStart={hasMultipleImages ? handleTouchStart : undefined}
        onTouchMove={hasMultipleImages ? handleTouchMove : undefined}
        onTouchEnd={hasMultipleImages ? handleTouchEnd : undefined}
      >
        {currentImage && (
          <TodoImage
            path={currentImage.path}
            alt={currentImage.alt}
            className="w-full h-full object-cover"
          />
        )}

        {/* Nút Previous */}
        {hasMultipleImages && (
          <button
type="button"
            onClick={goToPrevious}
            className="
              absolute left-3 top-1/2 -translate-y-1/2
              bg-black/50 hover:bg-black/70 text-white
              text-3xl sm:text-4xl w-10 h-10 sm:w-12 sm:h-12
              rounded-full flex items-center justify-center
              transition-all duration-200 z-10
              opacity-70 hover:opacity-100
            "
            aria-label="Ảnh trước"
          >
            ←
          </button>
        )}

        {/* Nút Next */}
        {hasMultipleImages && (
          <button
type="button"
            onClick={goToNext}
            className="
              absolute right-3 top-1/2 -translate-y-1/2
              bg-black/50 hover:bg-black/70 text-white
              text-3xl sm:text-4xl w-10 h-10 sm:w-12 sm:h-12
              rounded-full flex items-center justify-center
              transition-all duration-200 z-10
              opacity-70 hover:opacity-100
            "
            aria-label="Ảnh tiếp theo"
          >
            →
          </button>
        )}

        {/* Counter (tùy chọn) */}
        {hasMultipleImages && (
          <div className="
            absolute bottom-3 left-1/2 -translate-x-1/2
            bg-black/60 text-white text-sm px-3 py-1 rounded-full
            pointer-events-none z-10
          ">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {hasMultipleImages && (
        <div className="w-full mx-auto overflow-hidden">
          <div
            ref={thumbnailsRef}
            className="
              flex flex-nowrap gap-2
              overflow-x-auto pb-4 pt-1 px-2
              snap-x mandatory
              scrollbar-thin scrollbar-thumb-gray-300
              min-w-0
            "
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {images.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setCurrentIndex(idx)}
                className={`
                  flex-shrink-0 w-20 h-20
                  rounded-md overflow-hidden
                  border-2 transition-all duration-200
                  ${idx === currentIndex
                    ? 'border-blue-600 scale-105 shadow-md'
                    : 'border-transparent hover:border-gray-400'
                  }
                `}
              >
                <TodoImage
                  path={img.path}
                  alt={img.alt || 'Thumbnail'}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}