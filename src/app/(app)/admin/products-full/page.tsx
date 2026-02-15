import Link from "next/link";

async function getProducts() {
  const res = await fetch(
    "http://localhost:3000/api/admin/products",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="p-6 space-y-6">

      <h1 className="text-2xl font-bold">
        Admin Products
      </h1>

      <div className="border rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr className="text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Slug</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Price Range</th>
              <th className="p-3">Variants</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product: any) => (
              <tr
                key={product.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-3 font-medium">
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {product.name}
                  </Link>
                </td>

                <td className="p-3">
                  {product.slug}
                </td>

                <td className="p-3">
                  {product.total_stock}
                </td>

                <td className="p-3">
                  {product.min_price} – {product.max_price}
                </td>

                <td className="p-3">
                  {product.variant_count}
                </td>

                <td className="p-3">
                  {product.is_active ? "Active" : "Draft"}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}