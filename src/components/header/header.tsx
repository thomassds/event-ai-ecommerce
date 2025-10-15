"use client";

import { useState } from "react";
import { MenuMobile } from "../menus";
import { HeaderDesktop } from "./header-desktop";
import { HeaderMobile } from "./header-mobile";
import { useAppUi } from "@/hooks";

export const Header = () => {
  const { isMenuOpen } = useAppUi();

  return (
    <>
      <div className="w-full hidden xl:block">
        <HeaderDesktop />
      </div>

      <div className="xl:hidden">
        <HeaderMobile />

        {isMenuOpen && <MenuMobile />}
      </div>
    </>
  );
};
