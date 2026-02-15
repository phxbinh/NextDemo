import { sql } from "@/lib/neon/sql";
import VariantManager from "./VariantManage";

type ProductRow = {
  id: string;
  product_type_id: string;
};

type Attribute = {
  id: string;
  code: string;
  name: string;
  type: string;
  values: {
    id: string;
    value: string;
  }[];
};

export default async function VariantPage({
  params,
}: {
  params: Promise<{ id: string }>; // ❗ Không cần Promise ở đây
}) {
  const { id } = await params;
  const productId = id;

  // 🔥 1️⃣ Lấy product_type_id
/*
  const productRows = await sql<ProductRow[]>`
    select id, product_type_id
    from products
    where id = ${productId}
    limit 1
  `;
  const product = productRows[0];
*/

const productRows = (await sql`
  select id, product_type_id
  from products
  where id = ${productId}
  limit 1
`) as ProductRow[];






  if (!productRows) {
    return <div className="p-6">Product not found</div>;
  }

  // 🔥 2️⃣ Lấy attributes theo product_type
  const attributes = (await sql`
    select
      a.id,
      a.code,
      a.name,
      a.type,

      coalesce(
        json_agg(
          json_build_object(
            'id', av.id,
            'value', av.value
          )
          order by av.sort_order asc
        ) filter (where av.id is not null),
        '[]'
      ) as values

    from product_type_attributes pta
    join attributes a
      on a.id = pta.attribute_id
    left join attribute_values av
      on av.attribute_id = a.id

    where pta.product_type_id = ${product.product_type_id}

    group by a.id
    order by a.name asc
  `) as Attribute[];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Manage Variants
      </h1>

      <VariantManager
        productId={productId}
        attributes={attributes}
      />
    </div>
  );
}







/*
export default async function VariantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = id;

  // 🔥 1️⃣ Lấy product_type_id của product
  const productRows = await sql`
    select id, product_type_id
    from products
    where id = ${productId}
    limit 1
  `;

  const product = productRows[0];

  if (!product) {
    return <div className="p-6">Product not found</div>;
  }

  // 🔥 2️⃣ Lấy attributes theo product_type
  const attributes = await sql`
    select
      a.id,
      a.code,
      a.name,
      a.type,

      json_agg(
        json_build_object(
          'id', av.id,
          'value', av.value
        )
        order by av.sort_order asc
      ) as values

    from product_type_attributes pta
    join attributes a
      on a.id = pta.attribute_id
    left join attribute_values av
      on av.attribute_id = a.id

    where pta.product_type_id = ${product.product_type_id}

    group by a.id
    order by a.name asc
  `;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Manage Variants
      </h1>

      <VariantManager
        productId={productId}
        attributes={attributes}
      />
    </div>
  );
}
*/






/*
export default async function VariantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const productId = id;

  // 🔥 Load attributes + values
  const attributes = await sql`
    select
      a.id,
      a.name,
      json_agg(
        json_build_object(
          'id', av.id,
          'value', av.value
        )
        order by av.sort_order asc
      ) as values
    from attributes a
    left join attribute_values av
      on av.attribute_id = a.id
    group by a.id
    order by a.sort_order asc
  `;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Manage Variants
      </h1>

      <VariantManager
        productId={productId}
        attributes={attributes}
      />
    </div>
  );
}

*/