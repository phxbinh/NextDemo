import { NextResponse } from "next/server";
import { sql } from "@/lib/neon/sql";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ variantId: string }> }
) {
  const {variantId} = await params;

  try {
    const body = await req.json();

    const {
      sku,
      title,
      price,
      compare_at_price = null,
      stock,
      allow_backorder = false,
      is_active = true,
      attribute_value_ids,
    } = body;

    if (!variantId) {
      return NextResponse.json(
        { error: "variantId required" },
        { status: 400 }
      );
    }

    if (!Array.isArray(attribute_value_ids) || attribute_value_ids.length === 0) {
      return NextResponse.json(
        { error: "attribute_value_ids required" },
        { status: 400 }
      );
    }

    const combination_key = [...new Set(attribute_value_ids)]
      .sort()
      .join(".");

    await sql`BEGIN`;

    // 1️⃣ Update variant
    const updated = await sql`
      update product_variants
      set
        sku = ${sku},
        title = ${title},
        price = ${price},
        compare_at_price = ${compare_at_price},
        stock = ${stock},
        allow_backorder = ${allow_backorder},
        is_active = ${is_active},
        combination_key = ${combination_key}
      where id = ${variantId}
      returning *
    `;

    if (!updated.length) {
      await sql`ROLLBACK`;
      return NextResponse.json(
        { error: "Variant not found" },
        { status: 404 }
      );
    }

    // 2️⃣ Xoá mapping cũ
    await sql`
      delete from variant_attribute_values
      where variant_id = ${variantId}
    `;

    // 3️⃣ Insert mapping mới
    for (const valueId of attribute_value_ids) {
      await sql`
        insert into variant_attribute_values (
          variant_id,
          attribute_value_id
        )
        values (${variantId}, ${valueId})
      `;
    }

    await sql`COMMIT`;

    return NextResponse.json(updated[0]);

  } catch (err: any) {
    try {
      await sql`ROLLBACK`;
    } catch {}

    if (err?.code === "23505") {
      return NextResponse.json(
        { error: "Duplicate variant combination or SKU" },
        { status: 409 }
      );
    }

    console.error("Update variant error:", err);

    return NextResponse.json(
      { error: "Failed to update variant" },
      { status: 500 }
    );
  }
}