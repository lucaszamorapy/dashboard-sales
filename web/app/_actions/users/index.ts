"use client"

import { ILogin } from "@/types";
import { ApiRequisition } from "..";

const req = new ApiRequisition()

export const login = async (credentials: ILogin) => {
  const response = await req.setPayload({
    url: "/user/login",
    content: credentials,
    messageSuccess: `Bem-vindo(a) novamente!, ${credentials.name}`,
    messageError: "Erro ao logar no dashboard",
  }).post();
  return response;
};


