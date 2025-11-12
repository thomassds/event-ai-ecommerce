"use client";

import {
  checkEmailExistsAction,
  registerAction,
  signInAction,
} from "@/actions";
import { useAppSelector } from "./use-app-selector";
import { useAppDispatch } from "./use-app-dispatch";
import { setIsLoggedIn, setToken, setUser } from "@/store/slices/auth-slice";
import { jwtDecode } from "jwt-decode";
import { ICreateUser, User } from "@/interfaces";
import { useState } from "react";

interface UseAppAuthReturn {
  isLoggedIn: boolean;
  signIn: (params: { email: string; password: string }) => Promise<void>;
  user: User | null;
  isLoading: boolean;
  signOut: () => void;
  register: (data: ICreateUser) => Promise<void>;
  checkIfEmailExists: (email: string) => Promise<boolean>;
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

    handleToken(response.token);

    setIsLoading(false);
  };

  const signOut = () => {
    setIsLoading(true);
    try {
      dispatch(setToken());
      dispatch(setUser(null));
      dispatch(setIsLoggedIn(false));
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: ICreateUser) => {
    setIsLoading(true);
    try {
      const response = await registerAction(data);

      if (!response?.data?.token) {
        throw new Error("Falha ao autenticar usuário.");
      }

      handleToken(response.data.token);
    } catch (error) {
      console.error("Registration error:", error);
      throw new Error("Falha ao criar usuário.");
    } finally {
      setIsLoading(false);
    }
  };

  const checkIfEmailExists = async (email: string): Promise<boolean> => {
    try {
      const response = await checkEmailExistsAction(email);

      if (!response?.data) {
        throw new Error("Falha ao verificar existência de email.");
      }

      return response?.data?.exists || false;
    } catch (error) {
      console.error("Error checking email existence:", error);
      throw new Error("Falha ao verificar existência de email.");
    }
  };

  const handleToken = (token: string) => {
    dispatch(setToken(token));
    const user: User = jwtDecode(token);

    dispatch(setUser(user));
    dispatch(setIsLoggedIn(true));
  };

  return {
    isLoggedIn,
    signIn,
    user,
    isLoading,
    signOut,
    register,
    checkIfEmailExists,
  };
};
