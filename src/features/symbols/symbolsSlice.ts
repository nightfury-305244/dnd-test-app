import { createSlice } from "@reduxjs/toolkit";
import { createSymbol, getSymbols } from "./symbolsActions";
import { SymbolType } from "../../types/types";

interface SymbolsState {
  items: SymbolType[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: SymbolsState = {
  items: [],
  status: "idle",
  error: null,
};

const symbolsSlice = createSlice({
  name: "symbols",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSymbols.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSymbols.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(getSymbols.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
    builder
      .addCase(createSymbol.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createSymbol.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(createSymbol.rejected, (state, action) => {
        (state.status = "failed"), (state.error = action.payload as string);
      });
  },
});

export default symbolsSlice.reducer;
