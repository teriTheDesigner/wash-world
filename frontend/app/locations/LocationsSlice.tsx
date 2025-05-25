import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LocationsAPI } from "./LocationsAPI";
import { Location } from "./location.model";
import { RootState } from "../store/store";

export const fetchLocations = createAsyncThunk<
  Location[],
  void,
  { state: RootState }
>("locations/fetchAll", async (_, thunkAPI) => {
  const token = thunkAPI.getState().auth.token;
  if (!token) {
    throw new Error("No token found");
  }

  return await LocationsAPI.getLocations(token);
});

interface LocationState {
  locations: Location[];
  loading: boolean;
  error: string | null;
}

const initialState: LocationState = {
  locations: [],
  loading: false,
  error: null,
};

const locationSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.locations = action.payload;
      })
      .addCase(fetchLocations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to load locations";
      });
  },
});

export default locationSlice.reducer;
