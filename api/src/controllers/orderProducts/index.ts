import { Response } from "express";
import { addRegis, AuthenticatedRequest } from "../../middleware";
import { createOrderProduct, updateOrderProduct } from "../../services/orderProducts";


export const createOrderProductController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const newBody = addRegis(req, "post")
    const response = await createOrderProduct(newBody);
    res.status(201).json(response);
  } catch (error: any) {
    const message = error.message.replace(/^Error:\s*/, "");
    res.status(400).json({ error: message });
  }
}

export const updateOrderProductController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const newBody = addRegis(req, "put")
    const response = await updateOrderProduct(newBody);
    res.status(201).json(response);
  } catch (error: any) {
    const message = error.message.replace(/^Error:\s*/, "");
    res.status(400).json({ error: message });
  }
}