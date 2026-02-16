//src/app/(app)/admin/product-variants/page.tsx
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from "next/link"

interface Product {
  id: string
  name: string
  slug: string
  status: "draft" | "active" | "archived"
  product_type: string
  created_at: string
}

async function getProducts(): Promise<Product[]> {

  const h = await headers();

  const host = h.get('host')!;
  const protocol =
    process.env.NODE_ENV === 'development' ? 'http' : 'https';

  const res = await fetch(`${protocol}://${host}/api/admin/products`, {
    cache: 'no-store',
    headers: {
      cookie: h.get('cookie') ?? '',
    },
  });

  if (res.status === 401) redirect('/login');
  if (res.status === 403) redirect('/403');
  if (!res.ok) throw new Error('Failed to fetch users');

  return res.json()
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