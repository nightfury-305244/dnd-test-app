import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderData, OrderState } from '../../types/types';
import { createOrder } from './orderActions';

const initialState: OrderState = {
  order: null,
  status: 'idle',
  error: null
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<OrderData>) => {
        state.status = 'succeeded';
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.status = 'failed';
        state.error = action.payload || 'An undefined error occurred';
      });
  }
});

export default orderSlice.reducer;
