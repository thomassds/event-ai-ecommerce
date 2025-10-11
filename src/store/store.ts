import { configureStore, combineReducers, Action } from "@reduxjs/toolkit";
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

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["ui", "checkout"],
};

const combinedReducers = combineReducers({
  ui: persistReducer(persistConfig, uiReducer),
  checkout: checkoutReducer,
});

export type RootState = ReturnType<typeof combinedReducers>;

const rootReducer = (
  state: RootState | undefined,
  action: Action
): RootState => {
  return combinedReducers(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
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
