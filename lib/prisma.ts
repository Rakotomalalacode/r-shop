// /lib/prisma.ts

import { PrismaClient } from '@prisma/client';

// Déclaration globale pour éviter la duplication de Prisma Client en dev
declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

// Assure-toi qu'en mode développement, tu ne crées qu'une seule instance de PrismaClient
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;  // Export par défaut
