'use server';  // Bắt buộc cho Server Actions

import { revalidatePath } from 'next/cache';
import { addTodo, deleteTodo, toggleTodo } from '../server/db';  // Import từ file db.js của bạn

// Action để thêm todo mới
export async function createTodo(formData) {
  const title = formData.get('title')?.toString().trim();

  if (!title) {
    return { error: 'Vui lòng nhập nội dung todo!' };
  }

  try {
    await addTodo({ title });  // Gọi hàm db
    revalidatePath('/');  // Refresh trang chủ để hiển thị todo mới
    return { success: true };
  } catch (error) {
    console.error('Lỗi khi thêm todo:', error);
    return { error: 'Có lỗi xảy ra khi thêm todo.' };
  }
}

// Action để toggle completed (check/uncheck)
export async function toggleTodoAction(formData) {
  const id = formData.get('id');

  if (!id) {
    return { error: 'ID không hợp lệ' };
  }

  try {
    await toggleTodo({ id: Number(id) });  // Ép Number vì FormData gửi string
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Lỗi toggle todo:', error);
    return { error: 'Có lỗi khi cập nhật trạng thái.' };
  }
}

// Action để xóa todo
export async function deleteTodoAction(formData) {
  const id = formData.get('id');

  if (!id) {
    return { error: 'ID không hợp lệ' };
  }

  try {
    await deleteTodo({ id: Number(id) });
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Lỗi xóa todo:', error);
    return { error: 'Có lỗi khi xóa todo.' };
  }
}

// Action để checked/unchecked todo
export async function toggleTodoAction(formData) {
  const id = Number(formData.get('id'));

  if (!id) {
    return { error: 'Invalid ID' };
  }

  try {
    await toggleTodo({ id });   // 👈 dùng lại DB layer
    revalidatePath('/');
    return { success: true };
  } catch (err) {
    console.error('Toggle todo failed:', err);
    return { error: 'Toggle failed' };
  }
}

