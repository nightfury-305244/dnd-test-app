import { createAsyncThunk } from "@reduxjs/toolkit";
import { StoneType } from "../../types/types";

export const getStones = createAsyncThunk<
  StoneType[],
  void,
  { rejectValue: string }
>("stones/getStones", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/stones`);
    if (!response.ok) {
      throw new Error("Failed to fetch stones");
    }
    return response.json();
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
