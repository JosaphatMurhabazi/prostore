import {neonConfig} from '@neondatabase/serverless';
import {PrismaNeon} from '@prisma/adapter-neon';
import ws from 'ws';
import {PrismaClient, Product} from "@/lib/generated/prisma";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

neonConfig.webSocketConstructor = ws;
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaNeon({connectionString});

export const prisma =
    globalForPrisma.prisma || new PrismaClient({adapter}).$extends({
        result: {
            product: {
                price: {
                    needs: {price: true},
                    compute(product: Product) {
                        return product.price.toString();
                    },
                },
                rating: {
                    needs: {rating: true},
                    compute(product: Product) {
                        return product.rating.toString();
                    },
                },
            },
            cart: {
                itemsPrice: {
                    needs: {itemsPrice: true},
                    compute(cart) {
                        return cart.itemsPrice.toString();
                    }
                },
                shippingPrice: {
                    needs: {shippingPrice: true},
                    compute(cart) {
                        return cart.shippingPrice.toString();
                    }
                },
                taxPrice: {
                    needs: {taxPrice: true},
                    compute(cart) {
                        return cart.taxPrice.toString();
                    }
                },
                totalPrice: {
                    needs: {totalPrice: true},
                    compute(cart) {
                        return cart.totalPrice.toString();
                    }
                }
            },
            order: {
                itemsPrice: {
                    needs: {itemsPrice: true},
                    compute(cart) {
                        return cart.itemsPrice.toString();
                    }
                },
                shippingPrice: {
                    needs: {shippingPrice: true},
                    compute(cart) {
                        return cart.shippingPrice.toString();
                    }
                },
                taxPrice: {
                    needs: {taxPrice: true},
                    compute(cart) {
                        return cart.taxPrice.toString();
                    }
                },
                totalPrice: {
                    needs: {totalPrice: true},
                    compute(cart) {
                        return cart.totalPrice.toString();
                    }
                }
            },
            orderItem:{
                price:{
                    compute(cart){
                        return cart.price.toString();
                    }
                }
            }
        },
    });

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}