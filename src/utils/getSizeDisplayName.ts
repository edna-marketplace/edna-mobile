import { clotheFilters } from "@/data/clothe-filters";
import { ClotheSummaryDTO } from "@/dtos/ClotheSummaryDTO";

export function getSizeDisplayName(clothe: ClotheSummaryDTO) {
  let size =
    clothe.size === "OTHER"
      ? clothe.sizeOther || "Outro"
      : clotheFilters[2].options.find((b) => b.value === clothe.size)
          ?.displayName;

  return size;
}
