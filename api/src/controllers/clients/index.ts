import { Request, Response } from "express";
import { createClient, getAllClients, getClient, updateClient } from "../../services/clients";

export const getAllClientsController = async (req: Request, res: Response): Promise<any> => {
  try {
    const response = await getAllClients();
    return res.status(200).json(response);
  } catch (error: any) {
    const message = error.message.replace(/^Error:\s*/, "");
    return res.status(400).json({ error: message });
  }
}

export const getClientController = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = Number(req.params.id);
    const response = await getClient(id);
    return res.status(200).json(response);
  } catch (error: any) {
    const message = error.message.replace(/^Error:\s*/, "");
    return res.status(400).json({ error: message });
  }
}

export const createClientController = async (req: Request, res: Response): Promise<any> => {
  try {
    const response = await createClient(req.body);
    return res.status(201).json(response);
  } catch (error: any) {
    const message = error.message.replace(/^Error:\s*/, "");
    return res.status(400).json({ error: message });
  }
}

export const updateClientController = async (req: Request, res: Response): Promise<any> => {
  try {
    const response = await updateClient(req.body);
    return res.status(201).json(response);
  } catch (error: any) {
    const message = error.message.replace(/^Error:\s*/, "");
    return res.status(400).json({ error: message });
  }
}