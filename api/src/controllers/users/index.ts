import { Request, Response } from 'express';
import { alterUser, createUser, login } from '../../services/users';
import { addRegis, AuthenticatedRequest } from '../../middleware';

export const createUserController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const newBody = addRegis(req, "post")
    const response = await createUser(newBody);
    res.status(201).json(response);
  } catch (error: any) {
    const message = error.message.replace(/^Error:\s*/, "");
    res.status(400).json({ error: message });
  }
}

export const alterUserController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const newBody = addRegis(req, "put")
    const response = await alterUser(newBody);
    res.status(201).json(response);
  } catch (error: any) {
    const message = error.message.replace(/^Error:\s*/, "");
    res.status(400).json({ error: message });
  }
}

export const loginController = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const response = await login(req.body)
    res.status(200).json(response);
  } catch (error: any) {
    const message = error.message.replace(/^Error:\s*/, "");
    res.status(400).json({ error: message });
  }
}