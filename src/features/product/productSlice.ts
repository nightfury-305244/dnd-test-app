import { createSlice } from '@reduxjs/toolkit';
import { Product } from '../../types/apiTypes';
import { getProduct } from './productActions';

interface ShirtsState {
  product: Product;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ShirtsState = {
  product: {},
  status: 'idle',
  error: null
};

const shirtsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

export default shirtsSlice.reducer;
