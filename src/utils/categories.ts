import tshirtImg from "@/assets/categories/tshirt.png";
import socialshirtImg from "@/assets/categories/socialshirt.png";
import dressImg from "@/assets/categories/dress.png";
import pantsImg from "@/assets/categories/pants.png";
import shortsImg from "@/assets/categories/shorts.png";
import hoodieImg from "@/assets/categories/hoodie.png";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";

const theme = gluestackUIConfig.tokens.colors;

export const categories = [
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
    bgColor: theme.blueDark,
  },
  {
    category: "DRESS",
    displayName: "Vestidos",
    image: dressImg,
    bgColor: theme.blueDark,
  },
  {
    category: "PANTS",
    displayName: "Calças",
    image: pantsImg,
    bgColor: theme.orangeDark,
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
    bgColor: theme.redDark,
  },
  {
    category: "ACTIVEWEAR",
    displayName: "Roupas esportivas",
    image: hoodieImg,
    bgColor: theme.blueDark,
  },
  {
    category: "UNDERWEAR",
    displayName: "Roupas íntimas",
    image: hoodieImg,
    bgColor: theme.orangeDark,
  },
  {
    category: "FOOTWEAR",
    displayName: "Calçados",
    image: hoodieImg,
    bgColor: theme.redDark,
  },
  {
    category: "ACCESSORIES",
    displayName: "Acessórios",
    image: hoodieImg,
    bgColor: theme.blueDark,
  },
  {
    category: "SLEEPWEAR",
    displayName: "Pijamas",
    image: hoodieImg,
    bgColor: theme.orangeDark,
  },
  {
    category: "SWIMWEAR",
    displayName: "Roupas de banho",
    image: hoodieImg,
    bgColor: theme.blueDark,
  },
];
