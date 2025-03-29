import type { UserType } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/redux/store"; // Adjust the import path as necessary

interface InitialType {
  isAuthenticated: boolean;
  user: UserType | null;
  isLoading: boolean;
  error: null;
  token: string | null; // Added token property
  orgId: string | null;
}

const initialState: InitialType = {
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,
  orgId: null,
} as InitialType;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => initialState,

    startAuthLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    authenticationSuccess: (state, action) => {
      state.token = action.payload.access_token; // Set token on successful authentication
      state.isAuthenticated = true;
      state.user = action.payload.data;
      state.isLoading = false;
    },
    setUser: (state, action) => {
      state.user = action.payload.data;
    },
    setOrgId: (state, action) => {
      state.orgId = action.payload;
    },
  },
});

export const {
  startAuthLoading,
  authenticationSuccess,
  setUser,
  setOrgId,
  logout,
} = authSlice.actions;

export default authSlice.reducer;

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
