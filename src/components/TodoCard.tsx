// components/TodoCard.tsx
'use client';

import { useRouter } from 'next/navigation';
import { TodoImage } from '@/components/TodoImage';

interface ImageItem {
  image_path: string;
  alt?: string;
}

interface Todo {
  id: string;
  slug?: string;           // optional, nếu có slug thì dùng cho URL đẹp hơn
  images: ImageItem[];
  // các field khác như title, description... nếu cần hiển thị
}

interface TodoCardProps {
  todo: Todo;
}

export default function TodoCard({ todo }: TodoCardProps) {
  const router = useRouter();

  // Click vào ảnh cụ thể → chuyển trang chi tiết + focus đúng ảnh qua query ?img=
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    e.stopPropagation(); // ngăn lan ra toàn card

    const basePath = todo.slug ? `/todos/${todo.slug}` : `/todos/${todo.id}`;
    router.push(`${basePath}?img=${index}`);
  };

  // Click vào phần còn lại của card → chuyển trang chi tiết bình thường (không focus ảnh)
  const handleCardClick = () => {
    const url = todo.slug ? `/todos/${todo.slug}` : `/todos/${todo.id}`;
    router.push(url);
  };

  const displayedImages = todo.images.slice(0, 6);
  const hasMore = todo.images.length > 6;

  // Trường hợp không có ảnh
  if (displayedImages.length === 0) {
    return (
      <div
        className="cursor-pointer rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-gray-50 h-48 flex items-center justify-center text-gray-500 text-sm"
        onClick={handleCardClick}
      >
        Chưa có ảnh
      </div>
    );
  }

  return (
    <div
      className="cursor-pointer rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 bg-white"
      onClick={handleCardClick}
    >
      {/* Nếu có title hoặc mô tả, thêm ở đây */}
      {/* <div className="p-3 border-b">
        <h3 className="font-medium line-clamp-1">{todo.title || 'Todo không tên'}</h3>
      </div> */}

      <div className="grid grid-cols-3 auto-rows-fr gap-1">
        {displayedImages.map((img, index) => (
          <div
            key={img.image_path}
            className={`relative overflow-hidden aspect-square cursor-pointer group ${
              index === 0 ? 'col-span-2 row-span-2' : ''
            }`}
            onClick={(e) => handleImageClick(e, index)}
          >
            <TodoImage
              path={img.image_path}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              // alt nên có để accessibility tốt hơn
              alt={img.alt || `Ảnh ${index + 1}`}
            />

            {index === 5 && hasMore && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-lg font-bold">
                +{todo.images.length - 6}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer nếu cần: ngày tạo, số like, comment... */}
      {/* <div className="p-3 text-xs text-gray-500 flex justify-between">
        <span>{new Date(todo.created_at).toLocaleDateString('vi-VN')}</span>
      </div> */}
    </div>
  );
}