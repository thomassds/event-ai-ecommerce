import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "./persist-storage";

import uiReducer from "./slices/ui-slice";
import checkoutReducer from "./slices/checkout-slice";
import authReducer from "./slices/auth-slice";
import tenantReducer from "./slices/tenant-slice";
import categoryReducer from "./slices/category-slice";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["ui", "auth", "tenant", "category"],
};

const rootReducer = combineReducers({
  ui: uiReducer,
  checkout: checkoutReducer,
  auth: authReducer,
  tenant: tenantReducer,
  category: categoryReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ["_persist"],
      },
    }),
});

export const persistor = persistStore(store);

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
