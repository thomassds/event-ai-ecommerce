import { signInAction } from "@/actions";
import { useAppSelector } from "./use-app-selector";
import { useAppDispatch } from "./use-app-dispatch";
import { setIsLoggedIn, setToken, setUser } from "@/store/slices/auth-slice";
import { jwtDecode } from "jwt-decode";
import { User } from "@/interfaces";
import { useState } from "react";

interface UseAppAuthReturn {
  isLoggedIn: boolean;
  signIn: (params: { email: string; password: string }) => Promise<void>;
  user: User | null;
  isLoading: boolean;
}

export const useAppAuth = (): UseAppAuthReturn => {
  const dispatch = useAppDispatch();
  const { isLoggedIn, user } = useAppSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(false);

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setIsLoading(true);
    const response = await signInAction(email, password);

    if (!response?.token) {
      throw new Error("Falha ao autenticar usuário.");
    }

    dispatch(setToken(response.token));
    const user: User = jwtDecode(response.token);

    dispatch(setUser(user));
    dispatch(setIsLoggedIn(true));

    setIsLoading(false);
  };

  return { isLoggedIn, signIn, user, isLoading };
};
