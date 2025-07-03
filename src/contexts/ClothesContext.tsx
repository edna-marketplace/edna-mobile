import {
  FetchClothesResponse,
  fetchClothesWithFilter,
} from "@/api/fetch-clothes-with-filter";
import { ClotheSummaryDTO } from "@/dtos/ClotheSummaryDTO";
import { createContext, ReactNode, useEffect, useState } from "react";

export type ClothesContextDataProps = {
  fetchClothes: (
    page: number,
    category?: string
  ) => Promise<FetchClothesResponse>;
  getFilterValue: (filterType: string) => string | undefined;
  setFilterValue: (filterType: string, value: string | undefined) => void;
  clearFilters: () => void;
  isLoading: boolean;
  filtersChanged: boolean;
};

export type ClothesContextProviderProps = {
  children: ReactNode;
};

export const ClothesContext = createContext<ClothesContextDataProps>(
  {} as ClothesContextDataProps
);

export function ClothesContextProvider({
  children,
}: ClothesContextProviderProps) {
  const [isLoading, setIsLoading] = useState(false);

  const [filtersChanged, setFiltersChanged] = useState(false);

  const [storeIdFilter, setStoreIdFilter] = useState<string | undefined>(
    undefined
  );
  const [genderFilter, setGenderFilter] = useState("ALL");
  const [brandFilter, setBrandFilter] = useState("ALL");
  const [sizeFilter, setSizeFilter] = useState("ALL");
  const [categoryOther, setCategoryOther] = useState<string | undefined>(
    undefined
  );

  function getFilterValue(filterType: string) {
    if (filterType === "STORE_ID") {
      return storeIdFilter;
    }

    if (filterType === "GENDER") {
      return genderFilter;
    }

    if (filterType === "BRAND") {
      return brandFilter;
    }

    if (filterType === "SIZE") {
      return sizeFilter;
    }
  }

  function setFilterValue(filterType: string, value: string | undefined) {
    filterType === "STORE_ID" && setStoreIdFilter(value);
    filterType === "GENDER" && setGenderFilter(value as string);
    filterType === "BRAND" && setBrandFilter(value as string);
    filterType === "SIZE" && setSizeFilter(value as string);
    filterType === "CATEGORY_OTHER" && setCategoryOther(value as string);

    setFiltersChanged(!filtersChanged);
  }

  function clearFilters() {
    setStoreIdFilter(undefined);
    setGenderFilter("ALL");
    setBrandFilter("ALL");
    setSizeFilter("ALL");

    // setFiltersChanged(!filtersChanged);
  }

  async function fetchClothes(page: number, categoryFilter?: string) {
    try {
      setIsLoading(true);
      const data = await fetchClothesWithFilter({
        page,
        storeId: storeIdFilter,
        category: categoryFilter,
        categoryOther: categoryOther,
        gender: genderFilter,
        brand: brandFilter,
        size: sizeFilter,
      });

      return data;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ClothesContext.Provider
      value={{
        fetchClothes,
        getFilterValue,
        setFilterValue,
        clearFilters,
        isLoading,
        filtersChanged,
      }}
    >
      {children}
    </ClothesContext.Provider>
  );
}
