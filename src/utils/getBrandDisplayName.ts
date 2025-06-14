import { clotheFilters } from "@/data/clothe-filters";
import { ClotheDetailsDTO } from "@/dtos/ClotheDetailsDTO";
import { ClotheSummaryDTO } from "@/dtos/ClotheSummaryDTO";

export function getBrandDisplayName(
  clothe: ClotheSummaryDTO | ClotheDetailsDTO
) {
  let brandName =
    clothe.brand === "OTHER"
      ? clothe.brandOther || "Sem Marca"
      : clotheFilters[1].options.find((b) => b.value === clothe.brand)
          ?.displayName;

  return brandName;
}
