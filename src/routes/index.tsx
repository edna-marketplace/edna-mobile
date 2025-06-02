import { Box } from "@gluestack-ui/themed";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { gluestackUIConfig } from "../../config/gluestack-ui.config";
import { AppRoutes } from "./app.routes";
import { useAuth } from "@/hooks/useAuth";
import { Loading } from "@/components/Loading";
import { AuthRoutes } from "./auth.routes";

export function Routes() {
  const { authState, isLoadingUserStorageData } = useAuth();

  const theme = DefaultTheme;
  theme.colors.background = gluestackUIConfig.tokens.colors.base700;

  if (isLoadingUserStorageData) {
    return <Loading />;
  }

  return (
    <Box flex={1} bg="$background">
      <NavigationContainer>
        {authState?.authenticated ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </Box>
  );
}
