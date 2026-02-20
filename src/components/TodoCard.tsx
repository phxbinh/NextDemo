// Ví dụ: components/TodoCard.tsx hoặc ProductCard.tsx
'use client';

import { useRouter } from 'next/navigation';
import TodoImage from '@/components/TodoImage'; // component hiển thị ảnh của bạn

interface Todo {
  id: string;
  slug?: string;       // nếu dùng slug cho URL đẹp
  images: { image_path: string; alt?: string }[];
  // các field khác...
}

export default function TodoCard({ todo }: { todo: Todo }) {
  const router = useRouter();

  const handleImageClick = (index: number) => {
    // Chuyển đến trang chi tiết + truyền index ảnh qua query
    const url = todo.slug 
      ? `/todos/${todo.slug}?img=${index}`
      : `/todos/${todo.id}?img=${index}`;
    
    router.push(url);
  };

  const displayedImages = todo.images.slice(0, 6);

  return (
    <div className="cursor-pointer" onClick={() => router.push(todo.slug ? `/todos/${todo.slug}` : `/todos/${todo.id}`)}>
      {/* ... phần header, title, etc của card */}

      <div className="grid grid-cols-3 auto-rows-[1fr] gap-1 rounded-lg overflow-hidden">
        {displayedImages.map((img, i) => (
          <div
            key={img.image_path}
            className={`relative aspect-square overflow-hidden ${
              i === 0 ? 'col-span-2 row-span-2' : ''
            }`}
            onClick={(e) => {
              e.stopPropagation(); // Ngăn click card chuyển trang, chỉ mở gallery
              handleImageClick(i);
            }}
          >
            <TodoImage
              path={img.image_path}
              alt={img.alt || `Ảnh ${i + 1}`}
              className="block w-full h-full object-cover transition-transform hover:scale-105"
            />

            {i === 5 && todo.images.length > 6 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xl font-semibold">
                +{todo.images.length - 6}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ... phần footer của card */}
    </div>
  );
}