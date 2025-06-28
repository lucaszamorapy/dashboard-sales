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


export interface IOrder {
  order_id?: number;
  client_id?: number | null;
  order_products?: IOrderProduct[];
  client?: Omit<IClient, 'client_id' | 'cep' | 'regidh' | 'regiusu' | 'regadh' | 'regausu'>;
  payment_method: "Pix" | "Dinheiro" | "Cartão";
  delivery_date: Date;
  delivery_time?: string | null;
  status: "Não Iniciado" | "Em Andamento" | "Finalizado";
  total: number;
  obs: string | null;
  regidh?: Date;
  regiusu?: number;
  regadh?: Date;
  regausu?: number;
}

export interface IFilterOrder {
  init_date?: string;
  final_date?: string;
  status?: "Não Iniciado" | "Em Andamento" | "Finalizado" | undefined;
}

export interface IOrderProduct {
  order_product_id?: number;
  order_id: number;
  quantity: number;
  product_id: number;
  product?: Omit<IProduct, 'regidh' | 'regiusu' | 'regadh' | 'regausu'>
}