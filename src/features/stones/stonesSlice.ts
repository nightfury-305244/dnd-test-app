import { createSlice } from '@reduxjs/toolkit';
import { getStones } from './stonesActions';
import { Stone } from '../../types/apiTypes';

interface StonesState {
  items: Stone[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: StonesState = {
  items: [],
  status: 'idle',
  error: null
};

const stoneSlice = createSlice({
  name: 'stones',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getStones.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getStones.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(getStones.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

export default stoneSlice.reducer;
