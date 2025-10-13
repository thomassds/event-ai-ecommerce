"use client";

import { Banner } from "@/interfaces/banner";
import { usePathname } from "next/navigation";
import { Banners } from "./banners";

export const ConditionalBanner = ({ banners }: { banners: Banner[] }) => {
  const pathname = usePathname();

  if (!["/", "/auth", "/registrar", "/esqueci-a-senha"].includes(pathname)) {
    return null;
  }

  return (
    <Banners
      intervalTime={5000}
      ariaLabel="Banners promocionais de eventos"
      banners={banners.map((banner) => ({
        url: banner.url,
        alt: banner.alt,
        title: banner.title,
        description: banner.description,
        link: banner.link,
        priority: banner.priority,
      }))}
    />
  );
};
