import { StatusBar } from "react-native";

import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "./config/gluestack-ui.config";

import { Fraunces_900Black, useFonts } from "@expo-google-fonts/fraunces";
import {
  Poppins_400Regular,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { Routes } from "@/routes";

import { Loading } from "@/components/Loading";
import { AuthContextProvider } from "@/contexts/AuthContext";
import { ClothesContextProvider } from "@/contexts/ClothesContext";
import { StoresContext, StoresContextProvider } from "@/contexts/StoresContext";

import { StripeProvider } from "@stripe/stripe-react-native";

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
          <StoresContextProvider>
            <StripeProvider publishableKey="pk_test_51RdIQ22ebau4YJtYC8xQlnBZiZ5FHWV9awXY90iJ6kmcTHJbBac65hYmFqsilKfsxHlMRKQbZCCQjiNl4rIlfDNo00AUjqjLnv">
              <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
              />
              {fontsLoaded ? <Routes /> : <Loading />}
            </StripeProvider>
          </StoresContextProvider>
        </ClothesContextProvider>
      </AuthContextProvider>
    </GluestackUIProvider>
  );
}
