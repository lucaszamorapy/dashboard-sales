import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken"

//verificação de token nas requisão
export interface AuthenticatedRequest extends Request {
  userId?: number;
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    res.status(403).json({ error: 'Token não fornecido' });
    return;
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_KEY as string);
    (req as AuthenticatedRequest).userId = decoded.user_id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token inválido' });
  }
};

export const addRegis = (req: AuthenticatedRequest, type: string) => {
  let body;
  if (type === 'post') {
    body = {
      ...req.body,
      regiusu: req.userId,
      regidh: new Date()
    }
  } else {
    body = {
      ...req.body,
      regausu: req.userId,
      regadh: new Date()
    }
  }
  return body
}