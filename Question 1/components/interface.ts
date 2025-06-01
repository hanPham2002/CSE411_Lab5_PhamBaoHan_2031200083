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
  name: string;
  phone: string;
  password: string;
  token: string;
}

export const BASE_URL = "https://kami-backend-5rs0.onrender.com";

export interface Detail extends Service {
  user: User;
}
