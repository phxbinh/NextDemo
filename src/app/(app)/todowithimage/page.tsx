
import TodoImageUploader from "../../../components/TodoImageUploader";
import { TodoImage } from "../../../components/TodoImage";
import { addTodoAction } from '../../../lib/actions/addTodoAction';

import { getTodosWithImages, addTodo } from "../../../lib/todos";
import { revalidatePath } from "next/cache";

//import { useFormState } from "react-dom";
import TodoAddForm from '../../actions/TodoAddForm';

//const initialState = { error: "" };

export default async function TodosPage() {
  const todos = (await getTodosWithImages()) ?? [];

  // Server Action: add todo   h
/*
  async function handleAdd(formData: FormData) {
    "use server";

    const title = formData.get("title")?.toString().trim();
    if (!title) return;

    await addTodo({ title });
    revalidatePath("/todoimages");
  }
*/


//const [state, formAction] = useFormState(addTodoAction, initialState);

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


{/*
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
*/}

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
            <div
              key={todo.id}
              className="border border-gray-200 rounded-lg p-4 space-y-3"
            >
              <h2 className="text-lg font-semibold">{todo.title}</h2>

              {todo.content && (
                <p className="text-sm text-gray-600">{todo.content}</p>
              )}

{/*
{todo.images.map((img) => (
  <TodoImage
    key={img.image_path}
    path={img.image_path}
  />
))}
*/}


<div className="grid grid-cols-3 gap-1 rounded-lg overflow-hidden">
  {todo.images.slice(0, 6).map((img, i) => (
    <div
      key={img.image_path}
      className={`relative aspect-square overflow-hidden ${
        i === 0 ? 'col-span-2 row-span-2' : ''
      }`}
    >
      <TodoImage
        path={img.image_path}
        className="h-full w-full object-cover"
      />

      {i === 5 && todo.images.length > 6 && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xl font-semibold">
          +{todo.images.length - 6}
        </div>
      )}
    </div>
  ))}
</div>






              {/* Upload ảnh cho todo này */}
              <TodoImageUploader todoId={todo.id} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}