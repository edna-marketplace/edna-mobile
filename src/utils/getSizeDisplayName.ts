import { clotheFilters } from "@/data/clothe-filters";
import { ClotheDetailsDTO } from "@/dtos/ClotheDetailsDTO";
import { ClotheSummaryDTO } from "@/dtos/ClotheSummaryDTO";

export function getSizeDisplayName(
  clothe: ClotheSummaryDTO | ClotheDetailsDTO
) {
  let size =
    clothe.size === "OTHER"
      ? clothe.sizeOther || "Outro"
      : clotheFilters[2].options.find((b) => b.value === clothe.size)
          ?.displayName;

  return size;
}
