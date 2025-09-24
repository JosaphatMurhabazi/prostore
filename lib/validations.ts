import {z} from 'zod';
import {formatNumberWithDecimal} from "@/lib/utils";

const currency =z.string().refine((value)=>/^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),'Price must have' +
    ' exactly tow decimal places');

export const insertProductSchema = z.object({
    name: z.string().min(3,'Name must be at least 3 characters'),
    slug: z.string().min(3,'Name must be at least 3 characters'),
    category: z.string().min(3,'Name must be at least 3 characters'),
    brand: z.string().min(3,'Name must be at least 3 characters'),
    description: z.string().min(3,'Name must be at least 3 characters'),
    stock: z.coerce.number(),
    images: z.array(z.string()).min(1,'Product must have at least on image'),
    isFeatured: z.boolean(),
    banner:z.string().nullable(),
    price:currency,
})

// Schema for signing users in
export const signInFormSchema = z.object({
    email: z.email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})