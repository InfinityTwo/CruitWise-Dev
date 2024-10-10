import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "./store";

export enum TransitionStage {
  BEGIN,
  NONE,
  END,
  LAST,
  FIRST,
}

interface DevelopmentState {
  isMockMode: boolean;
}

const initialState: DevelopmentState = {
  isMockMode: true,
};

export const developmentSlice = createSlice({
  name: "developmentMode",
  initialState,
  reducers: {
    setDisableMock: (state) => {
      state.isMockMode = false;
    },
  },
});

export const { setDisableMock } = developmentSlice.actions;

export const mockState = (state: RootState) => state.developmentMode.isMockMode;

export default developmentSlice.reducer;
