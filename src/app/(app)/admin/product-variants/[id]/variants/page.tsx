import Link from "next/link";
import {DeleteButton} from "@/components/product-variants/DeleteButton";

async function getVariants(productId: string) {
  const res = await fetch(
    `/api/admin/product-variants?productId=${productId}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to fetch variants");

  return res.json();
}

export default async function VariantsPage({
  params,
}: {
  params: { id: string };
}) {
  const variants = await getVariants(params.id);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Product Variants</h1>

        <Link
          href={`/admin/products/${params.id}/variants/new`}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          + Add Variant
        </Link>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">SKU</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Stock</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {variants.map((v: any) => (
            <tr key={v.id}>
              <td className="p-2 border">{v.sku}</td>
              <td className="p-2 border">{v.price}</td>
              <td className="p-2 border">{v.stock}</td>
              <td className="p-2 border space-x-2">
                <Link
                  href={`/admin/products/${params.id}/variants/${v.id}`}
                  className="text-blue-600"
                >
                  Edit
                </Link>

                <DeleteButton variantId={v.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}