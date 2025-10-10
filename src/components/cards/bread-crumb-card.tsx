"use client";

import Link from "next/link";
import { HouseIcon } from "@phosphor-icons/react/dist/ssr";
import { useSearchParams } from "next/navigation";

interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb = ({ items, className = "" }: BreadcrumbProps) => {
  return (
    <nav
      className={`flex items-center gap-1 text-sm overflow-hidden ${className}`}
      aria-label="Breadcrumb"
    >
      {items.map((item, index) => (
        <div key={index} className="flex items-center flex-shrink-0">
          {item.href ? (
            <Link
              href={item.href}
              className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors focus-ring rounded px-1 whitespace-nowrap"
            >
              {item.icon}
              <span className="hidden sm:inline">{item.label}</span>
              <span className="sm:hidden truncate max-w-[80px]">
                {item.label}
              </span>
            </Link>
          ) : (
            <span className="flex items-center gap-2 text-gray-700">
              {item.icon}
              <span className="font-bold truncate max-w-[120px] sm:max-w-none">
                {item.label}
              </span>
            </span>
          )}

          {index < items.length - 1 && (
            <span className="mx-2 text-gray-400 select-none flex-shrink-0">
              |
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};

interface EventBreadcrumbProps {
  eventTitle: string;
  category?: string;
  className?: string;
  showEventTitle?: boolean;
}

const normalizeCategorySlug = (category: string): string => {
  return category.toLowerCase().replace(/[^a-z0-9]/g, "-");
};

const showCategoryInBreadcrumb = (category: string): string => {
  return category
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

export const EventBreadcrumb = ({
  eventTitle,
  category = "Eventos",
  className = "",
  showEventTitle = true,
}: EventBreadcrumbProps) => {
  const normalizedCategorySlug = normalizeCategorySlug(category);

  const items: BreadcrumbItem[] = [
    {
      label: "Página Inicial",
      href: "/",
      icon: (
        <div className="">
          <HouseIcon size={16} color="#5400D6" />
        </div>
      ),
    },
    {
      label: category,
      href: `/eventos?category=${category}`,
    },
  ];

  if (showEventTitle) {
    items.push({
      label: eventTitle,
    });
  }

  return (
    <div className={`py-4 bg-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <Breadcrumb items={items} />
      </div>
    </div>
  );
};

export const EventSearchBreadcrumb = () => {
  const searchParams = useSearchParams();

  const items: BreadcrumbItem[] = [
    {
      label: "Página Inicial",
      href: "/",
      icon: (
        <div className="">
          <HouseIcon size={16} color="#5400D6" />
        </div>
      ),
    },
  ];

  const category = searchParams.get("category");
  if (category !== null) {
    const showCategory = showCategoryInBreadcrumb(category);

    items.push({
      label: showCategory,
      href: `/eventos?category=${category}`,
    });
  }

  return (
    <div className={`py-4 bg-white`}>
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <Breadcrumb items={items} />
      </div>
    </div>
  );
};
