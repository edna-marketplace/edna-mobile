import { ClotheSummaryDTO } from "@/dtos/ClotheSummaryDTO";
import { createContext, ReactNode, useEffect, useState } from "react";
import { clothesData } from "@/data/clothes-data";
import { fetchClothesWithFilter } from "@/api/fetch-clothes-with-filter";

export type ClothesContextDataProps = {
  clothes: ClotheSummaryDTO[];
  getFilterValue: (filterType: string) => string | undefined;
  setFilterValue: (filterType: string, value: string) => void;
  clearFilters: () => void;
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
  const [clothes, setClothes] = useState<ClotheSummaryDTO[]>([]);

  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [genderFilter, setGenderFilter] = useState("ALL");
  const [brandFilter, setBrandFilter] = useState("ALL");
  const [sizeFilter, setSizeFilter] = useState("ALL");

  function getFilterValue(filterType: string) {
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

  function setFilterValue(filterType: string, value: string) {
    filterType === "CATEGORY" && setCategoryFilter(value);

    filterType === "GENDER" && setGenderFilter(value);

    filterType === "BRAND" && setBrandFilter(value);

    filterType === "SIZE" && setSizeFilter(value);
  }

  function clearFilters() {
    setGenderFilter("ALL");
    setBrandFilter("ALL");
    setSizeFilter("ALL");
  }

  async function fetchClothes() {
    try {
      const { clothes } = await fetchClothesWithFilter({
        category: categoryFilter,
        gender: genderFilter,
        brand: brandFilter,
        size: sizeFilter,
      });

      setClothes(clothes);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    fetchClothes();
  }, [categoryFilter, genderFilter, brandFilter, sizeFilter]);

  return (
    <ClothesContext.Provider
      value={{
        clothes,
        getFilterValue,
        setFilterValue,
        clearFilters,
      }}
    >
      {children}
    </ClothesContext.Provider>
  );
}
