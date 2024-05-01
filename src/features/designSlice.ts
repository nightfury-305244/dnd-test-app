import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DesignState, Shirt, PlateItem, Position, IconItem } from "../types";

const initialState: DesignState = {
  selectedShirt: null,
  currentStep: "select",
  icons: [],
  plates: [],
};

export const designSlice = createSlice({
  name: "design",
  initialState,
  reducers: {
    selectShirt: (state, action: PayloadAction<Shirt>) => {
      state.selectedShirt = action.payload;
      localStorage.setItem("selectedShirt", JSON.stringify(action.payload));
    },
    setStep: (state, action: PayloadAction<"select" | "design" | "order">) => {
      state.currentStep = action.payload;
    },
    addIcon: (state, action: PayloadAction<IconItem>) => {
      state.icons.push(action.payload);
    },
    moveIcon: (
      state,
      action: PayloadAction<{ id: string; position: Position }>
    ) => {
      const icon = state.icons.find((icon) => icon.id === action.payload.id);
      if (icon) {
        icon.position = action.payload.position;
      }
    },
    removeIcon: (state, action: PayloadAction<string>) => {
      state.icons = state.icons.filter((icon) => icon.id !== action.payload);
    },
    addPlate: (state, action: PayloadAction<PlateItem>) => {
      state.plates.push(action.payload);
    },
    movePlate: (
      state,
      action: PayloadAction<{ id: string; position: Position }>
    ) => {
      const plate = state.plates.find(
        (plate) => plate.id === action.payload.id
      );
      if (plate) {
        plate.position = action.payload.position;
      }
    },
    removePlate: (state, action: PayloadAction<string>) => {
      state.plates = state.plates.filter(
        (plate) => plate.id !== action.payload
      );
    },
  },
});

export const {
  selectShirt,
  setStep,
  addIcon,
  moveIcon,
  removeIcon,
  addPlate,
  movePlate,
  removePlate,
} = designSlice.actions;

export default designSlice.reducer;
