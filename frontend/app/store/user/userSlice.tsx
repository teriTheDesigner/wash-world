import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  id?: number;
  email?: string;
  name?: string;
  role?: string;
  image?: string | null;
}

const initialState: UserState = {};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      return action.payload;
    },
    clearUser() {
      return {};
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
