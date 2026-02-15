"use client";

import { useState } from "react";

type Attribute = {
  id: string;
  name: string;
  values: { id: string; value: string }[];
};

export default function VariantManager({
  productId,
  attributes,
}: {
  productId: string;
  attributes: Attribute[];
}) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("0");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleSelect(valueId: string) {
    setSelectedValues((prev) => {
      if (prev.includes(valueId)) {
        return prev.filter((id) => id !== valueId);
      }
      return [...prev, valueId];
    });
  }

  async function handleSubmit() {
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/admin/product-variants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_id: productId,
        price: Number(price),
        stock: Number(stock),
        attribute_value_ids: selectedValues,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || "Error");
    } else {
      setMessage("Variant created successfully");
      setSelectedValues([]);
      setPrice("");
      setStock("0");
    }

    setLoading(false);
  }

  return (
    <div className="space-y-6">

      {/* 🔹 Attribute Selector */}
      <div className="border p-4 rounded space-y-4">
        <h2 className="font-semibold">Select Attributes</h2>

        {attributes.map((attr) => (
          <div key={attr.id}>
            <p className="font-medium">{attr.name}</p>
            <div className="flex gap-2 flex-wrap mt-2">
              {attr.values.map((val) => (
                <button
                  key={val.id}
                  type="button"
                  onClick={() => handleSelect(val.id)}
                  className={`px-3 py-1 rounded border ${
                    selectedValues.includes(val.id)
                      ? "bg-black text-white"
                      : "bg-white"
                  }`}
                >
                  {val.value}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 Price + Stock */}
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