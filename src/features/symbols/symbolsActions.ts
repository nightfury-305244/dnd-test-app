import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../constants/apiConstants";
import { Symbol } from "../../types/apiTypes";

export const getSymbols = createAsyncThunk<
  Symbol[],
  void,
  { rejectValue: string }
>("symbols/getSymbols", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/symbols`);
    if (!response.ok) {
      throw new Error("Failed to fetch symbols");
    }
    return response.json();
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
