/* eslint-disable @typescript-eslint/no-explicit-any */
import { IOrder, IProduct } from "@/app/types";

export const paymentMethods = ["Cartão", "Dinheiro", "Pix"]

export const transformedDefaultValues = (order?: IOrder | any, product?: IProduct) => {
  let defaultValues = {}
  if (order && order.order_products) {
    defaultValues = {
      client_id: order.client_id,
      order_products: order.order_products.map((op: any) => ({
        order_product_id: op.order_product_id,
        order_id: op.order_id,
        product_id: op.product?.product_id ?? 0,
        quantity: op.quantity,
        product: op.product,
      })),
      total: order.total,
      payment_method: order.payment_method,
      delivery_date:
        order.delivery_date instanceof Date
          ? order.delivery_date
          : new Date(order.delivery_date),
      delivery_time: order.delivery_time ?? "",
      obs: order.obs ?? null,
    };
  } else {
    defaultValues = {
      client_id: 1,
      order_products: [
        {
          product_id: product?.product_id,
          quantity: 1,
          product: product,
        },
      ],
      total: 0,
      payment_method: "Pix",
      delivery_date: new Date(),
      delivery_time: "",
      obs: null,
    }
  }
  return defaultValues
}