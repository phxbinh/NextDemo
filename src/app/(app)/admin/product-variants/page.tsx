import Link from "next/link";

async function getProducts() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/products`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Failed to fetch products");

  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Code</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p: any) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="p-2 border">
                <Link
                  href={`/admin/products/${p.id}/variants`}
                  className="text-blue-600 hover:underline"
                >
                  {p.name}
                </Link>
              </td>
              <td className="p-2 border">{p.code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}