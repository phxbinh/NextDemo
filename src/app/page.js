// src/app/page.js
/*
import { getTodos, addTodo } from '../server/db';
import { createTodo, toggleTodoAction, deleteTodoAction } from './actions';
import { revalidatePath } from 'next/cache';  // Nếu cần dùng trong inline action
import { ToggleTodo } from '../components/ToggleTodo';

export default async function Home() {
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
  <main className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950 text-gray-100">
    <div className="max-w-2xl mx-auto p-6 md:p-8">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-10 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 drop-shadow-lg">
        Todo App Neon JS
      </h1>

      <h6>Form thêm todo - glassmorphism + neon glow </h6>
      <form
        action={handleAdd}
        className="mb-10 relative flex gap-3 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl shadow-indigo-500/20 p-2 focus-within:ring-2 focus-within:ring-cyan-400/50 transition-all duration-300"
      >
        <input
          name="title"
          type="text"
          placeholder="Nhập nhiệm vụ mới... ✨"
          className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none px-5 py-4 rounded-xl text-lg font-medium"
          required
        />
        <button
          type="submit"
          className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50 transform hover:scale-105 transition-all duration-300"
        >
          Thêm
        </button>
      </form>

      <ul className="space-y-4">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="group flex items-center justify-between p-5 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 hover:border-white/20 shadow-xl shadow-black/30 hover:shadow-indigo-500/20 transition-all duration-300"
          >
            <div className="flex items-center gap-4 flex-1">
              <ToggleTodo id={todo.id} completed={todo.completed} />

              <span
                className={`text-lg font-medium transition-all duration-300 ${
                  todo.completed
                    ? 'line-through text-gray-500 opacity-70'
                    : 'text-white'
                }`}
              >
                {todo.title}
              </span>
            </div>

            <form action={deleteTodoAction}>
              <input type="hidden" name="id" value={todo.id} />
              <button
                type="submit"
                className="text-red-400 hover:text-red-300 font-medium px-4 py-2 rounded-lg hover:bg-red-500/20 transition-colors duration-200 opacity-70 hover:opacity-100"
              >
                Xóa
              </button>
            </form>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <div className="text-center mt-16 py-10">
          <p className="text-2xl text-gray-400 font-medium">
            Chưa có nhiệm vụ nào... Thêm đi nào! 🚀
          </p>
          <p className="text-gray-500 mt-2">Nhập todo mới ở trên nhé ✨</p>
        </div>
      )}
    </div>
  </main>
);
  }
  */
  
  // src/app/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-gray-950 via-purple-950 to-indigo-950 text-gray-100">
      <h1 className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-8">
        Chào mừng đến Neon JS Todo
      </h1>
      
      <p className="text-2xl text-cyan-300 mb-12 text-center max-w-2xl">
        Ứng dụng todo với vibe cyberpunk neon – quản lý nhiệm vụ kiểu futuristic!
      </p>

      <div className="flex gap-6">
        <Link 
          href="/todos" 
          className="px-10 py-5 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-2xl text-white font-bold hover:from-cyan-500 hover:to-purple-500 shadow-lg shadow-purple-500/40 hover:shadow-purple-400/60 transform hover:scale-105 transition-all duration-300"
        >
          Xem Todos Ngay
        </Link>
        
        <Link 
          href="/about" 
          className="px-10 py-5 bg-black/30 backdrop-blur-xl border border-cyan-500/30 rounded-2xl text-cyan-300 font-medium hover:bg-cyan-900/30 transition-all"
        >
          Về App
        </Link>
      </div>
    </main>
  );
}

