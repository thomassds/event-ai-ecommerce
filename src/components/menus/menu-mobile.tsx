"use client";

import React from "react";
import { RenderMenuItem } from "./menu-item";
import { HeaderMobile } from "../header/header-mobile";
import { MobileUserInfoCard } from "../cards";
import { useRouter } from "next/navigation";
import { useAppCategory, useAppUi } from "@/hooks";

export const MenuMobile = () => {
  const router = useRouter();

  const { handleToggleMenu } = useAppUi();
  const { categories } = useAppCategory();

  const handleMenuScroll = (e: React.UIEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const onClickUserInfoCard = () => {
    router.push("/auth");

    handleToggleMenu();
  };

  return (
    <nav className="xl:hidden bg-white shadow-lg fixed top-0 left-0 w-full h-screen z-50 flex flex-col">
      {/* <HeaderBanner /> */}

      <HeaderMobile />

      <div
        className="border-t border-gray-200 flex-1 overflow-y-auto"
        onScroll={handleMenuScroll}
        style={{
          WebkitOverflowScrolling: "touch",
          overscrollBehavior: "contain",
        }}
      >
        <div className="p-4">
          <MobileUserInfoCard onClick={onClickUserInfoCard} />
        </div>

        <hr className="border-gray-200" />

        <span className="block px-4 pt-4 text-gray-500 font-medium">
          Categorias
        </span>
        <ul className="space-y-2 mt-4 mb-4 px-4">
          {/* {isLoadingCategories ? (
            <li className="py-3 px-4 text-gray-500">
              Carregando categorias...
            </li>
          ) : isErrorCategories ? (
            <li className="py-3 px-4 text-gray-500">
              Erro ao carregar categorias
            </li> */}
          {/* ) : ( */}

          {categories?.map((item) => (
            <RenderMenuItem
              item={{
                label: item.name,
                href: `/eventos?category=${item.slug}`,
                onClick: () => {
                  router.push(`/eventos?category=${item.slug}`);
                  handleToggleMenu();
                },
              }}
              key={item.id}
            />
          ))}

          {/* )} */}
        </ul>

        {/* <MobileMenuBanner banners={mobileBanners} /> */}
      </div>
    </nav>
  );
};
