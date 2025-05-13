import { Response } from "express";
import { addRegis, AuthenticatedRequest } from "../../middleware";
import { createProduct, getAllProducts, getProduct, updateProduct } from "../../services/products";

export const getAllProductsController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const response = await getAllProducts();
    res.status(200).json(response);
  } catch (error: any) {
    const message = error.message.replace(/^Error:\s*/, "");
    res.status(400).json({ error: message });
  }
}

export const getProductController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const response = await getProduct(id);
    res.status(200).json(response);
  } catch (error: any) {
    const message = error.message.replace(/^Error:\s*/, "");
    res.status(400).json({ error: message });
  }
}

export const createProductController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const newBody = addRegis(req, "post")
    const response = await createProduct(newBody);
    res.status(201).json(response);
  } catch (error: any) {
    const message = error.message.replace(/^Error:\s*/, "");
    res.status(400).json({ error: message });
  }
}

export const updateProductController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const newBody = addRegis(req, "put")
    const response = await updateProduct(newBody);
    res.status(201).json(response);
  } catch (error: any) {
    const message = error.message.replace(/^Error:\s*/, "");
    res.status(400).json({ error: message });
  }
}