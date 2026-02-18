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
        className="flex gap-4"
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
      )}
    </div>
  )
}