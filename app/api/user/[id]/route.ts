import { NextRequest } from "next/server";
import  prisma  from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const body = await req.json();
    const { name, email, profileImage, password } = body;

    let hashedPassword = undefined;

    if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                name,
                email,
                profileImage,
                ...(password && { password: hashedPassword }),
            },
        });

        return new Response(JSON.stringify(updatedUser), { status: 200 });
    } catch (error) {
        console.error("Erreur lors de la mise à jour :", error);
        return new Response("Erreur lors de la mise à jour", { status: 500 });
    }
}


/*import bcrypt from "bcryptjs";
import  prisma  from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const body = await req.json();
    const { name, email, profileImage, password } = body;

    let hashedPassword = undefined;

    if (password) {
        // Hachage du mot de passe AVANT de l'enregistrer
        hashedPassword = await bcrypt.hash(password, 10);
    }

    try {
        const updatedUser = await prisma.user.update({
            where: { id: params.id },
            data: {
                name,
                email,
                profileImage,
                ...(password && { password: hashedPassword }), // mise à jour seulement si modifié
            },
        });

        return new Response(JSON.stringify(updatedUser), { status: 200 });
    } catch (error) {
        return new Response("Erreur lors de la mise à jour", { status: 500 });
    }
}

*/