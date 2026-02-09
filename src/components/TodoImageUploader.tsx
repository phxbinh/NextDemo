"use client";

import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function TodoImageUploader({ todoId }: { todoId: string }) {
  const [loading, setLoading] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setLoading(true);

    // 1️⃣ server check quyền
    const check = await fetch("/api/todos/images/precheck", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todoId }),
    });

    if (!check.ok) {
      alert("Không có quyền upload");
      setLoading(false);
      return;
    }

    const uploaded: string[] = [];

    for (const file of files) {
      if (!file.type.startsWith("image/")) continue;

      const path = `${todoId}/${crypto.randomUUID()}-${file.name}`;

      const { error } = await supabase.storage
        .from("todo-images")
        .upload(path, file);

      if (!error) uploaded.push(path);
    }

    if (uploaded.length) {
      await fetch("/api/todos/images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todoId, paths: uploaded }),
      });
    }

    setLoading(false);
    e.target.value = "";
  }

  return (
    <input
      type="file"
      multiple
      accept="image/*"
      onChange={handleUpload}
      disabled={loading}
    />
  );
}