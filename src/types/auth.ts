export interface User {
  id: number;
  name: string;
  email: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterResponse {
  user: User;
  message: string;
}

export interface LoginResponse {
  user: User;
  message: string;
  token: string | null;
}
