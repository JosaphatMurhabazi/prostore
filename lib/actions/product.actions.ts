import {prisma} from "@/prisma/client";
import {convertToPlainObject} from "@/lib/utils";
import {LATEST_PRODUCTS_LIMIT} from "@/lib/constants";

export async function getLatestProducts(){
    const products = await prisma.product.findMany({take: LATEST_PRODUCTS_LIMIT, orderBy: {createdAt: 'desc'}});
    return convertToPlainObject(products);
}
