"use client"

import { IProduct } from "@/app/types";
import { ApiRequisition } from "..";

const req = new ApiRequisition()

export const getAllProducts = async () => {
  const response = await req.setPayload({
    url: "/products",
    message: true,
  }).get();
  return response;
};

export const getProduct = async (id: number) => {
  const response = await req.setPayload({
    url: `/products/${id}`,
    message: true,
  }).get();
  return response;
};

export const upsertProduct = async (product: IProduct) => {
  let response;
  if (product.product_id) {
    response = await req.setPayload({
      url: "/products",
      content: product,
      message: true,
      messageError: "Ocorreu um erro ao alterar o produto"
    }).put();
  } else {
    response = await req.setPayload({
      url: "/products",
      content: product,
      message: true,
      messageError: "Ocorreu um erro ao cadastrar o produto"
    }).post();
  }
  return response;
}