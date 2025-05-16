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
  regidh?: Date;
  regiusu?: number;
  regadh?: Date;
  regausu?: number;
}

export enum PaymentMethod {
  Dinheiro = 'Dinheiro',
  Pix = 'Pix',
  Cartão = 'Cartão',
}


export interface IOrder {
  order_id?: number;
  client_id: number;
  order_products: IOrderProduct[];
  client: Omit<IClient, 'client_id' | 'cep' | 'regidh' | 'regiusu' | 'regadh' | 'regausu'>;
  payment_method: PaymentMethod;
  delivery_date: Date;
  delivery_time?: string;
  total: number;
  regidh: Date;
  regiusu: number;
  regadh?: Date;
  regausu?: number;
}



export interface IOrderProduct {
  order_product: number;
  order_id: number;
  quantity: number;
  product: Omit<IProduct, 'regidh' | 'regiusu' | 'regadh' | 'regausu'>
}