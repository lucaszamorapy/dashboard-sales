import { Response } from "express";
import { createClient, getAllClients, getClient, updateClient } from "../../services/clients";
import { addRegis, AuthenticatedRequest } from "../../middleware";

export const getAllClientsController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const response = await getAllClients();
    res.status(200).json(response);
  } catch (error: any) {
    const message = error.message.replace(/^Error:\s*/, "");
    res.status(400).json({ error: message });
  }
}

export const getClientController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const response = await getClient(id);
    res.status(200).json(response);
  } catch (error: any) {
    const message = error.message.replace(/^Error:\s*/, "");
    res.status(400).json({ error: message });
  }
}

export const createClientController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const newBody = addRegis(req, "post")
    const response = await createClient(newBody);
    res.status(201).json(response);
  } catch (error: any) {
    const message = error.message.replace(/^Error:\s*/, "");
    res.status(400).json({ error: message });
  }
}

export const updateClientController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const newBody = addRegis(req, "put")
    const response = await updateClient(newBody);
    res.status(201).json(response);
  } catch (error: any) {
    const message = error.message.replace(/^Error:\s*/, "");
    res.status(400).json({ error: message });
  }
}