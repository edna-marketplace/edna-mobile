import tshirtImg from "@/assets/categories/tshirt.png";
import socialshirtImg from "@/assets/categories/socialshirt.png";
import dressImg from "@/assets/categories/dress.png";
import pantsImg from "@/assets/categories/pants.png";
import shortsImg from "@/assets/categories/shorts.png";
import hoodieImg from "@/assets/categories/hoodie.png";

import { gluestackUIConfig } from "../../config/gluestack-ui.config";

import { CategoryDTO } from "@/dtos/CategoryDTO";

const theme = gluestackUIConfig.tokens.colors;

export const categories: CategoryDTO[] = [
  {
    category: "T_SHIRT",
    displayName: "Camisetas",
    image: tshirtImg,
    bgColor: theme.blueDark,
  },
  {
    category: "SOCIAL_SHIRT",
    displayName: "Camisas Sociais",
    image: socialshirtImg,
    bgColor: theme.orangeDark,
  },
  {
    category: "DRESS",
    displayName: "Vestidos",
    image: dressImg,
    bgColor: theme.redDark,
  },
  {
    category: "PANTS",
    displayName: "Calças",
    image: pantsImg,
    bgColor: theme.blueDark,
  },
  {
    category: "SHORTS",
    displayName: "Shorts & Bermudas",
    image: shortsImg,
    bgColor: theme.orangeDark,
  },
  {
    category: "JACKET_HOODIE",
    displayName: "Jaquetas & Moletons",
    image: hoodieImg,
    bgColor: theme.redDark,
  },
  {
    category: "SUIT",
    displayName: "Ternos",
    image: hoodieImg,
    bgColor: theme.blueDark,
  },
  {
    category: "ACTIVEWEAR",
    displayName: "Roupas esportivas",
    image: hoodieImg,
    bgColor: theme.orangeDark,
  },
  {
    category: "UNDERWEAR",
    displayName: "Roupas íntimas",
    image: hoodieImg,
    bgColor: theme.redDark,
  },
  {
    category: "FOOTWEAR",
    displayName: "Calçados",
    image: hoodieImg,
    bgColor: theme.blueDark,
  },
  {
    category: "ACCESSORIES",
    displayName: "Acessórios",
    image: hoodieImg,
    bgColor: theme.orangeDark,
  },
  {
    category: "SLEEPWEAR",
    displayName: "Pijamas",
    image: hoodieImg,
    bgColor: theme.redDark,
  },
  {
    category: "SWIMWEAR",
    displayName: "Roupas de banho",
    image: hoodieImg,
    bgColor: theme.blueDark,
  },
  {
    category: "OTHER",
    displayName: "Outras",
    image: hoodieImg,
    bgColor: theme.blueDark,
  },
];
