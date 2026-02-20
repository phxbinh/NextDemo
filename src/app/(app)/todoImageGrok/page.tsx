
import TodoImageUploader from "../../../components/TodoImageUploader";
import { TodoImage } from "../../../components/TodoImage";
import { addTodoAction } from '../../../lib/actions/addTodoAction';

import { getTodosWithImages, addTodo } from "../../../lib/todos";
import { revalidatePath } from "next/cache";

import TodoItem from '@/components/TodoItem';

import TodoAddForm from '../../actions/TodoAddForm';

export default async function TodosPage() {
  const todos = (await getTodosWithImages()) ?? [];

  return (
    <div className="max-w-2xl mx-auto px-0 sm:px-0">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-10 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 drop-shadow-lg">
        Todo App Neon JS
      </h1>

      {/* ADD TODO */}
      <TodoAddForm />

      {/* TODO LIST */}
      {todos.length === 0 ? (
        <div className="text-center text-gray-500 py-16">
          <p className="text-lg font-medium">Chưa có todo nào</p>
          <p className="text-sm">
            Tạo todo đầu tiên để upload ảnh
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      )}
    </div>
  );
}