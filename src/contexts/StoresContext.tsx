import { fetchStoresWithFilter } from "@/api/fetch-stores-with-filter";
import { StoreSummaryDTO } from "@/dtos/StoreSummaryDTO";
import { createContext, ReactNode, useEffect, useState } from "react";
import * as Location from "expo-location";

export type StoresContextDataProps = {
  stores: StoreSummaryDTO[];
  fetchStores: () => Promise<void>;
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
  const [customerLocation, setCustomerLocation] =
    useState<Location.LocationObject>({} as Location.LocationObject);

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
      const { stores } = await fetchStoresWithFilter({
        isFavorite: isFavoriteFilter,
        targetCustomer: targetCustomerFilter,
        // customerLat: customerLocation.coords.latitude,
        // customerLon: customerLocation.coords.longitude,
      });

      setStores(stores);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    fetchStores();
    // getCustomerLocation();
  }, [isFavoriteFilter, targetCustomerFilter]);

  return (
    <StoresContext.Provider
      value={{
        stores,
        fetchStores,
        getFilterValue,
        setFilterValue,
        clearFilters,
      }}
    >
      {children}
    </StoresContext.Provider>
  );
}
