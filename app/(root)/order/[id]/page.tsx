import {Metadata} from "next";
import {getOrderById} from "@/lib/actions/order.actions";
import {notFound} from "next/navigation";
import OrderDetailsTable from "./order-details-table";
import {OrderItem, ShippingAddress} from "@/types";

export const metadata: Metadata = {
    title: "Order Details",
}

interface Props {
    params: Promise<{
        id: string
    }>
}

const OrderDetailsPage = async ({params}: Props) => {
    const {id} = await params;

    const order = await getOrderById(id);
    if (!order) notFound();

    const formattedOrderItems = order.orderitems.map(item => ({
        ...item,
        price: item.price.toString(),
    }));

    return (
        <OrderDetailsTable order={{
            ...order,
            orderitems:formattedOrderItems,
            itemsPrice: order.itemsPrice.toString(),
            shippingPrice: order.shippingPrice.toString(),
            taxPrice: order.taxPrice.toString(),
            totalPrice: order.totalPrice.toString(),
            shippingAddress: order.shippingAddress as ShippingAddress,
        }}/>
    )
}
export default OrderDetailsPage
