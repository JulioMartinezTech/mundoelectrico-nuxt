import type { AuthResponse } from "../../types/auth.ts";

const config = useRuntimeConfig();
const baseUrl = config.public.apiBase;

export const registerUser = async (data: {
  username: string;
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  return await $fetch(`${baseUrl}/api/auth/local/register`, {
    method: "POST",
    body: data,
  });
};

export const loginUser = async (data: {
  identifier: string;
  password: string;
}): Promise<AuthResponse> => {
  return await $fetch(`${baseUrl}/api/auth/local`, {
    method: "POST",
    body: data,
  });
};

export const getAuthenticatedUser = async (token: string) => {
  try {
    return await $fetch(`${baseUrl}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error obteniendo usuario autenticado:", error);
    throw error;
  }
};
