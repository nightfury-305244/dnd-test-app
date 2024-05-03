import { createSlice } from '@reduxjs/toolkit';
import { getShirts } from './shirtsActions';
import { Shirt } from '../../types/apiTypes';

interface ShirtsState {
  items: Shirt[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ShirtsState = {
  items: [],
  status: 'idle',
  error: null
};

const shirtsSlice = createSlice({
  name: 'shirts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getShirts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getShirts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(getShirts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

export default shirtsSlice.reducer;
