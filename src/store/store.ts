import { configureStore } from '@reduxjs/toolkit';
import symbolReducer from '../features/symbols/symbolsSlice';
import shirtsReducer from '../features/shirts/shirtsSlice';
import orderReducer from '../features/order/orderSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    symbols: symbolReducer,
    shirts: shirtsReducer,
    order: orderReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();