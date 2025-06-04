import { fetchStoresWithFilter } from "@/api/fetch-stores-with-filter";
import { StoreSummaryDTO } from "@/dtos/StoreSummaryDTO";
import { createContext, ReactNode, useEffect, useState } from "react";

export type StoresContextDataProps = {
  stores: StoreSummaryDTO[];
  getFilterValue: (filterType: string) => string | boolean | undefined;
  setFilterValue: (filterType: string, value: string | boolean) => void;
  clearFilters: () => void;
};

export type StoresContextProviderProps = {
  children: ReactNode;
};

export const StoresContext = createContext<StoresContextDataProps>(
  {} as StoresContextDataProps
);

export function StoresContextProvider({
  children,
}: StoresContextProviderProps) {
  const [stores, setStores] = useState<StoreSummaryDTO[]>([]);

  const [isFavoriteFilter, setIsFavoriteFilter] = useState(false);
  const [targetCustomerFilter, setTargetCustomerFilter] = useState("ALL");

  function getFilterValue(filterType: string) {
    if (filterType === "IS_FAVORITE") {
      return isFavoriteFilter;
    }

    if (filterType === "TARGET_CUSTOMER") {
      return targetCustomerFilter;
    }
  }

  function setFilterValue(filterType: string, value: any) {
    filterType === "IS_FAVORITE" && setIsFavoriteFilter(value);

    filterType === "TARGET_CUSTOMER" && setTargetCustomerFilter(value);
  }

  function clearFilters() {
    setIsFavoriteFilter(false);
    setTargetCustomerFilter("ALL");
  }

  async function fetchStores() {
    try {
      const { stores } = await fetchStoresWithFilter({
        isFavorite: isFavoriteFilter,
        targetCustomer: targetCustomerFilter,
      });

      setStores(stores);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    fetchStores();
  }, [isFavoriteFilter, targetCustomerFilter]);

  return (
    <StoresContext.Provider
      value={{
        stores,
        getFilterValue,
        setFilterValue,
        clearFilters,
      }}
    >
      {children}
    </StoresContext.Provider>
  );
}
