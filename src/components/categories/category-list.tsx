"use client";

import { useAppCategory } from "@/hooks";
import { Category } from "@/interfaces";
import Link from "next/link";

export const CategoryList = () => {
  const { categories } = useAppCategory();

  return (
    <nav
      className="bg-white border-b border-gray-200"
      aria-label="Navegação principal"
      role="navigation"
    >
      <div className="container mx-auto px-4">
        <ul
          className="flex items-center justify-around gap-2 xl:gap-4 py-4 text-sm overflow-x-auto scrollbar-hide"
          role="menubar"
        >
          {categories?.map((category: Category) => (
            <li
              key={`category-${category.id}`}
              className="relative"
              role="none"
            >
              <Link
                href={`/eventos?category=${category.slug}`}
                className="transition-all duration-300 ease-in-out text-gray-700 hover:text-black hover:underline hover:underline-offset-4 hover:font-medium"
                role="menuitem"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
