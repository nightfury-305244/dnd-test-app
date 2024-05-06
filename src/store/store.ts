import { configureStore } from "@reduxjs/toolkit";
import symbolReducer from "../features/symbols/symbolsSlice";
import shirtsReducer from "../features/shirts/shirtsSlice";
import orderReducer from "../features/order/orderSlice";
import productReducer from "../features/product/productSlice";

import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    symbols: symbolReducer,
    shirts: shirtsReducer,
    orders: orderReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
