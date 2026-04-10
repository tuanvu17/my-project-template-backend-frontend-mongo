// User types
export interface User {
  _id: string;
  username: string;
  displayname: string;
  mobile?: string;
  email: string;
  role: "Admin" | "User" | "Visitor";
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  msg?: string;
  message?: string;
  error?: string;
}

// Auth types
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterPayload {
  username: string;
  password: string;
  email: string;
  displayname: string;
  mobile?: string;
}
