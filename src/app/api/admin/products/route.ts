import { NextResponse } from "next/server"
import { sql } from '../../../../lib/neon/sql';
//import { neon } from "@neondatabase/serverless"
import slugify from "slugify"

//const sql = neon(process.env.DATABASE_URL!)

export async function POST(req: Request) {
  try {
    // TODO: check session + role admin ở đây

    const body = await req.json()

    const {
      name,
      slug,
      product_type = "default",
      short_description,
      description
    } = body

    if (!name || !slug) {
      return NextResponse.json(
        { error: "Name and slug are required" },
        { status: 400 }
      )
    }

    const normalizedSlug = slugify(slug, { lower: true, strict: true })

    const result = await sql`
      insert into products (
        name,
        slug,
        product_type,
        short_description,
        description
      )
      values (
        ${name},
        ${normalizedSlug},
        ${product_type},
        ${short_description ?? null},
        ${description ?? null}
      )
      returning id;
    `

    return NextResponse.json({ id: result[0].id })
  } catch (err: any) {
    console.error(err)

    if (err.message?.includes("idx_products_slug_ci")) {
      return NextResponse.json(
        { error: "Slug already exists" },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}