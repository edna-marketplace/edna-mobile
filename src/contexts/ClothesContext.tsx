import { fetchClothesWithFilter } from "@/api/fetch-clothes-with-filter";
import { ClotheSummaryDTO } from "@/dtos/ClotheSummaryDTO";
import { createContext, ReactNode, useEffect, useState } from "react";

export type ClothesContextDataProps = {
  clothes: ClotheSummaryDTO[];
  fetchClothes: () => void;
  removeClothe: (clotheId: string) => void;
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

  const [storeIdFilter, setStoreIdFilter] = useState<string | undefined>(
    undefined
  );
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [genderFilter, setGenderFilter] = useState("ALL");
  const [brandFilter, setBrandFilter] = useState("ALL");
  const [sizeFilter, setSizeFilter] = useState("ALL");

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

  function setFilterValue(filterType: string, value: string) {
    filterType === "STORE_ID" && setStoreIdFilter(value);

    filterType === "CATEGORY" && setCategoryFilter(value);

    filterType === "GENDER" && setGenderFilter(value);

    filterType === "BRAND" && setBrandFilter(value);

    filterType === "SIZE" && setSizeFilter(value);
  }

  function removeClothe(clotheId: string) {
    setClothes((prevClothes) =>
      prevClothes.filter((clothe) => clothe.id !== clotheId)
    );
  }

  function clearFilters() {
    setStoreIdFilter(undefined);
    setGenderFilter("ALL");
    setGenderFilter("ALL");
    setBrandFilter("ALL");
    setSizeFilter("ALL");
  }

  async function fetchClothes() {
    try {
      const { clothes } = await fetchClothesWithFilter({
        storeId: storeIdFilter,
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
  }, [storeIdFilter, categoryFilter, genderFilter, brandFilter, sizeFilter]);

  return (
    <ClothesContext.Provider
      value={{
        clothes,
        fetchClothes,
        removeClothe,
        getFilterValue,
        setFilterValue,
        clearFilters,
      }}
    >
      {children}
    </ClothesContext.Provider>
  );
}
