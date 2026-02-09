// src/app/(app)/todoimages/page.tsx
import  TodoImageUploader from '../../../components/TodoImageUploader';

export default async function Todos() {
  const todos = await getTodos();  // Fetch data server-side

  // Inline Server Action cho form add (cách đơn giản, không cần file actions riêng nếu muốn)
  async function handleAdd(formData) {
    'use server';
    const title = formData.get('title')?.toString().trim();
    if (!title) return;
  
    await addTodo({ title });   // GỌI DB TRỰC TIẾP
    revalidatePath('/');
  }
  return (
 
    <div className="max-w-2xl mx-auto px-0 sm:px-0">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-10 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 drop-shadow-lg">
        Todo App Neon JS
      </h1>
      <TodoImageUploader />
    </div>

);
  }

  