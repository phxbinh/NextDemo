// src/components/ImageGallery.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import TodoImage from '@/components/TodoImage';

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

  const currentImage = images[currentIndex];

  useEffect(() => {
    if (thumbnailsRef.current) {
      const active = thumbnailsRef.current.children[currentIndex] as HTMLElement;
      active?.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  }, [currentIndex]);

  if (images.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="aspect-[4/3] relative rounded-lg overflow-hidden bg-gray-50 shadow">
        {currentImage && (
          <TodoImage
            path={currentImage.path}
            className="w-full h-full object-contain"
          />
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="relative">
          <div
            ref={thumbnailsRef}
            className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-thin"
          >
            {images.map((img, idx) => (
              <button
                key={img.id}
                onClick={() => setCurrentIndex(idx)}
                className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all snap-center ${
                  idx === currentIndex
                    ? 'border-blue-500 scale-105'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <TodoImage
                  path={img.path}
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