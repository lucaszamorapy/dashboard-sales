import { Request, Response } from 'express';
import { alterUser, createUser, login } from '../../services/users';
import { addRegis, AuthenticatedRequest } from '../../middleware';

export const createUserController = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
  try {
    const newBody = addRegis(req, "post")
    const response = await createUser(newBody);
    return res.status(201).json(response);
  } catch (error: any) {
    const message = error.message.replace(/^Error:\s*/, "");
    return res.status(400).json({ error: message });
  }
}

export const alterUserController = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
  try {
    const newBody = addRegis(req, "put")
    const response = await alterUser(newBody);
    return res.status(201).json(response);
  } catch (error: any) {
    const message = error.message.replace(/^Error:\s*/, "");
    return res.status(400).json({ error: message });
  }
}

export const loginController = async (req: AuthenticatedRequest, res: Response): Promise<any> => {
  try {
    const response = await login(req.body)
    return res.status(200).json(response);
  } catch (error: any) {
    const message = error.message.replace(/^Error:\s*/, "");
    return res.status(400).json({ error: message });
  }
}