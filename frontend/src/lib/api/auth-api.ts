import { AuthResponse, CreateUserByRegisterRequest, GetUserByLoginRequest } from "@/app/types/types-for-auth";
import API from "./axios";
import { OrderData } from "@/app/types/type-for-order";

export const createUserByRegister = async (data: CreateUserByRegisterRequest): Promise<AuthResponse> => {
  const response = await API.post<AuthResponse>("/auth/register", data);
  return response.data;
};

export const getUserByLogin = async (data: GetUserByLoginRequest): Promise<AuthResponse> => {
  const response = await API.post<AuthResponse>("/auth/login", data);
  return response.data;
};

export const sendOtp = async (email: string) => {
  const response = await API.post("/auth/send-otp", {email});
  return response.data;
}
export const verifyOtp = async (email: string, otp: string) => {
  const res = await API.post("/auth/verify-otp", { email, otp });
  return res.data;
};

export const placeOrder = async(orderData: OrderData) => {
  const response = await API.post("/order/place",orderData);
  return response.data;
}