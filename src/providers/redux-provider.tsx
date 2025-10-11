"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ReactNode } from "react";

import { persistor, store } from "@/store/store";

interface ReduxProviderProps {
  children: ReactNode;
}

export const ReduxProvider = ({ children }: ReduxProviderProps) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};
