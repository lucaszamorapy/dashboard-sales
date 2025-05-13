export interface IUser {
  user_id?: number;
  name: string;
  email: string;
  password: string;
  regidh: Date;
  regiusu: number;
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

export interface IProduct {
  product_id?: number;
  name: string;
  price: number;
  regidh: Date;
  regiusu: number;
  regadh?: Date;
  regausu?: number;
}

export enum PaymentMethod {
  Dinheiro = 'Dinheiro',
  Pix = 'pix',
  Cartão = 'cartão',
}

export interface IOrder {
  order_id?: number;
  client_id: number;
  product_id: number;
  quantity: number;
  payment_method: PaymentMethod;
  delivry_date: Date;
  total: number;
  regidh: Date;
  regiusu: number;
  regadh?: Date;
  regausu?: number;
}

export interface IVwOrder {
  order_id: number;
  client_name: string;
  product_name: string;
  quantity: number;
  payment_method: PaymentMethod;
  delivry_date: Date;
  total: number;
  regidh: Date;
  regiusu: number;
  regadh?: Date;
  regausu?: number;
}
