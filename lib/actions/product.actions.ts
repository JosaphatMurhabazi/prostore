import {prisma} from "@/db/prisma";
import {convertToPlainObject} from "@/lib/utils";
import {LATEST_PRODUCTS_LIMIT} from "@/lib/constants";

export async function getLatestProducts(){
    const products = await prisma.product.findMany({take: LATEST_PRODUCTS_LIMIT, orderBy: {createdAt: 'desc'}});
    return convertToPlainObject(products);
}

export async function getProductBySlug(slug:string){
    return prisma.product.findUnique({where: {slug: slug}});
}
