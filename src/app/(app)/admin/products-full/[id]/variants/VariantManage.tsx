"use client";

import { useState } from "react";

type Attribute = {
  id: string;
  code: string;
  name: string;
  type: string;
  values: { id: string; value: string }[];
};

export default function VariantManager({
  productId,
  attributes,
}: {
  productId: string;
  attributes: Attribute[];
}) {
  // 🔥 1 attribute = 1 selected value
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("0");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleSelect(attributeId: string, valueId: string) {
    setSelected((prev) => ({
      ...prev,
      [attributeId]: valueId,
    }));
  }

  async function handleSubmit() {
    setLoading(true);
    setMessage("");

    const attribute_value_ids = Object.values(selected);

    if (attribute_value_ids.length !== attributes.length) {
      setMessage("You must select all attributes");
      setLoading(false);
      return;
    }

    const res = await fetch("/api/admin/product-variants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: productId,
        price: Number(price),
        stock: Number(stock),
        attribute_value_ids,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || "Error");
    } else {
      setMessage("Variant created successfully");
      setSelected({});
      setPrice("");
      setStock("0");
    }

    setLoading(false);
  }

  return (
    <div className="space-y-6">

      {/* 🔹 Attribute Selectors */}
      <div className="border p-4 rounded space-y-4">
        <h2 className="font-semibold">Attributes</h2>
     <pre className="text-sm p-4 rounded overflow-auto">
          {JSON.stringify(attributes, null, 2)}
        </pre>

        {attributes.map((attr) => (
          <div key={attr.id}>
            <label className="block mb-2 font-medium">
              {attr.name}
            </label>

            <select
              value={selected[attr.id] || ""}
              onChange={(e) =>
                handleSelect(attr.id, e.target.value)
              }
              className="border px-3 py-2 w-full"
            >
              <option value="">Select {attr.name}</option>
              {attr.values.map((val) => (
                <option key={val.id} value={val.id}>
                  {val.value}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* 🔹 Pricing */}
      <div className="border p-4 rounded space-y-4">
        <h2 className="font-semibold">Pricing</h2>

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border px-3 py-2 w-full"
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="border px-3 py-2 w-full"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {loading ? "Creating..." : "Create Variant"}
        </button>

        {message && (
          <p className="text-sm mt-2">{message}</p>
        )}
      </div>
    </div>
  );
}