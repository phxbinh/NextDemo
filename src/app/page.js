// app/page.js
import { getTodos, addTodo } from '../server/db';
import { createTodo, toggleTodoAction, deleteTodoAction } from './actions';
import { revalidatePath } from 'next/cache';  // Nếu cần dùng trong inline action

export const runtime = 'nodejs';

export default async function Home() {
  const todos = await getTodos();  // Fetch data server-side

  // Inline Server Action cho form add (cách đơn giản, không cần file actions riêng nếu muốn)
  /*async function handleAdd(formData) {
    'use server';
    const result = await createTodo(formData);
    if (result.error) {
      // Có thể throw hoặc return error để hiển thị
      console.error(result.error);
    }
    // revalidatePath('/') đã có trong action
  }*/

async function handleAdd(formData) {
  'use server';
  const text = formData.get('text')?.toString().trim();
  if (!text) return;

  await addTodo({ text });   // GỌI DB TRỰC TIẾP
  revalidatePath('/');
}

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Todo App Neon JS</h1>

      {/* Form thêm todo */}
      <form action={handleAdd} className="mb-8 flex gap-2">
        <input
          name="text"  // Phải khớp với field trong db (text thay vì title)
          type="text"
          placeholder="Nhập todo mới..."
          className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Thêm
        </button>
      </form>

      <ul className="space-y-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm"
          >
            <div className="flex items-center gap-3">
              <form action={toggleTodoAction}>
                <input type="hidden" name="id" value={todo.id} />
                <button type="submit" className="cursor-pointer">
                  <input
                    type="checkbox"
                    readOnly
                    checked={todo.completed}
                    className="w-5 h-5 pointer-events-none"
                  />
                </button>
              </form>

              <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                {todo.text}
              </span>
            </div>

            <form action={deleteTodoAction}>
              <input type="hidden" name="id" value={todo.id} />
              <button
                type="submit"
                className="text-red-500 hover:text-red-700 font-medium"
              >
                Xóa
              </button>
            </form>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p className="text-center text-gray-500 mt-10">Chưa có todo nào. Thêm đi!</p>
      )}
    </main>
  );
}