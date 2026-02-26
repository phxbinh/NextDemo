
// src/app/(app)/admin/product-types/attribute-manage/page.tsx
"use client"

import { useEffect, useState } from "react"

type ProductType = {
  id: string
  code: string
  name: string
}

type Attribute = {
  id: string
  code: string
  name: string
}

export default function ProductTypeAttributeManager() {
  const [types, setTypes] = useState<ProductType[]>([])
  const [attributes, setAttributes] = useState<Attribute[]>([])

  const [selectedTypeCode, setSelectedTypeCode] = useState("")
  const [selectedAttributes, setSelectedAttributes] = useState<string[]>([])

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  // Load product types + attributes
  useEffect(() => {
    async function fetchData() {
      const [typesRes, attrRes] = await Promise.all([
        fetch("/api/admin/product-types"),
        fetch("/api/admin/attributes"),
      ])

      const typesData = await typesRes.json()
      const attrData = await attrRes.json()

      setTypes(typesData)
      setAttributes(attrData)
    }

    fetchData()
  }, [])

  const handleCheckboxChange = (code: string) => {
    setSelectedAttributes(prev =>
      prev.includes(code)
        ? prev.filter(a => a !== code)
        : [...prev, code]
    )
  }

  const handleSubmit = async () => {
    if (!selectedTypeCode) {
      setMessage("Please select a product type")
      return
    }

    if (selectedAttributes.length === 0) {
      setMessage("Select at least one attribute")
      return
    }

    setLoading(true)
    setMessage(null)

    try {
      const res = await fetch("/api/admin/product-type-attributes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          product_type_code: selectedTypeCode,
          attribute_codes: selectedAttributes
        })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "Failed")
      }

      setMessage(`Inserted ${data.inserted} attribute(s)`)
    } catch (err: any) {
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-6 space-y-6">

      <h1 className="text-2xl font-bold">
        Product Type → Attributes
      </h1>

      {/* Select Product Type */}
      <div>
        <label className="block font-medium mb-2">
          Select Product Type
        </label>

        <select
          value={selectedTypeCode}
          onChange={(e) => setSelectedTypeCode(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">-- Select --</option>
          {types.map(type => (
            <option key={type.id} value={type.code}>
              {type.name}
            </option>
          ))}
        </select>
      </div>

      {/* Attributes List */}
      <div>
        <label className="block font-medium mb-2">
          Attributes
        </label>

        <div className="space-y-2">
          {attributes.map(attr => (
            <label
              key={attr.id}
              className="flex items-center gap-2"
            >
              <input
                type="checkbox"
                checked={selectedAttributes.includes(attr.code)}
                onChange={() => handleCheckboxChange(attr.code)}
              />
              {attr.name}
            </label>
          ))}
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-black text-white px-6 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Saving..." : "Save Mapping"}
      </button>

      {message && (
        <div className="p-3 rounded">
          {message}
        </div>
      )}

    </div>
  )
}