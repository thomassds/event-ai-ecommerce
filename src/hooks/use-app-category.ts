"use client";

import { Category } from "@/interfaces";
import { useAppSelector } from "./use-app-selector";
import { getCategoriesAction } from "@/actions";
import { setCategories } from "@/store/slices/category-slice";
import { useAppDispatch } from "./use-app-dispatch";
import { useState } from "react";
import { useAppTenant } from "./use-app-tenant";

interface UseAppCategory {
  categories?: Category[];
  loadCategories: () => Promise<void>;
  isLoadingCategories: boolean;
}

export const useAppCategory = (): UseAppCategory => {
  const dispatch = useAppDispatch();
  const { tenant } = useAppTenant();
  const { categories } = useAppSelector((state) => state.category);

  const [isLoadingCategories, setIsLoadingCategories] = useState(false);

  const loadCategories = async () => {
    if (!tenant) return;

    setIsLoadingCategories(true);

    const response = await getCategoriesAction();

    dispatch(setCategories(response || []));

    setIsLoadingCategories(false);
  };

  return { categories, loadCategories, isLoadingCategories };
};
