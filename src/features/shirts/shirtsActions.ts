import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../constants/apiConstants";
import { Shirt } from "../../types/apiTypes";

export const getShirts = createAsyncThunk<
  Shirt[],
  void,
  { rejectValue: string }
>("shirts/getShirts", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/shirts`);
    if (!response.ok) {
      throw new Error("Failed to fetch shirts");
    }
    return response.json();
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});
