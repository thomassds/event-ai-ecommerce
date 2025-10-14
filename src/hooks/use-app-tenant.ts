import { selectTenantByDomainAction } from "@/actions";
import { useAppSelector } from "./use-app-selector";
import { useAppDispatch } from "./use-app-dispatch";
import { setTenant } from "@/store/slices/tenant-slice";
import { Tenant } from "@/interfaces";
import { useState } from "react";

interface UseAppTenant {
  tenant: Tenant | null;
  selectTenantByDomain: () => Promise<void>;
  isLoadingTenant: boolean;
}

export const useAppTenant = (): UseAppTenant => {
  const dispatch = useAppDispatch();
  const { tenant } = useAppSelector((state) => state.tenant);
  const [isLoadingTenant, setIsLoadingTenant] = useState(false);

  const selectTenantByDomain = async () => {
    setIsLoadingTenant(true);

    const domain = window.location.hostname;

    const tenant = await selectTenantByDomainAction(domain);

    dispatch(setTenant(tenant));

    setIsLoadingTenant(false);
  };

  return {
    tenant,
    selectTenantByDomain,
    isLoadingTenant,
  };
};
