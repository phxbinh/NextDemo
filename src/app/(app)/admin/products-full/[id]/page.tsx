/*
import React from "react";
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

async function getProductFull(id: string) {
  const h = await headers();

  const host = h.get('host')!;
  const protocol =
    process.env.NODE_ENV === 'development' ? 'http' : 'https';

  const res = await fetch(`${protocol}://${host}/api/admin/products/${id}/full`, {
    cache: 'no-store',
    headers: {
      cookie: h.get('cookie') ?? '',
    },
  });

  if (res.status === 401) redirect('/login');
  if (res.status === 403) redirect('/403');
  if (!res.ok) throw new Error('Failed to fetch users');

  return res.json()

}

*/
/*
async function getProductFull(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/products/${id}/full`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}*/













//export default async
function ProductDetailPage_({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await getProductFull(id);

  return (
    <div className="p-6 space-y-8">

      <h1 className="text-2xl font-bold">
        Product Detail Debug
      </h1>

      {/* 🔹 Product Basic Info */}
      <section className="border p-4 rounded">
        <h2 className="font-semibold mb-2">Product Info</h2>
        <pre className="text-sm bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(data.product, null, 2)}
        </pre>
      </section>

      {/* 🔹 Summary */}
      <section className="border p-4 rounded">
        <h2 className="font-semibold mb-2">Summary</h2>
        <pre className="text-sm bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(data.summary, null, 2)}
        </pre>
      </section>

      {/* 🔹 Attributes */}
      <section className="border p-4 rounded">
        <h2 className="font-semibold mb-2">Attributes</h2>
        <pre className="text-sm bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(data.attributes, null, 2)}
        </pre>
      </section>

      {/* 🔹 Variants */}
      <section className="border p-4 rounded">
        <h2 className="font-semibold mb-2">Variants</h2>
        <pre className="text-sm bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(data.variants, null, 2)}
        </pre>
      </section>

      {/* 🔹 Images */}
      <section className="border p-4 rounded">
        <h2 className="font-semibold mb-2">Images</h2>
        <pre className="text-sm bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(data.images, null, 2)}
        </pre>
      </section>

    </div>
  );
}



import { sql } from "@/lib/neon/sql";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const result = await sql`
    select *
    from products
    where id = ${id}
    limit 1
  `;

  if (result.length === 0) {
    return <div className="p-6">Product not found</div>;
  }

  const product = result[0];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Product Debug (Direct DB)
      </h1>

      <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
        {JSON.stringify(product, null, 2)}
      </pre>
    </div>
  );
}






