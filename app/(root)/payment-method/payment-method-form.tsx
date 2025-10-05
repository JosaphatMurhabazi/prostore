'use client';
import {useRouter} from "next/navigation";
import {toast} from 'sonner'
import {useTransition} from "react";
import {paymentMethodSchema} from "@/lib/validations";
import CheckoutSteps from "@/components/shared/checkout-steps";

import React from 'react'
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {DEFAULT_PAYMENT_METHODS} from "@/lib/constants";

const PaymentMethodForm = ({preferredPaymentMethod}: { preferredPaymentMethod: string | null }) => {
    const router = useRouter();

    const from = useForm<z.infer<typeof paymentMethodSchema>>({
        resolver:zodResolver(paymentMethodSchema),
        defaultValues:{
            type: preferredPaymentMethod || DEFAULT_PAYMENT_METHODS
        }
    })

    const [isPending, startTransition] = useTransition();

    return (
        <>
            <CheckoutSteps current={2}/>
            Form
        </>
    )
}
export default PaymentMethodForm
