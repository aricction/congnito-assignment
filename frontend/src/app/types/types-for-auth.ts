export interface CreateUserByRegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface GetUserByLoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  status: string;
  message: string;
  data?: {
    id: string;
    email: string;
    name?: string;
  } | null;
}
