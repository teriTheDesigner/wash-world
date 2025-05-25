import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import userReducer from "./user/userSlice";
import locationReducer from "../locations/LocationsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    locations: locationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
