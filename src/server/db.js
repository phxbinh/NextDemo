// src/server/db.js
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL, { fullResults: true }); // fullResults: true để lấy đầy đủ metadata nếu cần

// Lấy tất cả todos, sắp xếp mới nhất trước
export const getTodos = async () => {
  const { rows } = await sql`SELECT * FROM todos ORDER BY id DESC`;
  return rows;
};

// Thêm todo mới (dùng text thay vì title để khớp code bạn)
export const addTodo = async (body) => {
  if (!body?.text?.trim()) {
    throw new Error("Text is required");
  }
  await sql`INSERT INTO todos (text) VALUES (${body.text}) RETURNING *`;
  // RETURNING * để lấy record mới tạo nếu cần (optional)
};

// Xóa todo theo id
export const deleteTodo = async (body) => {
  if (!body?.id) {
    throw new Error("ID is required");
  }
  await sql`DELETE FROM todos WHERE id = ${body.id}`;
};

// Bonus: Toggle completed (nếu bạn muốn thêm chức năng check/uncheck)
export const toggleTodo = async (body) => {
  if (!body?.id) {
    throw new Error("ID is required");
  }
  await sql`
    UPDATE todos 
    SET completed = NOT completed 
    WHERE id = ${body.id}
  `;
};