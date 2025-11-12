import { apiClient } from "@/configs/api";
import { ICreateUser } from "@/interfaces";

export async function signInAction(
  email: string,
  password: string
): Promise<{ email: string; token: string } | null> {
  try {
    const { data } = await apiClient.post<{ email: string; token: string }>(
      "/auth",
      {
        email,
        password,
      }
    );

    return data;
  } catch (error) {
    console.error("Erro ao buscar informações de autenticação:", error);
    return null;
  }
}

export async function registerAction(data: ICreateUser): Promise<{
  success: boolean;
  message: string;
  data: { token: string; email: string; expiresAt: Date };
} | null> {
  try {
    const response = await apiClient.post<{
      success: boolean;
      message: string;
      data: { token: string; email: string; expiresAt: Date };
    }>("/users", data);

    return response.data;
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return null;
  }
}

export async function checkEmailExistsAction(email: string): Promise<{
  success: boolean;
  message: string;
  data: { exists: boolean };
} | null> {
  try {
    const response = await apiClient.post<{
      success: boolean;
      message: string;
      data: { exists: boolean };
    }>("/users/exists", { email });

    return response.data;
  } catch (error) {
    console.error("Erro ao verificar existência de email:", error);
    return null;
  }
}
