import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';


export async function POST(req: NextRequest) {
    const { type, name, prix, description } = await req.json();

    if (!type || !name || !prix || !description) {
        return NextResponse.json({ error: 'Tous les champs sont requis.' }, { status: 400 });
    }

    try {

        const productExists = await prisma.product.findUnique({
            where: { name },
        });

        if (productExists) {
            return NextResponse.json({ error: 'Cet Produit est déjà pris.' }, { status: 400 });
        }

        const newUser = await prisma.product.create({
            data: {
                type,
                name,
                prix,
                description
            },
        })

        return NextResponse.json({ message: 'Inscription réussie', product: newUser }, { status: 201 });
    } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        return NextResponse.json({ error: 'Erreur lors l\'inscription.' }, { status: 500 });
    }
}



/*import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    const { type, name, prix, description} = await req.json();

    if (!type || !name || !prix || !description) {
        return NextResponse.json({ error: 'Tous les champs sont requis....' }, { status: 400 });
    }

    try {
        const newProduct = await prisma.product.create({
            data: {
                type,
                name,
                prix,
                description
            },
        });
        return NextResponse.json({ message: 'Produit bien ajoute', product: newProduct }, { status: 201 });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du produit', error);
        return NextResponse.json({ error: 'Erreur lors de l\'ajout du produit' }, { status: 201 });
    }
}
*/
/*import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs'; 

export async function POST(req: NextRequest) {
    const { type, name, prix, description, oneImage, towImage, threeImage } = await req.json();

    if (!type || !name || !prix || !description || !oneImage || !towImage || !threeImage) {
        return NextResponse.json({ error: 'Tous les champs sont requis.' }, { status: 400 });
    }

    try {
        const productExists = await prisma.product.findUnique({
            where: { name },
        });

        if (productExists) {
            return NextResponse.json({ error: 'Cet procuit est déjà pris.' }, { status: 400 });
        }

        const newProduct = await prisma.product.create({
            data: {
                type,
                name,
                prix,
                description,
                oneImage,
                towImage,
                threeImage
            },
        });

        return NextResponse.json({ message: 'publication de produit réussie', product: newProduct }, { status: 201 });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du produit', error);
        return NextResponse.json({ error: 'Erreur lors de l\'ajout du produit' }, { status: 500 });
    }
}*/