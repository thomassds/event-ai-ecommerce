"use client";

import { useState } from "react";
import { MenuMobile } from "../menus";
import { HeaderDesktop } from "./header-desktop";
import { HeaderMobile } from "./header-mobile";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <div className="w-full hidden xl:block">
        <HeaderDesktop />
      </div>

      <div className="xl:hidden">
        <HeaderMobile isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        {isMenuOpen && (
          <MenuMobile isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        )}
      </div>
    </>
  );
};
