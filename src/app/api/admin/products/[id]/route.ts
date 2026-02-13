
/*
import { NextResponse } from "next/server";
import { sql } from '../../../../../lib/neon/sql';
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {

    const result = await sql`
      select *
      from products
      where id = ${params.id}
      limit 1
    `

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(result[0])
  } catch (err) {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403 }
    )
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {

    const body = await req.json()

    const {
      name,
      slug,
      product_type,
      short_description,
      description,
      status
    } = body

    const result = await sql`
      update products
      set
        name = ${name},
        slug = lower(${slug}),
        product_type = ${product_type},
        short_description = ${short_description},
        description = ${description},
        status = ${status}
      where id = ${params.id}
      returning *
    `

    return NextResponse.json(result[0])
  } catch (err) {
    return NextResponse.json(
      { error: "Update failed" },
      { status: 400 }
    )
  }
}
*/

import { NextResponse } from "next/server"
import { sql } from "@/lib/neon/sql"
//import { assertAdmin } from "@/lib/auth/assertAdmin"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    //await assertAdmin()

    const result = await sql`
      select *
      from products
      where id = ${params.id}
      limit 1
    `

    if (result.length === 0) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(result[0])
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    //await assertAdmin()

    const body = await req.json()

    const {
      name,
      slug,
      product_type,
      short_description,
      description,
      status
    } = body

    if (!name || !slug || !status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const result = await sql`
      update products
      set
        name = ${name},
        slug = lower(${slug}),
        product_type = ${product_type},
        short_description = ${short_description},
        description = ${description},
        status = ${status}
      where id = ${params.id}
      returning *
    `

    return NextResponse.json(result[0])
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: "Update failed" },
      { status: 500 }
    )
  }
}




