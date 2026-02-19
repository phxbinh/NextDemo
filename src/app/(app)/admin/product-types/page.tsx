"use client"

import { useEffect, useState } from "react"

type ProductType = {
  id: string
  code: string
  name: string
  created_at: string
}

export default function ProductTypesPage() {
  const [data, setData] = useState<ProductType[]>([])
  const [loading, setLoading] = useState(true)

  const [code, setCode] = useState("")
  const [name, setName] = useState("")

  const [editingId, setEditingId] = useState<string | null>(null)

  /* =========================
     LOAD
  ========================= */
  async function loadData() {
    setLoading(true)
    const res = await fetch("/api/admin/product-types")
    const json = await res.json()
    setData(json)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  /* =========================
     CREATE
  ========================= */
  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()

    const res = await fetch("/api/admin/product-types", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, name }),
    })

    if (!res.ok) {
      const err = await res.json()
      alert(err.error)
      return
    }

    setCode("")
    setName("")
    loadData()
  }

  /* =========================
     UPDATE
  ========================= */
  async function handleUpdate(id: string) {
    const res = await fetch(`/api/admin/product-types/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, name }),
    })

    if (!res.ok) {
      const err = await res.json()
      alert(err.error)
      return
    }

    setEditingId(null)
    setCode("")
    setName("")
    loadData()
  }

  /* =========================
     DELETE
  ========================= */
  async function handleDelete(id: string) {
    if (!confirm("Delete this product type?")) return

    const res = await fetch(`/api/admin/product-types/${id}`, {
      method: "DELETE",
    })

    if (!res.ok) {
      const err = await res.json()
      alert(err.error)
      return
    }

    loadData()
  }

  return (
    <div className="p-0 space-y-6">
      <h1 className="text-2xl font-bold">Product Types</h1>

      {/* FORM */}
      <form
        onSubmit={
          editingId ? (e) => { e.preventDefault(); handleUpdate(editingId) } : handleCreate
        }
        className="flex gap-2"
      >
        <input
          placeholder="code (vd: shirt)"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border px-3 py-2"
        />

        <input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border px-3 py-2"
        />

        <button className="bg-black text-white px-4 py-2">
          {editingId ? "Update" : "Create"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null)
              setCode("")
              setName("")
            }}
            className="border px-4 py-2"
          >
            Cancel
          </button>
        )}
      </form>

      {/* TABLE */}
      {/*
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Code</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">{item.code}</td>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => {
                      setEditingId(item.id)
                      setCode(item.code)
                      setName(item.name)
                    }}
                    className="border px-3 py-1"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="border px-3 py-1 text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )} */}
{/* TABLE */}
{loading ? (
  <p>Loading...</p>
) : (
  <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
    {/* div này tạo border đẹp + scroll ngang */}
    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
      <thead className="bg-gray-50 dark:bg-gray-800">
        <tr>
          <th className="border px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">
            Code
          </th>
          <th className="border px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">
            Name
          </th>
          <th className="border px-4 py-3 text-left text-sm font-medium text-gray-900 dark:text-gray-100">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
        {data.map((item) => (
          <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
            <td className="border px-4 py-3 text-sm text-gray-900 dark:text-gray-100 whitespace-nowrap">
              {item.code}
            </td>
            <td className="border px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
              {item.name}
            </td>
            <td className="border px-4 py-3 text-sm space-x-2">
              <button
                onClick={() => {
                  setEditingId(item.id);
                  setCode(item.code);
                  setName(item.name);
                }}
                className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded text-white bg-red-600 hover:bg-red-700"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}




    </div>
  )
}