import { apiClient } from "@/configs/api";
import { Category } from "@/interfaces";

export async function getCategoriesAction(): Promise<Category[]> {
  try {
    const { data } = await apiClient.get<{ data: Category[] }>("/categories");

    return data.data;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return [];
  }
}
