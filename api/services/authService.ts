import type { AuthResponse } from "~/types/auth";

const baseUrl = "http://localhost:1337/api";

export const registerUser = async (data: {
  username: string;
  email: string;
  password: string;
}): Promise<AuthResponse> => {
  return await $fetch(`${baseUrl}/auth/local/register`, {
    method: "POST",
    body: data,
  });
};

export const loginUser = async (data: {
  identifier: string;
  password: string;
}): Promise<AuthResponse> => {
  return await $fetch(`${baseUrl}/auth/local`, {
    method: "POST",
    body: data,
  });
};

export const getAuthenticatedUser = async (token: string) => {
  try {
    return await $fetch(`${baseUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error obteniendo usuario autenticado:", error);
    throw error;
  }
};
