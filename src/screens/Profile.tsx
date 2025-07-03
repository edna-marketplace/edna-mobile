import { Header } from "@/components/@ui/Header";
import {
  Box,
  Center,
  HStack,
  Image,
  Pressable,
  Text,
  VStack,
} from "@gluestack-ui/themed";
import { AuthenticatedUserDTO } from "@/dtos/AuthenticatedUserDTO";
import { useCallback, useState } from "react";
import { getAuthenticatedUser } from "@/api/get-authenticated-user";
import { Loading } from "@/components/Loading";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Card } from "@/components/@ui/Card";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";

import IdentificationCard from "phosphor-react-native/src/icons/IdentificationCard";
import BookmarkSimple from "phosphor-react-native/src/icons/BookmarkSimple";
import Heart from "phosphor-react-native/src/icons/Heart";
import ClipboardText from "phosphor-react-native/src/icons/ClipboardText";
import CaretRight from "phosphor-react-native/src/icons/CaretRight";

import logoImg from "@/assets/logo/logo.png";
import { AppNavigatorRoutesProps } from "@/routes/app.routes";
import { useAuth } from "@/hooks/useAuth";

export function Profile() {
  const [user, setUser] = useState<AuthenticatedUserDTO | null>(null);

  const { signOut } = useAuth();

  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const theme = gluestackUIConfig.tokens.colors;

  function handleProfileDetails() {
    user && navigate("profileDetails");
  }

  function handleOrders() {
    navigate("orders");
  }

  function handleSavedClothes() {
    navigate("savedClothes");
  }

  function handleFavoriteStores() {
    navigate("favoriteStores");
  }

  async function getAuthenticatedUserData() {
    const data = await getAuthenticatedUser();

    setUser(data);
  }

  useFocusEffect(
    useCallback(() => {
      getAuthenticatedUserData();
    }, [])
  );

  return (
    <VStack flex={1} pt="$14">
      <Header title={user ? user.name : "..."} onSignOut={signOut} />
      {!user ? (
        <Loading />
      ) : (
        <VStack flex={1} pt="$7" px="$6" gap="$6">
          <Pressable onPress={handleProfileDetails}>
            <Card alignItems="center">
              <IdentificationCard size={30} color={theme.base100} />

              <VStack>
                <Text fontFamily="$title" fontSize="$lg" color="$base100">
                  Dados da conta
                </Text>

                <Text fontFamily="$default" fontSize="$sm" color="$base300">
                  Minhas informações da conta
                </Text>
              </VStack>

              <Box ml="auto">
                <CaretRight />
              </Box>
            </Card>
          </Pressable>

          <Pressable onPress={handleOrders}>
            <Card alignItems="center">
              <ClipboardText size={30} color={theme.base100} />

              <VStack>
                <Text fontFamily="$title" fontSize="$lg" color="$base100">
                  Pedidos
                </Text>

                <Text fontFamily="$default" fontSize="$sm" color="$base300">
                  Meus pedidos
                </Text>
              </VStack>

              <Box ml="auto">
                <CaretRight />
              </Box>
            </Card>
          </Pressable>

          <Pressable onPress={handleSavedClothes}>
            <Card alignItems="center">
              <BookmarkSimple size={30} color={theme.base100} />

              <VStack>
                <Text fontFamily="$title" fontSize="$lg" color="$base100">
                  Peças salvas
                </Text>

                <Text fontFamily="$default" fontSize="$sm" color="$base300">
                  Minhas peças salvas
                </Text>
              </VStack>

              <Box ml="auto">
                <CaretRight />
              </Box>
            </Card>
          </Pressable>

          <Pressable onPress={handleFavoriteStores}>
            <Card alignItems="center">
              <Heart size={30} color={theme.base100} />

              <VStack>
                <Text fontFamily="$title" fontSize="$lg" color="$base100">
                  Brechós favoritos
                </Text>

                <Text fontFamily="$default" fontSize="$sm" color="$base300">
                  Meus brechós favoritos
                </Text>
              </VStack>

              <Box ml="auto">
                <CaretRight />
              </Box>
            </Card>
          </Pressable>

          <Center gap="$5">
            <Image source={logoImg} alt="" w={175} h={75} />

            <Text fontFamily="$title" fontSize="$xs" color="$base300">
              edna © {new Date().getFullYear()} - Todos direitos reservados
            </Text>
          </Center>
        </VStack>
      )}
    </VStack>
  );
}
