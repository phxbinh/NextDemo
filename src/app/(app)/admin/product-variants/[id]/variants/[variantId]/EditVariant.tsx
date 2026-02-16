"use client";

import { useEffect, useState } from "react";

type Attribute = {
  id: string;
  code: string;
  name: string;
  type: string;
  values: { id: string; value: string }[];
};

type VariantData = {
  id: string;
  sku: string;
  title: string;
  price: number;
  stock: number;
  attribute_value_ids: string[];
};

export default function VariantForm({
  productId,
  attributes,
  variant, // 👈 nếu có -> edit mode
}: {
  productId: string;
  attributes: Attribute[];
  variant?: VariantData;
}) {
  const isEdit = !!variant;

  const [selected, setSelected] = useState<Record<string, string>>({});
  const [sku, setSku] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("0");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🔥 preload khi edit
  useEffect(() => {
    if (!variant) return;

    setSku(variant.sku || "");
    setTitle(variant.title || "");
    setPrice(String(variant.price ?? ""));
    setStock(String(variant.stock ?? "0"));

    const map: Record<string, string> = {};

    attributes.forEach((attr) => {
      const found = attr.values.find((v) =>
        variant.attribute_value_ids.includes(v.id)
      );
      if (found) map[attr.id] = found.id;
    });

    setSelected(map);
  }, [variant, attributes]);

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
      setMessage("Bạn phải chọn đầy đủ thuộc tính");
      setLoading(false);
      return;
    }

    const payload = {
      product_id: productId,
      sku,
      title,
      price: Number(price),
      stock: Number(stock),
      attribute_value_ids,
    };

    const res = await fetch(
      isEdit
        ? `/api/admin/product-variants/${variant!.id}`
        : "/api/admin/product-variants",
      {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.error || "Lỗi xử lý variant");
    } else {
      setMessage(
        isEdit ? "Cập nhật thành công!" : "Variant đã tạo thành công!"
      );
    }

    setLoading(false);
  }

  return (
    <div className="space-y-6">
      {/* Attributes */}
      <div className="border p-4 rounded space-y-4">
        <h2 className="font-semibold">Thuộc tính</h2>

        {attributes.map((attr) => (
          <div key={attr.id}>
            <label className="block mb-2 font-medium">{attr.name}</label>
            <select
              value={selected[attr.id] || ""}
              onChange={(e) => handleSelect(attr.id, e.target.value)}
              className="border px-3 py-2 w-full rounded"
            >
              <option value="">Chọn {attr.name}</option>
              {attr.values.map((val) => (
                <option key={val.id} value={val.id}>
                  {val.value}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {/* Info */}
      <div className="border p-4 rounded space-y-4">
        <h2 className="font-semibold">
          {isEdit ? "Chỉnh sửa variant" : "Tạo variant"}
        </h2>

        <input
          type="text"
          placeholder="SKU"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
          className="border px-3 py-2 w-full rounded"
        />

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-3 py-2 w-full rounded"
        />

        <input
          type="number"
          placeholder="Giá"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border px-3 py-2 w-full rounded"
        />

        <input
          type="number"
          placeholder="Tồn kho"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="border px-3 py-2 w-full rounded"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded"
        >
          {loading
            ? "Đang xử lý..."
            : isEdit
            ? "Cập nhật"
            : "Tạo Variant"}
        </button>

        {message && (
          <p className="text-sm mt-2">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}