"use client"

import { ApiRequisition } from "..";

const req = new ApiRequisition()

export const getAllProducts = async () => {
  const response = await req.setPayload({
    url: "/products",
    message: true,
  }).get();
  return response;
};