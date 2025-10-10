"use client";

import React from "react";
import { DesktopFooter } from "./desktop-footer";
import { MobileFooter } from "./mobile-footer";

export function Footer() {
  return (
    <footer className="mt-auto">
      <div className="hidden lg:block">
        <DesktopFooter />
      </div>

      <div className="block lg:hidden py-8">
        <MobileFooter />
      </div>
    </footer>
  );
}
