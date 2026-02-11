// src/server/db.ts

import { neon } from "@neondatabase/serverless";
import { unstable_noStore as noStore } from "next/cache";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined");
}

const sql = neon(process.env.DATABASE_URL);

// ======================
// Types
// ======================

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// ======================
// Queries
// ======================

export const getTodos = async (): Promise<Todo[]> => {
  noStore();
  const rows = await sql<Todo>`
    SELECT * FROM todosnew ORDER BY id DESC
  `;
  return rows;
};

export const addTodo = async ({
  title,
}: {
  title: string;
}): Promise<Todo> => {
  if (!title?.trim()) {
    throw new Error("Title is required");
  }

  const rows = await sql<Todo>`
    INSERT INTO todosnew (title)
    VALUES (${title})
    RETURNING *;
  `;

  return rows[0];
};

export const deleteTodo = async ({
  id,
}: {
  id: number;
}): Promise<void> => {
  const todoId = Number(id);
  if (!todoId) {
    throw new Error("ID is required");
  }

  await sql`
    DELETE FROM todosnew WHERE id = ${todoId};
  `;
};

export const toggleTodo = async ({
  id,
}: {
  id: number;
}): Promise<Pick<Todo, "id" | "completed">> => {
  const todoId = Number(id);
  if (!todoId) {
    throw new Error("ID is required");
  }

  const rows = await sql<Pick<Todo, "id" | "completed">>`
    UPDATE todosnew
    SET completed = NOT completed
    WHERE id = ${todoId}
    RETURNING id, completed;
  `;

  return rows[0];
};

export const getTodoById = async (id: number): Promise<Todo | null> => {
  noStore();

  const todoId = Number(id);
  if (!todoId) {
    throw new Error("Invalid ID");
  }

  const rows = await sql<Todo>`
    SELECT * FROM todosnew WHERE id = ${todoId};
  `;

  return rows[0] ?? null;
};

export const updateTodo = async ({
  id,
  title,
}: {
  id: number;
  title: string;
}): Promise<Todo> => {
  const todoId = Number(id);

  if (!todoId || !title?.trim()) {
    throw new Error("Invalid data");
  }

  const rows = await sql<Todo>`
    UPDATE todosnew
    SET title = ${title}
    WHERE id = ${todoId}
    RETURNING *;
  `;

  return rows[0];
};