




/*
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

type User = {
  user_id: string;
  avatar_url: string;
  role: string;
};

export default async function AdminUsersPage() {
  const h = await headers();

  const host = h.get('host')!;
  const protocol =
    process.env.NODE_ENV === 'development' ? 'http' : 'https';

  const res = await fetch(`${protocol}://${host}/api/admin/users`, {
    cache: 'no-store',
    headers: {
      cookie: h.get('cookie') ?? '',
    },
  });

  if (res.status === 401) redirect('/login');
  if (res.status === 403) redirect('/403');
  if (!res.ok) throw new Error('Failed to fetch users');

  const users: User[] = await res.json();
*/









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

/*
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/admin/products`,
    {
      cache: "no-store",
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch products")
  }
*/

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
  const products = await getProducts()

  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Products
        </h1>

        <Link
          href="/admin/products/new"
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Create Product
        </Link>
      </div>

      <div className="border rounded overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Slug</th>
              <th className="p-3">Type</th>
              <th className="p-3">Status</th>
              <th className="p-3">Created</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-3 font-medium">
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="hover:underline"
                  >
                    {product.name}
                  </Link>
                </td>

                <td className="p-3 text-gray-600">
                  {product.slug}
                </td>

                <td className="p-3">
                  {product.product_type}
                </td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      product.status === "active"
                        ? "bg-green-100 text-green-700"
                        : product.status === "draft"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>

                <td className="p-3 text-sm text-gray-500">
                  {new Date(product.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            No products found
          </div>
        )}
      </div>
    </div>
  )
}