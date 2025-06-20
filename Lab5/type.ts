export interface Service {
  _id: string;
  name: string;
  price: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
export interface User {
  _id: string;
  phone: string;
  password: string;
  name: string;
  token: string;
}
