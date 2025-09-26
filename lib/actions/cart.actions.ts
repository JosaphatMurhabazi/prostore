'use server';
import {CartItem} from "@/types";
import {cookies} from "next/headers";
import {convertToPlainObject, formatError} from "@/lib/utils";
import {auth} from "@/auth";
import {prisma} from "@/db/prisma";
import {cartItemSchema} from "@/lib/validations";

export async function addItemToCart(data: CartItem) {
    try {
        // Check for cart cookie
        const sessionCartId = (await cookies()).get('sessionCartId')?.value;
        if (!sessionCartId) throw new Error('No session cart found');

        // Get session and user id
        const session = await auth();
        const userId = session?.user?.id ? (session.user.id as string) : undefined;

        // Get Cart
        const cart = await getMyCart();

        // Parse and validate item
        const item = cartItemSchema.parse(data);

        // Find product in database
        const product = await prisma.product.findFirst({where: {id: item.productId}});

        // Testing
        console.log({
            'Session Cart Id': sessionCartId,
            'User Id': userId,
            'Item Request':item,
            'Product found': product,
        });

        return {
            success: true,
            message: 'Item added to cart',
        }
    } catch (err) {
        return {
            success: false,
            message: formatError(err),
        }
    }

}

export async function getMyCart() {
    // Check for cart cookie
    const sessionCartId = (await cookies()).get('sessionCartId')?.value;
    if (!sessionCartId) throw new Error('No session cart found');

    // Get session and user id
    const session = await auth();
    const userId = session?.user?.id ? (session.user.id as string) : undefined;

    // Get user cart from database
    const cart = await prisma.cart.findFirst({
        where: userId ? {userId: userId} : {sessionCartId: sessionCartId}
    });

    if (!cart) return undefined;

    // Convert decimals and return
    return convertToPlainObject({
        ...cart,
        items: cart.items as CartItem[],
        itemsPrice: cart.itemsPrice.toString(),
        totalPrice: cart.totalPrice.toString(),
        shippingPrice: cart.shippingPrice.toString(),
        taxPrice: cart.taxPrice.toString(),
    })

}