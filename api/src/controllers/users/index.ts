import { Request, Response } from 'express';
import { alterUser, createUser, login } from '../../services/users';

export const createUserController = async (req: Request, res: Response): Promise<any> => {
  try {
    const response = await createUser(req.body);
    return res.status(201).json(response);
  } catch (error: any) {
    const message = error.message.replace(/^Error:\s*/, "");
    return res.status(400).json({ error: message });
  }
}

export const alterUserController = async (req: Request, res: Response): Promise<any> => {
  try {
    const response = await alterUser(req.body);
    return res.status(201).json(response);
  } catch (error: any) {
    const message = error.message.replace(/^Error:\s*/, "");
    return res.status(400).json({ error: message });
  }
}

export const loginController = async (req: Request, res: Response): Promise<any> => {
  try {
    const response = await login(req.body)
    return res.status(200).json(response);
  } catch (error: any) {
    const message = error.message.replace(/^Error:\s*/, "");
    return res.status(400).json({ error: message });
  }
}