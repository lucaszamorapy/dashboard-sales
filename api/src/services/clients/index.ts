import { Message } from "../../class/message";
import { Client } from "../../models/clients"
import { IClient } from "../../types";

export const getAllClients = async () => {
  try {
    const clients = await Client.findAll({
      order: [['name', 'ASC']],
    })
    return new Message(clients, `Total de ${clients.length} cliente(s) encontrado(s)`);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const getClient = async (id: number) => {
  try {
    const client = await Client.findOne({ where: { client_id: id } })
    return new Message(client, `Cliente ${client?.name} encontrado`);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const createClient = async (data: IClient) => {
  try {
    const client = await Client.create(data)
    return new Message(client, `Cliente ${client.name} criado com sucesso!`);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const updateClient = async (data: IClient) => {
  try {
    await Client.update(data, { where: { client_id: data.client_id } })
    return new Message(data, `Cliente ${data.name} atualizado com sucesso!`);
  } catch (error: any) {
    throw new Error(error.message);
  }
}