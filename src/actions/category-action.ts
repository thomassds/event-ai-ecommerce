import { apiClient } from "@/configs/api";
import { Category } from "@/interfaces";

export async function getCategories(): Promise<Category[]> {
  try {
    const { data } = await apiClient.get<Category[]>("/categories");

    return data;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return [];
  }
}
