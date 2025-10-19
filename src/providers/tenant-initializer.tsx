import { HomePageSkeleton } from "@/components";
import { useAppCategory, useAppTenant } from "@/hooks";
import { ReactNode, useEffect, useState } from "react";

interface Props {
  children: ReactNode;
}
export const TenantInitializer = ({ children }: Props) => {
  const { tenant, selectTenantByDomain, isLoadingTenant } = useAppTenant();
  const { isLoadingCategories, loadCategories, categories } = useAppCategory();

  const handleInitializer = async () => {
    if (!tenant) {
      await selectTenantByDomain();
    }

    if (tenant && typeof categories === "undefined") {
      await loadCategories();
    }
  };

  useEffect(() => {
    handleInitializer();
  }, [tenant]);

  return (
    <>
      {isLoadingTenant || !categories || isLoadingCategories ? (
        // <div className="flex items-center justify-center w-full min-h-screen">
        //   <Loader />
        // </div>
        <HomePageSkeleton />
      ) : (
        children
      )}
    </>
  );
};
