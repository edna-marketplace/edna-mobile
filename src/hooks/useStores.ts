import { StoresContext } from "@/contexts/StoresContext";
import { useContext } from "react";

export function useStores() {
  const context = useContext(StoresContext);

  return context;
}
