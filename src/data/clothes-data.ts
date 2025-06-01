import { ClotheSummaryDTO } from "@/dtos/ClotheSummaryDTO";

import clotheTemplateImg from "@/assets/clothe-template.png";
import storeTemplateImg from "@/assets/store-template.png";

export const clothesData: ClotheSummaryDTO[] = [
  {
    id: "1",
    name: "Camiseta Nike Dri-FIT Preta",
    priceInCents: 5999,
    brand: "Nike",
    size: "G",
    imageURL: clotheTemplateImg,
    storeImageURL: storeTemplateImg,
  },
  {
    id: "2",
    name: "Jaqueta Adidas Essentials",
    priceInCents: 12999,
    brand: "Adidas",
    size: "M",
    imageURL: clotheTemplateImg,
    storeImageURL: storeTemplateImg,
  },
  {
    id: "3",
    name: "Calça Jeans Slim Levis",
    priceInCents: 8999,
    brand: "Levi's",
    size: "42",
    imageURL: clotheTemplateImg,
    storeImageURL: storeTemplateImg,
  },
  {
    id: "4",
    name: "Camiseta Puma Active Branca",
    priceInCents: 5499,
    brand: "Puma",
    size: "P",
    imageURL: clotheTemplateImg,
    storeImageURL: storeTemplateImg,
  },
  {
    id: "5",
    name: "Moletom Tommy Hilfiger Azul",
    priceInCents: 14999,
    brand: "Tommy Hilfiger",
    size: "GG",
    imageURL: clotheTemplateImg,
    storeImageURL: storeTemplateImg,
  },
  {
    id: "6",
    name: "Bermuda Oakley Cargo Cinza",
    priceInCents: 6999,
    brand: "Oakley",
    size: "M",
    imageURL: clotheTemplateImg,
    storeImageURL: storeTemplateImg,
  },
];
