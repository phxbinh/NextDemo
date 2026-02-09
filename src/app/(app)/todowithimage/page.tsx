"use client"
import TodoImageUploader from "../../../components/TodoImageUploader";
import { TodoImage } from "../../../components/TodoImage";

import { getTodosWithImages, addTodo } from "../../../lib/todos";
import { revalidatePath } from "next/cache";

import { useFormState } from "react-dom";

// comments


export default async function TodosPage() {
  const todos = (await getTodosWithImages()) ?? [];

  // Server Action: add todo
/*
  async function handleAdd(formData: FormData) {
    "use server";

    const title = formData.get("title")?.toString().trim();
    if (!title) return;

    await addTodo({ title });
    revalidatePath("/todoimages");
  }
*/

async function handleAdd(formData: FormData) {
  "use server";

  try {
    const title = formData.get("title")?.toString().trim();
    if (!title) return;

    await addTodo({ title });
    revalidatePath("/todowithimage");
  } catch (err) {
    // không throw tiếp
    return {
      error: "Bạn cần đăng nhập để đăng bài",
    };
  }
}

const initialState = { error: "" };
const [state, formAction] = useFormState(handleAdd, initialState);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-0">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-10 text-center tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 drop-shadow-lg">
        Todo App Neon JS
      </h1>

      {/* ADD TODO */}
{/*
      <form action={handleAdd} className="mb-10 flex gap-2">
        <input
          name="title"
          placeholder="Nhập todo mới..."
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Add
        </button>
      </form>
*/}

<form action={formAction} className="mb-10 space-y-3">
  <input
    name="title"
    placeholder="Nhập todo mới..."
    className="w-full border rounded px-3 py-2"
  />

  {state.error && (
    <p className="text-sm text-red-600">
      {state.error}
    </p>
  )}

  <button className="px-4 py-2 bg-blue-600 text-white rounded">
    Add
  </button>
</form>






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
            <div
              key={todo.id}
              className="border border-gray-200 rounded-lg p-4 space-y-3"
            >
              <h2 className="text-lg font-semibold">{todo.title}</h2>

              {todo.content && (
                <p className="text-sm text-gray-600">{todo.content}</p>
              )}

{todo.images.map((img) => (
  <TodoImage
    key={img.image_path}
    path={img.image_path}
  />
))}

              {/* Upload ảnh cho todo này */}
              <TodoImageUploader todoId={todo.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}