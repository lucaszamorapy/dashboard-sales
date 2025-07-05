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
  cep?: string;
  street?: string;
  neighborhood?: string;
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
  Pix = 'Pix',
  Cartão = 'Cartão',
}

export enum Status {
  NAO_INICIADO = "Não Iniciado",
  EM_ANDAMENTO = "Em Andamento",
  FINALIZADO = "Finalizado",
}



export interface IOrder {
  order_id?: number;
  client_id: number;
  payment_method: PaymentMethod;
  delivery_date: Date;
  delivery_time?: string;
  status: Status;
  total: number;
  obs?: string;
  regidh: Date;
  regiusu: number;
  regadh?: Date;
  regausu?: number;
}

export interface IOrderProduct {
  order_product_id?: number;
  order_id?: number;
  product_id: number;
  quantity: number;
  regidh: Date;
  regiusu: number;
  regadh?: Date;
  regausu?: number;
}

export interface IFilterOrder {
  init_date?: Date;
  final_date?: Date
  status?: Status;
}
