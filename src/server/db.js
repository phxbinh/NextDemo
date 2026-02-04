// src/server/db.js

import { neon } from "@neondatabase/serverless";
import { unstable_noStore as noStore } from 'next/cache';

//const sql = neon(process.env.DATABASE_URL); // fullResults: true để lấy đầy đủ metadata nếu cần

const sql = neon(process.env.DATABASE_URL, {
  fullResults: true,          // trả về đầy đủ metadata, giúp debug
  max: 20,                    // giới hạn connection pool
  connectionTimeout: 30000,   // 30 giây
  idleTimeout: 30000,
});


export const getTodos = async () => {
  noStore();
  return await sql`SELECT * FROM todosnew ORDER BY id DESC`;
};

// Thêm todo mới (dùng text thay vì title để khớp code bạn)
export const addTodo = async (body) => {
  if (!body?.title?.trim()) {
    throw new Error("Text is required");
  }
  await sql`INSERT INTO todosnew (title) VALUES (${body.title}) RETURNING *`;
  // RETURNING * để lấy record mới tạo nếu cần (optional)
};

// Xóa todo theo id
export const deleteTodo = async (body) => {
  if (!body?.id) {
    throw new Error("ID is required");
  }
  await sql`DELETE FROM todosnew WHERE id = ${body.id}`;
};


export const toggleTodo = async ({ id }) => {
  const todoId = Number(id);
  if (!todoId) {
    throw new Error("ID is required");
  }
  console.log('[DB] Toggle success:', typeof todoId, ' - ', todoId);
  return await sql`
    UPDATE todosnew
    SET completed = NOT completed
    WHERE id = ${todoId}
    RETURNING id, completed
  `;
};

export const toggleTodo_ = async ({ id }) => {
  const todoId = Number(id);
  if (!todoId) {
    throw new Error("ID is required");
  }

  try {
    const result = await sql`
      UPDATE todosnew 
      SET completed = NOT completed 
      WHERE id = ${todoId}
      RETURNING id, completed;
    `;

    console.log('[DB] Toggle success:', result.rows[0]);
    return result.rows[0];
  } catch (error) {
    console.error('[DB] Toggle FAILED:', error.message, error.stack);
    throw error;
  }
};



