

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


/* Không dùng cái này -> Tham khảo cho error
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


export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await getProductFull(id);

  return (

    <div className="p-6 space-y-8">
      <><pre>{JSON.stringify(data, null, 2)}</pre></>
      <h1 className="text-2xl font-bold">
        Product Detail Debug
      </h1>

   
      <section className="border p-4 rounded">
        <h2 className="font-semibold mb-2">Product Info</h2>
        <pre className="text-sm p-4 rounded overflow-auto">
          {JSON.stringify(data.product, null, 2)}
        </pre>
      </section>

 
      <section className="border p-4 rounded">
        <h2 className="font-semibold mb-2">Summary</h2>
        <pre className="text-sm p-4 rounded overflow-auto">
          {JSON.stringify(data.summary, null, 2)}
        </pre>
      </section>


      <section className="border p-4 rounded">
        <h2 className="font-semibold mb-2">Attributes</h2>
        <pre className="text-sm p-4 rounded overflow-auto">
          {JSON.stringify(data.attributes, null, 2)}
        </pre>
      </section>

     
      <section className="border p-4 rounded">
        <h2 className="font-semibold mb-2">Variants</h2>
        <pre className="text-sm p-4 rounded overflow-auto">
          {JSON.stringify(data.variants, null, 2)}
        </pre>
      </section>

    
      <section className="border p-4 rounded">
        <h2 className="font-semibold mb-2">Images</h2>
        <pre className="text-sm p-4 rounded overflow-auto">
          {JSON.stringify(data.images, null, 2)}
        </pre>
      </section>

    </div>
  );
}







/* Cho test ----
"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"

interface Product {
  id: string
  name: string
  slug: string
  product_type: string
  short_description: string | null
  description: string | null
  status: "draft" | "active" | "archived"
}

export default function ProductDetailPage() {
  const router = useRouter()
  const { id } = useParams<{ id: string }>()

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch product
  useEffect(() => {
    if (!id) return

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/admin/products/${id}`)

        if (!res.ok) {
          throw new Error("Failed to fetch product")
        }

        const data = await res.json()
        setProduct(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (!product) return

    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    })
  }

  const handleSave = async () => {
    if (!product) return

    setSaving(true)
    setError(null)

    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || "Failed to update")
      }

      const updated = await res.json()
      setProduct(updated)

      alert("Product updated successfully")
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="p-10">Loading...</div>
  if (!product) return <div className="p-10">Not found</div>

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold mb-6">Edit Product</h1>

      {error && (
        <div className="bg-red-100 p-3 mb-4 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            name="name"
            value={product.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Slug</label>
          <input
            name="slug"
            value={product.slug}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Product Type</label>
          <select
            name="product_type"
            value={product.product_type}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="default">Default</option>
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Short Description
          </label>
          <textarea
            name="short_description"
            value={product.short_description ?? ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={product.description ?? ""}
            rows={6}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Status</label>
          <select
            name="status"
            value={product.status}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          >
            <option value="draft">Draft</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-black text-white px-6 py-2 rounded disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  )
}
*/






/*
// Dùng khi tách
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import FullProductClient from "./FullProductClient";

export const dynamic = "force-dynamic";

async function getProductFull(id: string) {
  const h = await headers();

  const host = h.get("host")!;
  const protocol =
    process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(
    `${protocol}://${host}/api/admin/products/${id}/full`,
    {
      cache: "no-store",
      headers: {
        cookie: h.get("cookie") ?? "",
      },
    }
  );

  if (res.status === 401) redirect("/login");
  if (res.status === 403) redirect("/403");

  if (!res.ok) {
    const text = await res.text();
    console.error("API ERROR:", text);
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await getProductFull(id);

  return <FullProductClient data={data} />;
}
*/











