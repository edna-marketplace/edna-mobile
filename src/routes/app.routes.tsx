import { Platform } from "react-native";

import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import { gluestackUIConfig } from "../../config/gluestack-ui.config";

import House from "phosphor-react-native/src/icons/House";
import MagnifyingGlass from "phosphor-react-native/src/icons/MagnifyingGlass";
import SketchLogo from "phosphor-react-native/src/icons/SketchLogo";
import UserCircle from "phosphor-react-native/src/icons/UserCircle";

import { Home } from "@/screens/Home";
import { Profile } from "@/screens/Profile";
import { ClotheCategories } from "@/screens/ClotheCategories";
import { Clothes } from "@/screens/Clothes";
import { Text } from "@gluestack-ui/themed";
import { Feed } from "@/screens/Feed";
import { Stores } from "@/screens/Stores";
import { StoreDetails } from "@/screens/StoreDetails";
import { ClotheDetails } from "@/screens/ClotheDetails";
import { Purchase } from "@/screens/Purchase";
import { CompletedPurchase } from "@/screens/CompletedPurchase";
import { ProfileDetails } from "@/screens/ProfileDetails";
import { Orders } from "@/screens/Orders";
import { EvaluateOrder } from "@/screens/EvaluateOrder";

type AppRoutes = {
  home: undefined;
  categories: undefined;
  clothes: { category?: string; storeId?: string; storeName?: string };
  clothe: { id: string };
  stores: undefined;
  store: { id: string };
  feed: undefined;
  purchase: { id: string };
  completedPurchase: undefined;
  profile: undefined;
  profileDetails: undefined;
  savedClothes: undefined;
  favoriteStores: undefined;
  orders: undefined;
  evaluateOrder: { orderId: string };
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {
  const { tokens } = gluestackUIConfig;
  const iconSize = tokens.space["7"];

  return (
    <Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: tokens.colors.base700,
        tabBarInactiveTintColor: tokens.colors.base500,
        tabBarStyle: {
          backgroundColor: tokens.colors.base100,
          borderTopWidth: 0,
          height: Platform.OS === "android" ? 96 : 96,
          paddingBottom: tokens.space["12"],
          paddingTop: tokens.space["4"],
          paddingHorizontal: tokens.space["4"],
        },
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <House
              color={color}
              size={iconSize}
              weight={focused ? "fill" : "regular"}
            />
          ),
          tabBarLabel: ({ color }) => (
            <Text pt="$1" fontSize="$sm" fontFamily="$default" color={color}>
              Início
            </Text>
          ),
        }}
      />

      <Screen
        name="categories"
        component={ClotheCategories}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <MagnifyingGlass
              color={color}
              size={iconSize}
              weight={focused ? "fill" : "regular"}
            />
          ),
          tabBarLabel: ({ color }) => (
            <Text pt="$1" fontSize="$sm" fontFamily="$default" color={color}>
              Buscar
            </Text>
          ),
        }}
      />

      <Screen
        name="feed"
        component={Feed}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <SketchLogo
              color={color}
              size={iconSize}
              weight={focused ? "fill" : "regular"}
            />
          ),
          tabBarLabel: ({ color }) => (
            <Text pt="$1" fontSize="$sm" fontFamily="$default" color={color}>
              Feed
            </Text>
          ),
        }}
      />

      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <UserCircle
              color={color}
              size={iconSize}
              weight={focused ? "fill" : "regular"}
            />
          ),
          tabBarLabel: ({ color }) => (
            <Text pt="$1" fontSize="$sm" fontFamily="$default" color={color}>
              Perfil
            </Text>
          ),
        }}
      />

      <Screen
        name="clothes"
        component={Clothes}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
        }}
      />

      <Screen
        name="stores"
        component={Stores}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
        }}
      />

      <Screen
        name="store"
        component={StoreDetails}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
        }}
      />

      <Screen
        name="clothe"
        component={ClotheDetails}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
        }}
      />

      <Screen
        name="purchase"
        component={Purchase}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
        }}
      />

      <Screen
        name="completedPurchase"
        component={CompletedPurchase}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
        }}
      />

      <Screen
        name="profileDetails"
        component={ProfileDetails}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
        }}
      />

      <Screen
        name="orders"
        component={Orders}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
        }}
      />

      <Screen
        name="evaluateOrder"
        component={EvaluateOrder}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: { display: "none" },
        }}
      />
    </Navigator>
  );
}
