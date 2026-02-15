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