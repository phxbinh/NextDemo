import { NextResponse } from "next/server";
import { sql } from "@/lib/neon/sql";

export async function POST(req: Request) {
  const body = await req.json();

  const {
    product_id,
    sku,
    title,
    price,
    compare_at_price = null,
    stock = 0,
    allow_backorder = false,
    is_active = true,
    attribute_value_ids,
  } = body;

  if (!product_id || !price || !attribute_value_ids?.length) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // 🔥 1️⃣ Build deterministic combination key
  const combination_key = [...new Set(attribute_value_ids)]
    .sort()
    .join(".");

  try {
    const result = await sql.begin(async (tx) => {
      // 2️⃣ Insert variant
      const variantRows = await tx`
        insert into product_variants (
          product_id,
          sku,
          title,
          price,
          compare_at_price,
          stock,
          allow_backorder,
          is_active,
          combination_key
        )
        values (
          ${product_id},
          ${sku ?? null},
          ${title ?? null},
          ${price},
          ${compare_at_price},
          ${stock},
          ${allow_backorder},
          ${is_active},
          ${combination_key}
        )
        returning *
      `;

      const variant = variantRows[0];

      // 3️⃣ Insert mapping table
      for (const valueId of attribute_value_ids) {
        await tx`
          insert into variant_attribute_values (
            variant_id,
            attribute_value_id
          )
          values (
            ${variant.id},
            ${valueId}
          )
        `;
      }

      return variant;
    });

    return NextResponse.json(result);
  } catch (err: any) {
    // 🔥 Unique combination conflict
    if (err.code === "23505") {
      return NextResponse.json(
        { error: "Duplicate variant combination" },
        { status: 409 }
      );
    }

    console.error(err);

    return NextResponse.json(
      { error: "Failed to create variant" },
      { status: 500 }
    );
  }
}

//import { NextResponse } from "next/server";
//import { sql } from "@neondatabase/serverless";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("productId");

  if (!productId) {
    return NextResponse.json(
      { error: "productId is required" },
      { status: 400 }
    );
  }

  try {
    const rows = await sql`
      select
        v.id,
        v.sku,
        v.title,
        v.price,
        v.compare_at_price,
        v.stock,
        v.allow_backorder,
        v.is_active,
        v.created_at,
        v.updated_at,

        coalesce(
          json_agg(
            json_build_object(
              'attribute_name', a.name,
              'value', av.value
            )
          ) filter (where av.id is not null),
          '[]'
        ) as raw_attributes

      from product_variants v
      left join variant_attribute_values vav
        on vav.variant_id = v.id
      left join attribute_values av
        on av.id = vav.attribute_value_id
      left join attributes a
        on a.id = av.attribute_id

      where v.product_id = ${productId}

      group by v.id
      order by v.created_at asc
    `;

    // 🔥 reshape
    const result = rows.map((row) => {
      const attributesObject: Record<string, string> = {};

      for (const attr of row.raw_attributes) {
        attributesObject[attr.attribute_name] = attr.value;
      }

      return {
        ...row,
        attributes: attributesObject,
      };
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to fetch variants" },
      { status: 500 }
    );
  }
}









