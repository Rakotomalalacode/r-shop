import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { prix, name, description, image, Category } = body

    if (!prix || !name || !description || !image || !Category) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const product = await prisma.product.create({
      data: {
        prix,
        name,
        description,
        category: {
          connectOrCreate: {
            where: { name: Category },
            create: { name: Category }
          }
        },
        images: {
          create: image.map((url: string) => ({ url }))
        }
      },
      include: {
        images: true,
        category: true
      }
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}


export async function GET() {
    try {
      const products = await prisma.product.findMany({
        include: {
          images: true,
          category: true,
        },
      })
      return NextResponse.json(products)
    } catch (error) {
      console.error(error)
      return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
    }
  }
  