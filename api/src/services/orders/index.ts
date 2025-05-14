import { Op } from "sequelize";
import { Message } from "../../class/message";
import { Order } from "../../models/orders";
import { VwOrder } from "../../models/orders/views";
import { IFilterOrder, IOrder } from "../../types";


export const getAllOrders = async () => {
  try {
    const orders = await VwOrder.findAll()
    return new Message(orders, `Total de ${orders.length} pedido(s) encontrado(s)`);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const getOrder = async (id: number) => {
  try {
    const order = await VwOrder.findOne({ where: { order_id: id } })
    return new Message(order, `Pedido do cliente ${order?.client_name} encontrado`);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const filterOrder = async (data: IFilterOrder) => {
  try {
    let where = {} as any;
    const init = new Date(data.init_date + 'T00:00:00Z')
    const final = new Date(data.final_date + 'T23:59:59Z')
    if (final < init) {
      throw new Error("Data de início não pode ser maior que a data final");
    }
    if (data.init_date && data.final_date) {
      where.delivery_date = {
        [Op.between]: [init, final]
      }
    } else if (data.init_date) {
      where.delivery_date = { [Op.gte]: init };
    } else if (data.final_date) {
      where.delivery_date = { [Op.lte]: final };
    }
    return await VwOrder.findAll({
      where // equivale a: where: { delivery_date: ... }
    });
  }
  catch (error: any) {
    throw new Error(error.message);
  }
}

export const createOrder = async (data: IOrder) => {
  try {
    const order = await Order.create(data)
    return new Message(order, `Pedido criado com sucesso!`);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const updateOrder = async (data: IOrder) => {
  try {
    await Order.update(data, { where: { order_id: data.order_id } })
    return new Message(data, `Pedido atualizado com sucesso!`);
  } catch (error: any) {
    throw new Error(error.message);
  }
}