/**
 * Authentication API
 * Quản lý các API liên quan đến xác thực người dùng
 */

import { httpClient, ApiResponse } from "./httpClient";
import { User } from "../types/interfaces";
import { getSession, signIn, signOut } from "next-auth/react";

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  user?: User;
  token?: string;
}

/**
 * Đăng ký user mới
 */
export async function registerUser(
  credentials: RegisterPayload,
): Promise<ApiResponse<AuthResponse>> {
  return httpClient<AuthResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

/**
 * Đăng nhập
 */
export async function signInUser(credentials: SignInPayload) {
  const res = await signIn("credentials", {
    email: credentials.email,
    password: credentials.password,
    redirect: false,
  });

  return res;
}

/**
 * Đăng xuất
 */
export async function signOutUser() {
  return signOut({
    redirect: false,
  });
}

/**
 * Lấy thông tin user hiện tại
 */
export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}
