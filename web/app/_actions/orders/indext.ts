import { IOrder, IOrderProduct } from "@/app/types"
import { ApiRequisition } from ".."

const req = new ApiRequisition()

export const getAllOrders = () => {
  const response = req.setPayload({
    url: "/orders",
    message: true,
  }).get()
  return response
}

export const upsertOrders = async (order: IOrder) => {
  let response;
  if (order.order_id) {
    response = await req.setPayload({
      url: "/orders",
      content: order,
      message: true,
      messageError: "Ocorreu um erro ao alterar o pedido"
    }).put();
  } else {
    response = await req.setPayload({
      url: "/orders",
      content: order,
      message: true,
      messageError: "Ocorreu um erro ao cadastrar o pedido"
    }).post();
  }
  return response;
}

export const upsertOrderProducts = async (orderProduct: IOrderProduct) => {
  let response;
  if (orderProduct.order_product_id) {
    response = await req.setPayload({
      url: "/orderProducts",
      content: orderProduct,
      message: true,
      messageError: "Ocorreu um erro ao alterar o pedido"
    }).put();
  } else {
    response = await req.setPayload({
      url: "/orderProducts",
      content: orderProduct,
      message: true,
      messageError: "Ocorreu um erro ao cadastrar o pedido"
    }).post();
  }
  return response;
}