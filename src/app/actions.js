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

/*
// Action để toggle completed (check/uncheck)
export async function toggleTodoAction(formData) {
  const id = formData.get('id');
  alert("before: "+id)
  if (!id) {
    return { error: 'ID không hợp lệ' };
  }
  alert("after: "+id)

  try {
    await toggleTodo({ id: Number(id) });  // Ép Number vì FormData gửi string
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Lỗi toggle todo:', error);
    return { error: 'Có lỗi khi cập nhật trạng thái.' };
  }
}
*/

export async function toggleTodoAction(formData: FormData) {
  const idStr = formData.get('id');

  console.log('FormData id received:', idStr, typeof idStr); // debug

  if (typeof idStr !== 'string' || !idStr.trim()) {
    console.error('Invalid id from form');
    return { error: 'ID không hợp lệ' };
  }

  const id = idStr.trim(); // giữ nguyên string

  try {
    console.log('Calling toggleTodo with id (string):', id);
    await toggleTodo({ id });  // truyền string
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Toggle error:', error);
    return { error: 'Lỗi cập nhật trạng thái' };
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
