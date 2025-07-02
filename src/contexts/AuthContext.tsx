import { UserDTO } from "@/dtos/UserDTO";
import { api } from "@/lib/axios";
import {
  storageAuthTokenGet,
  storageAuthTokenRemove,
  storageAuthTokenSave,
} from "@/storage/storageAuthToken";
import { storageUserRemove, storageUserSave } from "@/storage/storageUser";
import { createContext, ReactNode, useEffect, useState } from "react";
import { signIn as signInApi } from "@/api/sign-in";

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string, otp: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (updatedUser: UserDTO) => Promise<void>;
  isLoadingUserStorageData: boolean;
  authState?: {
    token: string | null;
    authenticated: boolean | null;
  };
};

interface AuthenticatedProps {
  token: string | null;
  authenticated: boolean | null;
}

export type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [authState, setAuthState] = useState<AuthenticatedProps>({
    token: null,
    authenticated: null,
  });
  const [isLoadingUserStorageData, setIsLoadingUserStorageData] =
    useState(true);

  async function userAndTokenUpdate(token: string) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    // setUser(userData);
  }

  async function storageUserAndTokenSave(token: string) {
    try {
      setIsLoadingUserStorageData(true);

      // await storageUserSave(userData);
      await storageAuthTokenSave({ token });
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function signIn(email: string, password: string, otp: string) {
    try {
      const token = await signInApi(email, password, otp);

      if (token) {
        await storageUserAndTokenSave(token);
        await userAndTokenUpdate(token);
        setAuthState({
          authenticated: true,
          token: token,
        });
      }
    } catch (error) {
      throw error;
    }
  }

  async function updateUser(updatedUser: UserDTO) {
    try {
      setUser(updatedUser);
      await storageUserSave(updatedUser);
    } catch (error) {
      throw error;
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorageData(true);

      setUser({} as UserDTO);

      await storageUserRemove();
      await storageAuthTokenRemove();
      setAuthState({
        authenticated: false,
        token: null,
      });
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  async function loadUserData() {
    try {
      setIsLoadingUserStorageData(true);

      // const loggedUser = await storageUserGet();
      const { token } = await storageAuthTokenGet();

      if (token) {
        await userAndTokenUpdate(token);
        setAuthState({
          authenticated: true,
          token: token,
        });
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoadingUserStorageData(false);
    }
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        updateUser,
        isLoadingUserStorageData,
        authState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
