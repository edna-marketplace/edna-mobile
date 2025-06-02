import { StatusBar, View } from "react-native";

import { Fraunces_900Black, useFonts } from "@expo-google-fonts/fraunces";
import {
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import {
  Center,
  GluestackUIProvider,
  Heading,
  Text,
} from "@gluestack-ui/themed";
import { config } from "./config/gluestack-ui.config";
import { Loading } from "@/components/Loading";
import { ClotheCategories } from "@/screens/ClotheCategories";
import { Clothes } from "@/screens/Clothes";
import { ClothesContextProvider } from "@/contexts/ClothesContext";
import { Routes } from "@/routes";
import { SignIn } from "@/screens/SignIn";
import { SignUp } from "@/screens/SignUp";
import { AuthContextProvider } from "@/contexts/AuthContext";

export default function App() {
  const [fontsLoaded] = useFonts({
    Fraunces_900Black,
    Poppins_700Bold,
    Poppins_400Regular,
  });

  return (
    <GluestackUIProvider config={config}>
      <AuthContextProvider>
        <ClothesContextProvider>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          {fontsLoaded ? <Routes /> : <Loading />}
        </ClothesContextProvider>
      </AuthContextProvider>
    </GluestackUIProvider>
  );
}
