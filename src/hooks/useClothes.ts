import { ClothesContext } from "@/contexts/ClothesContext";
import { useContext } from "react";

export function useClothes() {
  const context = useContext(ClothesContext);

  return context;
}
