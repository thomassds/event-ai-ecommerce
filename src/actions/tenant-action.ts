import { apiClient } from "@/configs/api";
import { Tenant } from "@/interfaces";

export async function selectTenantByDomainAction(
  domain: string
): Promise<Tenant | null> {
  try {
    const { data } = await apiClient.get<Tenant>(`/tenants/domain/${domain}`);

    return data;
  } catch (error) {
    console.error("Erro ao buscar informações de autenticação:", error);
    return null;
  }
}
