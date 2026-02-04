// src/app/actions.js
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
    await addTodo({ title: title });  // Gọi hàm db
    revalidatePath('/');  // Refresh trang chủ để hiển thị todo mới
    return { success: true };
  } catch (error) {
    console.error('Lỗi khi thêm todo:', error);
    return { error: 'Có lỗi xảy ra khi thêm todo.' };
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

// Toggle completed chechked box todosnew
export async function toggleTodoAction(formData) {
  const rawId = formData.get('id');
  const id = Number(rawId);

  console.log('[ACTION] toggle id:', rawId, '=>', id, typeof id);

  if (!Number.isInteger(id)) {
    throw new Error('Invalid ID');
  }

  await toggleTodo({ id });
  revalidatePath('/');
}





