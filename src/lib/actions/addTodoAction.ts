'use server';

import { addTodo } from '../todos';
import { revalidatePath } from 'next/cache';

export async function addTodoAction(
  prevState: { error?: string },
  formData: FormData
) {
  try {
    const title = formData.get('title')?.toString().trim();
    if (!title) {
      return { error: 'Tiêu đề không được rỗng' };
    }

    await addTodo({ title });
    revalidatePath('/todowithimage');

    return { error: '' };
  } catch {
    return { error: 'Bạn cần đăng nhập để đăng bài' };
  }
}