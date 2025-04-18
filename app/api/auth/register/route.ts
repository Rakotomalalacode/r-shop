import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; 
import bcrypt from 'bcryptjs'; 

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();


  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Tous les champs sont requis.' }, { status: 400 });
  }

  try {

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return NextResponse.json({ error: 'Cet email est déjà pris.' }, { status: 400 });
    }


    const hashedPassword = await bcrypt.hash(password, 12);


    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json({ message: 'Inscription réussie', user: newUser }, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de l\'inscription:', error);
    return NextResponse.json({ error: 'Erreur lors de l\'inscription.' }, { status: 500 });
  }
}
