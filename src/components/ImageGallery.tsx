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

/*
  useEffect(() => {
    if (thumbnailsRef.current) {
      const active = thumbnailsRef.current.children[currentIndex] as HTMLElement;
      active?.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
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










  if (images.length === 0) return null;

  return (
    <div className="w-full space-y-4">
      {/* Main image */} {/*
      <div className="aspect-[4/3] relative rounded-lg overflow-hidden bg-gray-100 shadow-sm">
        {currentImage && (
          <TodoImage
            path={currentImage.path}
            alt={currentImage.alt}
            className="absolute inset-0 object-cover"
          />
        )}
      </div>
*/}


{/* Main image */}
<div className="relative aspect-[4/3] relative rounded-lg overflow-hidden bg-gray-100 shadow-sm">
  {currentImage && (
    <TodoImage
      path={currentImage.path}
      alt={currentImage.alt}
      className="w-full h-full object-cover"
    />
  )}
</div>








      {/* Thumbnails */} {/*
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
                  alt={img.path}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )} */}

{/* Thumbnails */} {/*
{images.length > 1 && (
  <div className="relative w-full">
    <div
      ref={thumbnailsRef}
      className="flex gap-2 overflow-x-auto pb-4 px-2 snap-x snap-mandatory scrollbar-thin scrollbar-gutter-stable"
    >
      {images.map((img, idx) => (
        <button
          key={img.id}
          onClick={() => setCurrentIndex(idx)}
          className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all duration-200 snap-center ${
            idx === currentIndex
              ? 'border-blue-600 scale-105 shadow-sm'
              : 'border-gray-200 opacity-80 hover:opacity-100 hover:border-gray-300'
          }`}
        >
          <TodoImage
            path={img.path}
            alt={img.alt}
            className="absolute inset-0 w-full h-full object-cover" 
          />
        </button>
      ))}
    </div>
  </div>
)} */}


{/* Thumbnails */}{/*
{images.length > 1 && (
  <div className="w-full">  
    <div
      ref={thumbnailsRef}
      className="
        flex gap-3 overflow-x-auto pb-4 pt-1 -mx-1 px-1   
        snap-x snap-mandatory
        scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100
        scrollbar-thumb-rounded-full hover:scrollbar-thumb-gray-500
      "
    >
      {images.map((img, idx) => (
        <button
          key={img.id}
          onClick={() => setCurrentIndex(idx)}
          className={`
            flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 
            transition-all duration-200 snap-center
            ${idx === currentIndex 
              ? 'border-blue-600 scale-110 shadow-md' 
              : 'border-gray-200 opacity-80 hover:opacity-100 hover:border-gray-400 hover:scale-105'
            }
          `}
        >
          <TodoImage
            path={img.path}
            alt={img.alt || 'Thumbnail'}
            className="w-full h-full object-cover"  // giữ nguyên, nhưng đảm bảo div cha có overflow-hidden
          />
        </button>
      ))}
    </div>
  </div>
)}*/}
{/* Thumbnails */} {/*
{images.length > 1 && (
  <div className="w-full overflow-hidden">
    <div
      ref={thumbnailsRef}
      className="
        flex gap-3 overflow-x-auto pb-4 pt-1
        snap-x snap-mandatory
        min-w-0
      "
    >
      {images.map((img, idx) => (
        <button
          key={img.id}
          onClick={() => setCurrentIndex(idx)}
          className={`
            flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 
            transition-all duration-200 snap-center
            ${idx === currentIndex 
              ? 'border-blue-600 shadow-md' 
              : 'border-gray-200 opacity-80 hover:opacity-100 hover:border-gray-400 hover:scale-105'
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
)}*/}


{/* Thumbnails */} {/*
{images.length > 1 && (
  <div className="w-full overflow-hidden">
    <div
      ref={thumbnailsRef}
      className="
        flex gap-3
        overflow-x-auto
        whitespace-nowrap
        pb-4 pt-1
      "
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {images.map((img, idx) => (
        <button
          key={img.id}
          onClick={() => setCurrentIndex(idx)}
          className={`
            inline-block flex-none w-20 h-20
            rounded-md overflow-hidden border-2
            transition-all duration-200
            ${idx === currentIndex 
              ? 'border-blue-600 shadow-md'
              : 'border-gray-200'
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
)}*/}


{/*
{images.length > 1 && (
  <div className="w-full overflow-hidden min-w-0">
    <div
      ref={thumbnailsRef}
      className="
        flex flex-nowrap gap-3
        overflow-x-auto
        pb-4 pt-1
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
            rounded-md overflow-hidden border-2
            transition-all duration-200
            ${idx === currentIndex 
              ? 'border-blue-600 shadow-md'
              : 'border-gray-200'
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
*/}

{images.length > 1 && (
  <div className="w-[410px] overflow-hidden min-w-0">
    <div
      ref={thumbnailsRef}
      className="
        flex flex-nowrap gap-3
        overflow-x-auto
        pb-4 pt-1 pr-2
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