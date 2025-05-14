import { Response } from "express";
import { addRegis, AuthenticatedRequest } from "../../middleware";
import { createOrder, filterOrder, getAllOrders, getOrder, updateOrder } from "../../services/orders";

export const getAllOrdersController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const response = await getAllOrders();
    res.status(200).json(response);
  } catch (error: any) {
    const message = error.message.replace(/^Error:\s*/, "");
    res.status(400).json({ error: message });
  }
}

export const getOrderController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const response = await getOrder(id);
    res.status(200).json(response);
  } catch (error: any) {
    const message = error.message.replace(/^Error:\s*/, "");
    res.status(400).json({ error: message });
  }
}

export const filterOrderController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const response = await filterOrder(req.body);
    res.status(200).json(response);
  } catch (error: any) {
    const message = error.message.replace(/^Error:\s*/, "");
    res.status(400).json({ error: message });
  }
}

export const createOrderController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const newBody = addRegis(req, "post")
    const response = await createOrder(newBody);
    res.status(201).json(response);
  } catch (error: any) {
    const message = error.message.replace(/^Error:\s*/, "");
    res.status(400).json({ error: message });
  }
}

export const updateOrderController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const newBody = addRegis(req, "put")
    const response = await updateOrder(newBody);
    res.status(201).json(response);
  } catch (error: any) {
    const message = error.message.replace(/^Error:\s*/, "");
    res.status(400).json({ error: message });
  }
}