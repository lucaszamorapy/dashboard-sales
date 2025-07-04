"use client"

import { IClient } from "@/app/types";
import { ApiRequisition } from "..";

const req = new ApiRequisition()

export const getAllClients = async () => {
  const response = await req.setPayload({
    url: "/clients",
    message: true,
  }).get();
  return response;
};

export const upsertClient = async (client: IClient) => {
  let response;
  if (client.client_id) {
    response = await req.setPayload({
      url: "/clients",
      content: client,
      message: true,
      messageError: "Ocorreu um erro ao alterar o cliente"
    }).put();
  } else {
    response = await req.setPayload({
      url: "/clients",
      content: client,
      message: true,
      messageError: "Ocorreu um erro ao cadastrar o cliente"
    }).post();
  }
  return response;
}