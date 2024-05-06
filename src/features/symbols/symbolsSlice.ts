import { createSlice } from '@reduxjs/toolkit';
import { getSymbols } from './symbolsActions';
import { Symbol } from '../../types/types';

interface SymbolsState {
  items: Symbol[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: SymbolsState = {
  items: [],
  status: 'idle',
  error: null
};

const symbolsSlice = createSlice({
  name: 'symbols',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSymbols.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getSymbols.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(getSymbols.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});

export default symbolsSlice.reducer;
