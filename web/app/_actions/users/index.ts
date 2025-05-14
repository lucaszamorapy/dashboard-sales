"use client"

import { ILogin } from "@/app/types";
import { ApiRequisition } from "..";

const req = new ApiRequisition()

export const login = async (credentials: ILogin) => {
  const response = await req.setPayload({
    url: "/user/login",
    content: credentials,
    message: true,
  }).post();
  return response;
};

export const validToken = async (data: unknown) => {
  const response = await req.setPayload({
    url: "/user/token",
    content: data,
    message: false,
    messageError: "Token expirado",
  }).post();
  return response;
}

