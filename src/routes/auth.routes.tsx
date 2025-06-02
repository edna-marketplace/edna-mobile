import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { SignIn } from "@/screens/SignIn";
import { SignUp, SignUpFormData } from "@/screens/SignUp";
import { SelectStyle } from "@/screens/SelectStyle";

type AuthRoutes = {
  signIn: undefined;
  signUp: {
    signUpInfo?: SignUpFormData;
  };
  selectStyle: {
    signUpInfo: SignUpFormData;
  };
};

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="signIn" component={SignIn} />

      <Screen name="signUp" component={SignUp} />

      <Screen name="selectStyle" component={SelectStyle} />
    </Navigator>
  );
}
