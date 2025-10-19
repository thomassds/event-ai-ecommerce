import { HomePageSkeleton } from "@/components";
import { Loader } from "@/components/loaders/loader";
import { useAppCategory, useAppTenant } from "@/hooks";
import { ReactNode, useEffect } from "react";

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

    if (tenant && !categories) {
      console.log("loading categories...", categories);
      await loadCategories();
    }
  };

  useEffect(() => {
    handleInitializer();
  }, [tenant, selectTenantByDomain]);

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
