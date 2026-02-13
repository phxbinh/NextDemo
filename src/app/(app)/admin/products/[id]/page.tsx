"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import slugify from "slugify"

interface Product {
  id: string
  name: string
  slug: string
  product_type: string
  short_description: string | null
  description: string | null
  status: "draft" | "active" | "archived"
}

export default function ProductDetailPage({
  params
}: {
  params: { id: string }
}) {
  const router = useRouter()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/admin/products/${params.id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data)
        setLoading(false)
      })
  }, [params.id])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (!product) return
    setProduct({
      ...product,
      [e.target.name]: e.target.value
    })
  }

  const handleSave = async () => {
    if (!product) return

    setSaving(true)
    setError(null)

    try {
      const res = await fetch(
        `/api/admin/products/${product.id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(product)
        }
      )

      if (!res.ok) {
        throw new Error("Failed to update")
      }
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
      <h1 className="text-2xl font-bold mb-6">
        Edit Product
      </h1>

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
          <label className="block font-medium mb-1">
            Product Type
          </label>
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
            onChange={handleChange}
            rows={6}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">
            Status
          </label>
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
          className="bg-black text-white px-6 py-2 rounded"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>

      </div>
    </div>
  )
}