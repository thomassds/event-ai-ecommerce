import { apiClient } from "@/configs/api";
import { Category } from "@/interfaces";

export async function getCategoriesAction(): Promise<Category[] | null> {
  try {
    const { data } = await apiClient.get<{ data: Category[] | null }>(
      "/categories"
    );

    return data.data;
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    return [];
  }
}
