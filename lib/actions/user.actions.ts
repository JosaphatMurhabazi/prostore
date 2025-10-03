'use server';
import {signInFormSchema, signUpFormSchema} from "@/lib/validations";
import {signIn, signOut} from "@/auth";
import {isRedirectError} from "next/dist/client/components/redirect-error";
import {hashSync} from "bcrypt-ts-edge";
import {prisma} from "@/db/prisma";
import {formatError} from "@/lib/utils";

// sign in the user with credentials
export async function signInWithCredentials(prevState: unknown, formData: FormData) {
    try {
        const user = signInFormSchema.parse({
            email: formData.get('email'),
            password: formData.get('password'),
        })

        await signIn('credentials', user)

        return {success: true, message: 'Sign In Successfully'}
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }

        return {success: false, message: formatError(error)};
    }
}

// Sign user out
export async function signOutUser() {
    await signOut();
}

// Sign up user
export async function signUpUser(prevState: unknown, formData: FormData) {
    try {
        const {name, email, password} = signUpFormSchema.parse({
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword'),
        });
        const hashedPassword = hashSync(password, 10);
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            }
        })
        await signIn('credentials', {
            email,
            password,
        });
        return {success: true, message: 'User registered Successfully'}
    } catch (error) {
        if (isRedirectError(error)) {
            throw error;
        }
        return {success: false, message: formatError(error)};
    }
}

// Get user by the ID
export async function getUserById(userId:string) {
    const user = await prisma.user.findFirst({where: {id: userId}});
    if (!user) throw new Error('User not found');
    return user;
}