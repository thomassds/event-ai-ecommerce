"use client";

import { HeaderDesktop } from "./header-desktop";
import { HeaderMobile } from "./header-mobile";

export const Header = () => {
  return (
    <>
      <div className="w-full hidden xl:block">
        <HeaderDesktop />
      </div>

      <div className="xl:hidden">
        <HeaderMobile />
      </div>
    </>
  );
};
