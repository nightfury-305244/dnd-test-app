import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product } from "../../types/apiTypes";
import { ProductInfo } from "../../types/types";

export const getProduct = createAsyncThunk<
  Product,
  void,
  { rejectValue: string }
>("product/getProduct", async (productId, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/product/${productId}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch shirts");
    }
    return response.json();
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const createProduct = createAsyncThunk<
  Product,
  ProductInfo,
  { rejectValue: string }
>("product/createProduct", async (productInfo, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/product`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productInfo),
      }
    );
    if (!response.ok) {
      const errorOrderMsg = await response.text();
      throw new Error(errorOrderMsg || 'Failed to create order');
    }

    return await response.json();
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});