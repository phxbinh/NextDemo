import { NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/neon/sql"

/*
type Params = {
  params: {
    id: string
  }
}

// PUT: update product type
export async function PUT(
  req: NextRequest,
  { params }: Params
) {
  try {
    const { id } = params
    const body = await req.json()
    let { code, name } = body

    if (!code || !name) {
      return NextResponse.json(
        { error: "Code and name are required" },
        { status: 400 }
      )
    }

    code = code.toLowerCase().trim()

    const isValid = /^[a-z0-9_-]+$/.test(code)
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid code format" },
        { status: 400 }
      )
    }

    // check duplicate (exclude current id)
    const existing = await sql`
      select id from product_types 
      where code = ${code} and id != ${id}
    `
    if (existing.length > 0) {
      return NextResponse.json(
        { error: "Code already exists" },
        { status: 400 }
      )
    }

    const result = await sql`
      update product_types
      set code = ${code},
          name = ${name}
      where id = ${id}
      returning id, code, name, created_at
    `

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Product type not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("PUT product_types error:", error)
    return NextResponse.json(
      { error: "Failed to update product type" },
      { status: 500 }
    )
  }
}

// DELETE: safe delete
export async function DELETE(
  _req: NextRequest,
  { params }: Params
) {
  try {
    const { id } = params

    // check products using it
    const productCount = await sql`
      select count(*)::int as count
      from products
      where product_type_id = ${id}
    `

    if (productCount[0].count > 0) {
      return NextResponse.json(
        { error: "Cannot delete: product type is in use" },
        { status: 400 }
      )
    }

    // check attribute mapping
    const mappingCount = await sql`
      select count(*)::int as count
      from product_type_attributes
      where product_type_id = ${id}
    `

    if (mappingCount[0].count > 0) {
      return NextResponse.json(
        { error: "Cannot delete: attributes are assigned" },
        { status: 400 }
      )
    }

    const result = await sql`
      delete from product_types
      where id = ${id}
      returning id
    `

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Product type not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("DELETE product_types error:", error)
    return NextResponse.json(
      { error: "Failed to delete product type" },
      { status: 500 }
    )
  }
}
*/




// PUT
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await req.json()
    let { code, name } = body

    if (!code || !name) {
      return NextResponse.json(
        { error: "Code and name are required" },
        { status: 400 }
      )
    }

    code = code.toLowerCase().trim()

    const isValid = /^[a-z0-9_-]+$/.test(code)
    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid code format" },
        { status: 400 }
      )
    }

    const existing = await sql`
      select id from product_types
      where code = ${code} and id != ${id}
    `
    if (existing.length > 0) {
      return NextResponse.json(
        { error: "Code already exists" },
        { status: 400 }
      )
    }

    const result = await sql`
      update product_types
      set code = ${code},
          name = ${name}
      where id = ${id}
      returning id, code, name, created_at
    `

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Product type not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(result[0])
  } catch (error) {
    console.error("PUT product_types error:", error)
    return NextResponse.json(
      { error: "Failed to update product type" },
      { status: 500 }
    )
  }
}

// DELETE
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const productCount = await sql`
      select count(*)::int as count
      from products
      where product_type_id = ${id}
    `

    if (productCount[0].count > 0) {
      return NextResponse.json(
        { error: "Cannot delete: product type is in use" },
        { status: 400 }
      )
    }

    const mappingCount = await sql`
      select count(*)::int as count
      from product_type_attributes
      where product_type_id = ${id}
    `

    if (mappingCount[0].count > 0) {
      return NextResponse.json(
        { error: "Cannot delete: attributes are assigned" },
        { status: 400 }
      )
    }

    const result = await sql`
      delete from product_types
      where id = ${id}
      returning id
    `

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Product type not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("DELETE product_types error:", error)
    return NextResponse.json(
      { error: "Failed to delete product type" },
      { status: 500 }
    )
  }
}













