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