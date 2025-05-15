export interface ILogin {
  name: string;
  password: string;
}

export interface IProduct {
  product_id?: number;
  name: string;
  price: number;
  regidh?: Date;
  regiusu?: number;
  regadh?: Date;
  regausu?: number;
}

export interface IClient {
  client_id?: number;
  name: string;
  cep: string;
  street: string;
  neighborhood: string;
  tel?: string;
  cel?: string;
  regidh: Date;
  regiusu: number;
  regadh?: Date;
  regausu?: number;
}