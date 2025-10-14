import { User } from "@/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  user: User | null;
  isLoggedIn: boolean;
  token?: string;
};

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  token: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthState["user"]>) {
      state.user = action.payload;
    },
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    setToken(state, action: PayloadAction<string | undefined>) {
      state.token = action.payload;
    },
  },
});

export const { setUser, setIsLoggedIn, setToken } = authSlice.actions;

export default authSlice.reducer;
