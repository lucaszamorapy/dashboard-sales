import { Op } from "sequelize";
import { Message } from "../../class/message";
import { Order } from "../../models/orders";
import { IFilterOrder, IOrder } from "../../types";
import { OrderProducts } from "../../models/orderProducts";
import { Product } from "../../models/products";
import { Client } from "../../models/clients";

export const getAllOrders = async () => {
  //as model sao como propriedades do objeto, por exemplo OrderProducts: {}
  //os alias tem que seguir na ordem, por exemplo order_products vem de Order, enquanto product vem do OrderProducts
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: OrderProducts,
          as: "order_products",
          attributes: { exclude: ['product_id', 'regidh', 'regiusu', 'regadh', 'regausu'] },
          include: [
            {
              model: Product,
              as: "product",
              attributes: { exclude: ['regidh', 'regiusu', 'regadh', 'regausu'] },
            }
          ],
        },
        {
          model: Client,
          as: "client",
          attributes: { exclude: ['cep', 'regidh', 'regiusu', 'regadh', 'regausu'] },
        },
      ],
    })
    return new Message(orders, `Total de ${orders.length} pedido(s) encontrado(s)`);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const getOrder = async (id: number) => {
  try {
    const order = await Order.findOne({
      where: { order_id: id },
      include: [
        {
          model: OrderProducts,
          as: "order_products",
          attributes: { exclude: ['product_id', 'regidh', 'regiusu', 'regadh', 'regausu'] },
          include: [
            {
              model: Product,
              as: "product",
              attributes: { exclude: ['regidh', 'regiusu', 'regadh', 'regausu'] },
            }
          ],
        },
        {
          model: Client,
          as: "client",
          attributes: { exclude: ['cep', 'regidh', 'regiusu', 'regadh', 'regausu'] },
        },
      ],
    })
    return new Message(order, `Pedido do cliente encontrado`);
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
    return await Order.findAll({
      where,
      include: [
        {
          model: OrderProducts,
          as: "order_products",
          attributes: { exclude: ['product_id', 'regidh', 'regiusu', 'regadh', 'regausu'] },
          include: [
            {
              model: Product,
              as: "product",
              attributes: { exclude: ['regidh', 'regiusu', 'regadh', 'regausu'] },
            }
          ],
        },
        {
          model: Client,
          as: "client",
          attributes: { exclude: ['cep', 'regidh', 'regiusu', 'regadh', 'regausu'] },
        },
      ]
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