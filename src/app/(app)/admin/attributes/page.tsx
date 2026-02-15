"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

type Attribute = {
  id: string
  code: string
  name: string
  type: string
  created_at: string
}

const ATTRIBUTE_TYPES = [
  "text",
  "color",
  "number",
  "size",
  "material",
]

export default function AttributesPage() {
  const [data, setData] = useState<Attribute[]>([])
  const [loading, setLoading] = useState(true)

  const [code, setCode] = useState("")
  const [name, setName] = useState("")
  const [type, setType] = useState("text")

  const [editingId, setEditingId] = useState<string | null>(null)

  /* =========================
     LOAD
  ========================= */
  async function loadData() {
    setLoading(true)
    const res = await fetch("/api/admin/attributes")
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

    const res = await fetch("/api/admin/attributes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, name, type }),
    })

    if (!res.ok) {
      const err = await res.json()
      alert(err.error)
      return
    }

    resetForm()
    loadData()
  }

  /* =========================
     UPDATE
  ========================= */
  async function handleUpdate(id: string) {
    const res = await fetch(`/api/admin/attributes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, name, type }),
    })

    if (!res.ok) {
      const err = await res.json()
      alert(err.error)
      return
    }

    resetForm()
    loadData()
  }

  /* =========================
     DELETE
  ========================= */
  async function handleDelete(id: string) {
    if (!confirm("Delete this attribute?")) return

    const res = await fetch(`/api/admin/attributes/${id}`, {
      method: "DELETE",
    })

    if (!res.ok) {
      const err = await res.json()
      alert(err.error)
      return
    }

    loadData()
  }

  function resetForm() {
    setEditingId(null)
    setCode("")
    setName("")
    setType("text")
  }

return (
  <div className="p-4 sm:p-6 space-y-6 max-w-full overflow-x-auto">
    <h1 className="text-2xl font-bold">Attributes</h1>

    {/* FORM */}
    <form
      onSubmit={
        editingId
          ? (e) => {
              e.preventDefault()
              handleUpdate(editingId)
            }
          : handleCreate
      }
      className="flex flex-col sm:flex-row flex-wrap gap-3 items-start sm:items-center"
    >
      <input
        placeholder="code (vd: size)"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="border rounded px-3 py-2 min-w-[140px] flex-1 sm:flex-none sm:w-44"
      />

      <input
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border rounded px-3 py-2 min-w-[140px] flex-1 sm:flex-none sm:w-64"
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="border rounded px-3 py-2 min-w-[140px] sm:w-40"
      >
        {ATTRIBUTE_TYPES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <div className="flex gap-2 flex-wrap">
        <button 
          type="submit"
          className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800 transition-colors"
        >
          {editingId ? "Update" : "Create"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            className="border border-gray-400 px-5 py-2 rounded hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>

    {/* TABLE */}
    {loading ? (
      <p className="text-center py-8">Loading...</p>
    ) : (
      <div className="overflow-x-auto rounded border border-gray-200">
        <table className="w-full min-w-[650px] border-collapse text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border-b border-r px-4 py-3 text-left font-semibold">Code</th>
              <th className="border-b border-r px-4 py-3 text-left font-semibold">Name</th>
              <th className="border-b border-r px-4 py-3 text-left font-semibold">Type</th>
              <th className="border-b border-r px-4 py-3 text-left font-semibold">Actions</th>
              <th className="border-b px-4 py-3 text-left font-semibold">Values</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border-b border-r px-4 py-3">{item.code}</td>
                <td className="border-b border-r px-4 py-3">{item.name}</td>
                <td className="border-b border-r px-4 py-3">{item.type}</td>

                <td className="border-b border-r px-4 py-3 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingId(item.id)
                        setCode(item.code)
                        setName(item.name)
                        setType(item.type)
                      }}
                      className="border border-blue-500 text-blue-600 px-3 py-1 rounded text-sm hover:bg-blue-50"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="border border-red-500 text-red-600 px-3 py-1 rounded text-sm hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                </td>

                <td className="border-b px-4 py-3">
                  <Link
                    href={`/admin/attributes/${item.id}/values`}
                    className="inline-block border border-indigo-500 text-indigo-600 px-3 py-1 rounded text-sm hover:bg-indigo-50"
                  >
                    Manage Values
                  </Link>
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




/*
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Attributes</h1>
      <form
        onSubmit={
          editingId
            ? (e) => {
                e.preventDefault()
                handleUpdate(editingId)
              }
            : handleCreate
        }
        className="flex gap-4 items-center"
      >
        <input
          placeholder="code (vd: size)"
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

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border px-3 py-2"
        >
          {ATTRIBUTE_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <button className="bg-black text-white px-4 py-2">
          {editingId ? "Update" : "Create"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            className="border px-4 py-2"
          >
            Cancel
          </button>
        )}
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Code</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Type</th>
              <th className="border p-2">Actions</th>
              <th className="border p-2">Values</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="border p-2">{item.code}</td>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.type}</td>

                <td className="border p-2 space-x-2">
                  <button
                    onClick={() => {
                      setEditingId(item.id)
                      setCode(item.code)
                      setName(item.name)
                      setType(item.type)
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

                <td className="border p-2">
                  <Link
                    href={`/admin/attributes/${item.id}/values`}
                    className="border px-3 py-1 inline-block"
                  >
                    Manage Values
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

*/


