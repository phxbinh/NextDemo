import { getTodoById } from '../../../../server/db';
import { updateTodoAction, deleteTodoFromDetail } from '../../../actions';
import { notFound, redirect } from 'next/navigation';
import { ConfirmDeleteModal } from '../../../../components/ConfirmDeleteModal';

export default async function TodoDetail({ params }) {
  const todo = await getTodoById(params.id);

  if (!todo) notFound();

  return (
    <div className="max-w-xl mx-auto mt-20 space-y-6">
      <h1 className="text-3xl font-bold text-white">Todo Detail</h1>
     <h3 className="flex items-center gap-3">
        Trạng thái: {todo.completed ? 'Đã hoàn thành' : 'Chưa hoàn thành'}
        <input
          type="checkbox"
          checked={todo.completed}
          readOnly
        />
      </h3>
      {/* Update */}
      <form action={updateTodoAction} className="space-y-4">
        <input type="hidden" name="id" value={todo.id} />
        <input
          name="title"
          defaultValue={todo.title}
          className="w-full px-4 py-3 rounded-xl bg-white/10 text-white outline-none"
        />
        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 transition"
        >
          Cập nhật
        </button>
      </form>

      {/* Delete */}
      <ConfirmDeleteModal
        action={deleteTodoFromDetail}
        todoId={todo.id}
      />
    </div>
  );
}

