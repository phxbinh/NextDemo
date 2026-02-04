// src/server/db.js
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL); // fullResults: true để lấy đầy đủ metadata nếu cần

// Lấy tất cả todos, sắp xếp mới nhất trước
/*
export const getTodos = async () => {
  const { rows } = await sql`SELECT * FROM todosnew ORDER BY id DESC`;
  return rows;
};*/
export const getTodos = async () => {
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

/*
// Bonus: Toggle completed (nếu bạn muốn thêm chức năng check/uncheck)
export const toggleTodo = async (body) => {
  if (!body?.id) {
    throw new Error("ID is required");
  }
  await sql`
    UPDATE todosnew 
    SET completed = NOT completed 
    WHERE id = ${body.id}
  `;
};
*/

export const toggleTodo_ = async ({ id }) => {
  if (!id?.trim()) {
    throw new Error("ID is required");
  }

  console.log('Executing SQL toggle for id:', id);

  const result = await sql`
    UPDATE todosnew 
    SET completed = NOT completed 
    WHERE id = ${id}
    RETURNING id, completed;
  `;

  console.log('Update result:', result.rows); // rows là array

  if (result.rowCount === 0) {
    console.warn(`No row found/updated for id: ${id}`);
  }

  return result;
};


export const toggleTodo = async (body) => {
  if (!body?.id) {
    throw new Error("ID is required");
  }
  return await sql`UPDATE todosnew SET completed = NOT completed WHERE id = ${body.id} RETURNING id, completed`;
};





