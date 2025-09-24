'use client'

import {Label} from "@/components/ui/label"
import {Input} from "@/components/ui/input";
import {signInDefaultValues} from "@/lib/constants";
import {Button} from "@/components/ui/button";
import Link from "next/link";

const CredentialsSignInForm = () => {
    return (
        <form>
            <div className='space-y-6'>
                <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input type="email" id="email" name="email" required placeholder='Email' autoComplete='off'
                           defaultValue={signInDefaultValues.email}/>
                </div>
                <div>
                    <Label htmlFor="email">Password</Label>
                    <Input type="password" id="password" autoComplete='off' name="password" required
                           placeholder='Password' defaultValue={signInDefaultValues.password}/>
                </div>
                <div>
                    <Button className='w-full' variant='default'>
                        Sign In
                    </Button>
                </div>
                <div className="text-sm text-center text-muted-foreground">
                    Don&apos;t have an account yet?{' '}
                    <Link href="/sign-up" target='_self' className='link' >Sign Up</Link>
                </div>
            </div>

        </form>
    )
}
export default CredentialsSignInForm
