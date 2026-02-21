'use client';

import { useState, useRef, useEffect } from 'react';
import { TodoImage } from '@/components/TodoImage';

interface GalleryImage {
  id: string;
  path: string;
  alt: string;
}

export default function ImageGallery({
  images,
  initialIndex = 0,
}: {
  images: GalleryImage[];
  initialIndex?: number;
}) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const sliderRef = useRef<HTMLDivElement>(null);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  const startX = useRef(0);
  const currentTranslate = useRef(0);
  const prevTranslate = useRef(0);
  const isDragging = useRef(false);
  const animationRef = useRef<number | null>(null);

  const imageCount = images.length;

  // =========================
  // Helpers
  // =========================

  const getWidth = () => sliderRef.current?.offsetWidth || 0;

  const setPosition = () => {
    if (!sliderRef.current) return;
    sliderRef.current.style.transform = `translateX(${currentTranslate.current}px)`;
  };

  const animate = () => {
    setPosition();
    if (isDragging.current) {
      animationRef.current = requestAnimationFrame(animate);
    }
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  const goToNext = () => {
    if (currentIndex < imageCount - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // =========================
  // Pointer Events
  // =========================

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch' && e.isPrimary === false) return;

    startX.current = e.clientX;
    isDragging.current = true;

    sliderRef.current?.setPointerCapture(e.pointerId);
    animationRef.current = requestAnimationFrame(animate);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;

    const deltaX = e.clientX - startX.current;
    currentTranslate.current = prevTranslate.current + deltaX;
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;

    isDragging.current = false;
    if (animationRef.current) cancelAnimationFrame(animationRef.current);

    const movedBy = currentTranslate.current - prevTranslate.current;
    const width = getWidth();

    if (movedBy < -width * 0.2 && currentIndex < imageCount - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else if (movedBy > width * 0.2 && currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      // snap back
      currentTranslate.current = -currentIndex * width;
      prevTranslate.current = currentTranslate.current;
      setPosition();
    }
  };

  // =========================
  // Snap when index changes
  // =========================

  useEffect(() => {
    const width = getWidth();
    currentTranslate.current = -currentIndex * width;
    prevTranslate.current = currentTranslate.current;
    setPosition();

    // scroll thumbnail into center
    if (thumbnailsRef.current) {
      const active =
        thumbnailsRef.current.children[currentIndex] as HTMLElement;
      active?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
      });
    }
  }, [currentIndex]);

  if (imageCount === 0) return null;

  return (
    <div className="w-full space-y-4">

      {/* MAIN SLIDER */}
      <div className="overflow-hidden relative aspect-[4/3] rounded-lg bg-gray-100 shadow-sm">

        <div
          ref={sliderRef}
          className="flex transition-transform duration-300 ease-out"
          style={{ width: `${imageCount * 100}%` }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {images.map((img) => (
            <div key={img.id} className="w-full flex-shrink-0">
              <TodoImage
                path={img.path}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        {imageCount > 1 && (
          <>
            <button
              type="button"
              onClick={goToPrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full z-20"
            >
              ←
            </button>

            <button
              type="button"
              onClick={goToNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full z-20"
            >
              →
            </button>
          </>
        )}
      </div>

      {/* THUMBNAILS */}
      {imageCount > 1 && (
        <div
          ref={thumbnailsRef}
          className="flex gap-2 overflow-x-auto px-2 pb-2"
        >
          {images.map((img, idx) => (
            <button
              key={img.id}
              type="button"
              onClick={() => goToIndex(idx)}
              className={`w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 ${
                idx === currentIndex
                  ? 'border-blue-600 scale-105'
                  : 'border-transparent'
              }`}
            >
              <TodoImage
                path={img.path}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}