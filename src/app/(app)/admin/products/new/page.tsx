
/*
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import slugify from "slugify"

export default function CreateProductPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    name: "",
    slug: "",
    product_type: "default",
    short_description: "",
    description: ""
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Auto slug from name
  useEffect(() => {
    if (form.name) {
      setForm(prev => ({
        ...prev,
        slug: slugify(prev.name, { lower: true, strict: true })
      }))
    }
  }, [form.name])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to create product")
      }

      router.push(`/admin/products/${data.id}`)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold mb-6">Create Product</h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded">
            {error}
          </div>
        )}

        
        <div>
          <label className="block font-medium mb-1">Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

       
        <div>
          <label className="block font-medium mb-1">Slug *</label>
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

      
        <div>
          <label className="block font-medium mb-1">Product Type</label>
          <select
            name="product_type"
            value={form.product_type}
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
            value={form.short_description}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded px-3 py-2"
          />
        </div>

      
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={6}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Creating..." : "Save Draft"}
        </button>

      </form>
    </div>
  )
}
*/




// app/(app)/admin/products/new/page.tsx
"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import slugify from "slugify"

type ProductType = {
  id: string
  code: string
  name: string
}

export default function CreateProductPage() {
  const router = useRouter()

  const [types, setTypes] = useState<ProductType[]>([])

  const [form, setForm] = useState({
    name: "",
    slug: "",
    product_type_id: "",
    short_description: "",
    description: ""
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load product types
  useEffect(() => {
    async function fetchTypes() {
      try {
        const res = await fetch("/api/admin/product-types")
        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || "Failed to load product types")
        }

        setTypes(data)
      } catch (err: any) {
        setError(err.message)
      }
    }

    fetchTypes()
  }, [])

  // Auto slug from name
  useEffect(() => {
    if (form.name) {
      setForm(prev => ({
        ...prev,
        slug: slugify(prev.name, { lower: true, strict: true })
      }))
    }
  }, [form.name])

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed to create product")
      }

      router.push(`/admin/products/${data.id}`)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <h1 className="text-2xl font-bold mb-6">Create Product</h1>

      <form onSubmit={handleSubmit} className="space-y-6">

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded">
            {error}
          </div>
        )}

        {/* Name */}
        <div>
          <label className="block font-medium mb-1">Name *</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block font-medium mb-1">Slug *</label>
          <input
            name="slug"
            value={form.slug}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Product Type */}
        <div>
          <label className="block font-medium mb-1">Product Type *</label>
          <select
            name="product_type_id"
            value={form.product_type_id}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select type</option>
            {types.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        {/* Short Description */}
        <div>
          <label className="block font-medium mb-1">
            Short Description
          </label>
          <textarea
            name="short_description"
            value={form.short_description}
            onChange={handleChange}
            rows={3}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={6}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Creating..." : "Save Draft"}
        </button>

      </form>
    </div>
  )
}










