import { Loader } from "@/components/loaders/loader";
import { useAppTenant } from "@/hooks";
import { ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
}
export const TenantInitializer = ({ children }: Props) => {
  const { tenant, selectTenantByDomain, isLoadingTenant } = useAppTenant();

  useEffect(() => {
    if (!tenant) {
      selectTenantByDomain();
    }
  }, [tenant, selectTenantByDomain]);

  return (
    <>
      {isLoadingTenant ? (
        <div className="flex items-center justify-center w-full min-h-screen">
          <Loader />
        </div>
      ) : (
        children
      )}
    </>
  );
};
