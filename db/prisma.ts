import {neonConfig} from '@neondatabase/serverless';
import {PrismaNeon} from '@prisma/adapter-neon';
import ws from 'ws';
import {PrismaClient, Product} from "@/lib/generated/prisma";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

neonConfig.webSocketConstructor = ws;
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaNeon({ connectionString });

export const prisma =
    globalForPrisma.prisma || new PrismaClient({ adapter }).$extends({
      result: {
        product: {
          price: {
            needs: { price: true },
            compute(product: Product) {
              return product.price.toString();
            },
          },
          rating: {
            needs: { rating: true },
            compute(product:Product) {
              return product.rating.toString();
            },
          },
        },
      },
    });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}