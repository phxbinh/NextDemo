// src/app/(app)/todoImageGrok/[id]/page.tsx
import { notFound } from 'next/navigation';
import { sql } from '@/lib/neon/sql';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import {TodoImage} from '@/components/TodoImage';
import ImageGallery from '@/components/ImageGallery'; // component gallery bạn đã có hoặc mình sẽ định nghĩa bên dưới

// Type (tái sử dụng)
type TodoWithImages = {
  id: string;
  title: string;
  content: string | null;
  created_at: string;
  images: { image_path: string }[];
};

// Fetch todo theo id + kiểm tra quyền user
async function getTodoById(id: string): Promise<TodoWithImages | null> {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const rows = await sql`
    SELECT
      t.id,
      t.title,
      t.content,
      t.created_at,
      COALESCE(
        JSON_AGG(
          JSON_BUILD_OBJECT('image_path', i.image_path)
        ) FILTER (WHERE i.id IS NOT NULL),
        '[]'
      ) AS images
    FROM todosimages t
    LEFT JOIN todo_images i ON i.todo_id = t.id
    WHERE t.id = ${id}
      AND t.user_id = ${user.id}
    GROUP BY t.id
  `;

  return rows[0] as TodoWithImages | undefined ?? null;
}

export default async function TodoDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Await params và searchParams trước khi dùng
  const { id } = await params;
  const resolvedSearchParams = await searchParams;

  const todo = await getTodoById(id);

  if (!todo) {
    notFound();
  }

  // Bây giờ mới truy cập img an toàn
  const initialIndex = resolvedSearchParams?.img
    ? Math.min(
        Math.max(Number(resolvedSearchParams.img), 0),
        todo.images.length - 1
      )
    : 0;

  // Chuẩn bị data cho gallery: chỉ truyền path (TodoImage sẽ tự resolve public URL)
  const galleryImages = todo.images.map((img, idx) => ({
    id: idx.toString(),
    path: img.image_path,
    alt: `Ảnh ${idx + 1} của todo "${todo.title}"`,
  }));


  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{todo.title}</h1>

      {todo.content && (
        <p className="text-gray-700 mb-8 whitespace-pre-wrap">{todo.content}</p>
      )}

      <div className="text-sm text-gray-500 mb-6">
        Tạo lúc: {new Date(todo.created_at).toLocaleString('vi-VN')}
      </div>

      {/* Gallery ảnh */}
      {galleryImages.length > 0 ? (
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Ảnh đính kèm</h2>
          <ImageGallery images={galleryImages} initialIndex={initialIndex} />
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          Todo này chưa có ảnh nào
        </div>
      )}

      {/* Có thể thêm nút quay lại, edit, delete, v.v. */}
      <div className="flex gap-4 mt-8">
        <a
          href="/todoWithImage"
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          Quay lại danh sách
        </a>
        {/* Thêm button edit/delete nếu cần */}
      </div>
    </div>
  );
}