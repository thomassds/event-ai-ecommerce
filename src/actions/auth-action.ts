import { apiClient } from "@/configs/api";

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
