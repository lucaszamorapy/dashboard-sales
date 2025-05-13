import { Message } from "../../class/message";
import { Product } from "../../models/products";
import { IProduct } from "../../types";

export const getAllProducts = async () => {
  try {
    const products = await Product.findAll()
    return new Message(products, `Total de ${products.length} produto(s) encontrado(s)`);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const getProduct = async (id: number) => {
  try {
    const product = await Product.findOne({ where: { product_id: id } })
    return new Message(product, `Produto ${product?.name} encontrado`);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const createProduct = async (data: IProduct) => {
  try {
    const product = await Product.create(data)
    return new Message(product, `Produto ${product.name} criado com sucesso!`);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const updateProduct = async (data: IProduct) => {
  try {
    await Product.update(data, { where: { product_id: data.product_id } })
    return new Message(data, `Produto ${data.name} atualizado com sucesso!`);
  } catch (error: any) {
    throw new Error(error.message);
  }
}