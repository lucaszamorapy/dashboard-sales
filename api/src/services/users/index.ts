import { Message } from "../../class/message";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { IUser } from "../../types";
import { User } from "../../models/users";


interface IUserLogin {
  name: string;
  password: string
}

export const createUser = async (data: IUser) => {
  try {
    const existUser = await User.findOne({ where: { name: data.name } });
    if (existUser) {
      throw new Error("Nome de usuário já existe");
    }
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    const userCreate = await User.create({ ...data, password: hashedPassword });
    return new Message(userCreate, `Criado com sucesso usuário ${data.name}`);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const alterUser = async (data: IUser) => {
  try {
    const existUser = User.findByPk(data.user_id)
    if (!existUser) {
      throw new Error("Usuário não existe");
    }
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    const alterUser = await User.update({ ...data, password: hashedPassword }, { where: { user_id: data.user_id } });
    return new Message(alterUser, `Alterado com sucesso usuário ${data.name}`);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export const login = async (data: IUserLogin) => {
  try {
    const existUser = await User.findOne({
      where: { name: data.name }
    });

    if (!existUser) {
      throw new Error("Usuário não existe");
    }

    const isValidPassword = await bcrypt.compare(data.password, existUser.password);

    if (!isValidPassword) {
      throw new Error("Senha inválida.");
    }
    const secretKey = process.env.JWT_KEY;

    if (!secretKey) {
      throw new Error("JWT_KEY não está definida nas variáveis.");
    }

    const token = jwt.sign(
      {
        user_id: existUser.user_id,
        email: existUser.email,
      },
      secretKey,
      { expiresIn: "1h" }
    );

    return new Message({
      token: token, user_id: existUser.user_id,
      name: existUser.name,
    }, `Bem-vindo, ${data.name}`);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const validToken = (data: any) => {
  try {
    jwt.verify(data.token, process.env.JWT_KEY as string);
    return new Message({ valid: true }, "Token válido");
  } catch (error: any) {
    throw new Error(error.message);
  }
}




