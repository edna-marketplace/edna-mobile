import { fetchStoresWithFilter } from "@/api/fetch-stores-with-filter";
import { StoreSummaryDTO } from "@/dtos/StoreSummaryDTO";
import { createContext, ReactNode, useEffect, useState } from "react";
import * as Location from "expo-location";

export type StoresContextDataProps = {
  fetchStores: () => Promise<StoreSummaryDTO[]>;
  getFilterValue: (filterType: string) => string | boolean | undefined;
  setFilterValue: (filterType: string, value: string | boolean) => void;
  clearFilters: () => void;
  isLoading: boolean;
  filtersChanged: boolean;
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
  const [isLoading, setIsLoading] = useState(false);

  const [filtersChanged, setFiltersChanged] = useState(false);

  const [customerLocation, setCustomerLocation] =
    useState<Location.LocationObject>({} as Location.LocationObject);

  const [nameFilter, setNameFilter] = useState("");
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
    filterType === "NAME" && setNameFilter(value);

    filterType === "IS_FAVORITE" && setIsFavoriteFilter(value);

    filterType === "TARGET_CUSTOMER" && setTargetCustomerFilter(value);

    setFiltersChanged(!filtersChanged);
  }

  function clearFilters() {
    setIsFavoriteFilter(false);
    setTargetCustomerFilter("ALL");
  }

  async function getCustomerLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      throw new Error("Permissão de acesso a localização negada");
    }

    let location = await Location.getCurrentPositionAsync({});
    setCustomerLocation(location);
  }

  async function fetchStores() {
    try {
      setIsLoading(true);
      const { stores } = await fetchStoresWithFilter({
        name: nameFilter,
        isFavorite: isFavoriteFilter,
        targetCustomer: targetCustomerFilter,
        // customerLat: customerLocation.coords.latitude,
        // customerLon: customerLocation.coords.longitude,
      });

      return stores;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <StoresContext.Provider
      value={{
        fetchStores,
        getFilterValue,
        setFilterValue,
        clearFilters,
        isLoading,
        filtersChanged,
      }}
    >
      {children}
    </StoresContext.Provider>
  );
}
