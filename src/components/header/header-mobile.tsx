import Image from "next/image";
import Link from "next/link";
import { ListIcon, XIcon } from "@phosphor-icons/react/ssr";
import { useEffect, useState } from "react";
import { Button } from "../buttons";
import { SearchInput } from "../inputs";
import { useRouter } from "next/navigation";
import { MenuMobile } from "../menus";

interface HeaderMobileProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}
export const HeaderMobile = ({
  isMenuOpen,
  setIsMenuOpen,
}: HeaderMobileProps) => {
  const router = useRouter();

  return (
    <div className="xl:hidden bg-[#5400D6] p-4 flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4 w-full">
        <Link href="/">
          <Image
            onClick={() => router.push("/")}
            src="/white-logo.png"
            alt="logo"
            width={250}
            height={70}
            priority
            style={{ cursor: "pointer", width: "auto", height: "auto" }}
          />
        </Link>

        <nav>
          <ul className="flex items-center">
            <li>
              <Button
                variant="ghost"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:bg-white/10 hover:text-white transition-colors"
              >
                {isMenuOpen ? (
                  <XIcon className="text-white fill-white" size={24} />
                ) : (
                  <ListIcon className="text-white fill-white" size={24} />
                )}
              </Button>
            </li>
          </ul>
        </nav>
      </div>

      <SearchInput />
    </div>
  );
};
