// src/components/TodoItem.tsx
'use client';

import { useRouter } from 'next/navigation';
import {TodoImage} from '@/components/TodoImage';
import TodoImageUploader from '@/components/TodoImageUploader'; // giữ nguyên nếu có

import { TodoWithImages } from '@/lib/todos';

interface TodoItemProps {
  todo: TodoWithImages;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const router = useRouter();

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    e.stopPropagation(); // Ngăn click lan ra toàn card
    router.push(`/todoImageGrok/${todo.id}?img=${index}`);
  };

  const handleCardClick = () => {
    router.push(`/todoImageGrok/${todo.id}`);
  };

  const displayedImages = todo.images.slice(0, 6);
  const hasMore = todo.images.length > 6;

  return (
    <div
      className="border border-gray-200 rounded-lg p-4 space-y-4 cursor-pointer hover:shadow-md transition-shadow duration-200 bg-white"
      onClick={handleCardClick}
    >
      <h2 className="text-lg font-semibold">{todo.title}</h2>

      {todo.content && (
        <p className="text-sm text-gray-600 line-clamp-3">{todo.content}</p>
      )}

      {displayedImages.length > 0 ? (
        <div className="grid grid-cols-3 auto-rows-[1fr] gap-1 rounded-lg overflow-hidden">
          {displayedImages.map((img, i) => (
            <div
              key={img.image_path}
              className={`relative aspect-square overflow-hidden cursor-pointer group ${
                i === 0 ? 'col-span-2 row-span-2' : ''
              }`}
              onClick={(e) => handleImageClick(e, i)}
            >
              <TodoImage
                path={img.image_path}
                className="block w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                alt={`Ảnh ${i + 1} của ${todo.title}`}
              />

              {i === 5 && hasMore && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xl font-semibold">
                  +{todo.images.length - 6}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500 text-sm">
          Chưa có ảnh nào
        </div>
      )}

      {/* Giữ phần upload ảnh */}
      <TodoImageUploader todoId={todo.id} />
    </div>
  );
}