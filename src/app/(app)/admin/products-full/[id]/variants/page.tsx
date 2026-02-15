import { sql } from "@/lib/neon/sql";
import VariantManager from "./VariantManager";

export default async function VariantPage({
  params,
}: {
  params: { id: string };
}) {
  const productId = params.id;

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