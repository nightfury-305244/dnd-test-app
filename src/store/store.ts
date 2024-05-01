import { configureStore } from '@reduxjs/toolkit';
import designReducer from '../features/designSlice';

export const store = configureStore({
  reducer: {
    design: designReducer,
  },
});

// Type definitions for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
