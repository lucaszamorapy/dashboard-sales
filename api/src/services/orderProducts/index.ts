import { Message } from "../../class/message";
import { OrderProducts } from "../../models/orderProducts";
import { IOrderProduct } from "../../types";

export const createOrderProduct = async (data: IOrderProduct) => {
  try {
    const orderProduct = await OrderProducts.create(data)
    return new Message(orderProduct, `Produtos anotados com sucesso!`);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const updateOrderProduct = async (data: IOrderProduct) => {
  try {
    await OrderProducts.update(data, { where: { order_product_id: data.order_product_id } })
    return new Message(data, `Produtos do pedido atualizado com sucesso!`);
  } catch (error: any) {
    throw new Error(error.message);
  }
}