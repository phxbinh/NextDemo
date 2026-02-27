// src/components/ImageGallery.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
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
useEffect(() => {
  setCurrentIndex(initialIndex);
}, [initialIndex]);
useEffect(() => {
  console.log("initialIndex:", initialIndex);
  console.log("currentIndex:", currentIndex);
}, [initialIndex, currentIndex]);


  const thumbnailsRef = useRef<HTMLDivElement>(null);

  const hasMultipleImages = images.length > 1;

  // =========================
  // Navigation logic
  // =========================
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

  // =========================
  // Center active thumbnail
  // =========================
/*
  useEffect(() => {
    if (!thumbnailsRef.current) return;

    const active = thumbnailsRef.current.children[currentIndex] as HTMLElement;
    active?.scrollIntoView({ behavior: 'smooth', inline: 'center' });
  }, [currentIndex]);
*/
useEffect(() => {
  if (!thumbnailsRef.current) return;

  const container = thumbnailsRef.current;
  const active = container.children[currentIndex] as HTMLElement;

  if (!active) return;

  const containerRect = container.getBoundingClientRect();
  const activeRect = active.getBoundingClientRect();

  const offset =
    activeRect.left -
    containerRect.left -
    containerRect.width / 2 +
    activeRect.width / 2;

  container.scrollBy({
    left: offset,
    behavior: 'smooth',
  });
}, [currentIndex]);

  // =========================
  // Swipe logic (image only)
  // =========================
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;

    const endX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - endX;

    const SWIPE_THRESHOLD = 60;

    if (Math.abs(diff) > SWIPE_THRESHOLD) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }

    touchStartX.current = null;
  };

  if (images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="w-full min-w-0 space-y-4">
      
      {/* IMAGE WRAPPER */}
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 shadow-sm">

        {/* Swipe layer chỉ nằm trên image */}
        <div
          className="absolute inset-0 select-none"
          onTouchStart={hasMultipleImages ? handleTouchStart : undefined}
          onTouchEnd={hasMultipleImages ? handleTouchEnd : undefined}
        >
          <TodoImage
            path={currentImage.path}
            alt={currentImage.alt}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Previous Button */}
        {hasMultipleImages && (
          <button
            type="button"
            onClick={goToPrevious}
            className="
              absolute left-3 top-1/2 -translate-y-1/2
              bg-black/50 hover:bg-black/70 text-white
              text-3xl sm:text-4xl w-10 h-10 sm:w-12 sm:h-12
              rounded-full flex items-center justify-center
              transition-all duration-200 z-20
              opacity-70 hover:opacity-100
            "
            aria-label="Ảnh trước"
          >
            ←
          </button>
        )}

        {/* Next Button */}
        {hasMultipleImages && (
          <button
            type="button"
            onClick={goToNext}
            className="
              absolute right-3 top-1/2 -translate-y-1/2
              bg-black/50 hover:bg-black/70 text-white
              text-3xl sm:text-4xl w-10 h-10 sm:w-12 sm:h-12
              rounded-full flex items-center justify-center
              transition-all duration-200 z-20
              opacity-70 hover:opacity-100
            "
            aria-label="Ảnh tiếp theo"
          >
            →
          </button>
        )}

        {/* Counter */}
        {hasMultipleImages && (
          <div className="
            absolute bottom-3 left-1/2 -translate-x-1/2
            bg-black/60 text-white text-sm px-3 py-1 rounded-full
            pointer-events-none z-20
          ">
            {currentIndex + 1} / {images.length}
          </div>
        )}
      </div>

      {/* THUMBNAILS */}
      {hasMultipleImages && (
        <div className="w-full mx-auto overflow-hidden">
          <div
            ref={thumbnailsRef}
            className="
              flex gap-2 overflow-x-auto pb-4 pt-1 px-2
              scrollbar-thin scrollbar-thumb-gray-300
            "
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {images.map((img, idx) => (
              <button
                key={img.id}
                type="button"
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





