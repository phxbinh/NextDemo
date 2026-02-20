// src/components/ImageGallery.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import {TodoImage} from '@/components/TodoImage';

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

/*
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
*/

  if (images.length === 0) return null;

  return (
    <div className="w-full min-w-0 space-y-4">
      {/* Main image */}
      <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-100 shadow-sm">
        {currentImage && (
          <TodoImage
            path={currentImage.path}
            alt={currentImage.alt}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="w-full max-w-[400px] mx-auto overflow-hidden">
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
                  border-2
                  transition-colors duration-200
                  ${idx === currentIndex 
                    ? 'border-blue-600'
                    : 'border-transparent'
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