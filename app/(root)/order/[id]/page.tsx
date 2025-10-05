import {Metadata} from "next";
import {getOrderById} from "@/lib/actions/order.actions";
import {notFound} from "next/navigation";

export const metadata:Metadata={
    title: "Order Details",
}

interface Props{
    params:Promise<{
        id:string
    }>
}

const OrderDetailsPage =async ({params}:Props) => {
    const {id} = await params;

    const order = await getOrderById(id);
    if(!order) notFound();

    return (
        <div>Details</div>
    )
}
export default OrderDetailsPage
