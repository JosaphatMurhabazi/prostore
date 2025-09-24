import {prisma} from "@/db/prisma";
import {convertToPlainObject} from "@/lib/utils";
import {LATEST_PRODUCTS_LIMIT} from "@/lib/constants";
import Decimal from "decimal.js";

export async function getLatestProducts(){
    const products = await prisma.product.findMany({take: LATEST_PRODUCTS_LIMIT, orderBy: {createdAt: 'desc'}});

    const formattedProducts = products.map(product => ({
        ...product,
        price: new Decimal(product.price).toString(),
        rating: new Decimal(product.rating).toString(),
    }));

    return convertToPlainObject(formattedProducts);
}

export async function getProductBySlug(slug:string){
    return prisma.product.findUnique({where: {slug: slug}});
}
