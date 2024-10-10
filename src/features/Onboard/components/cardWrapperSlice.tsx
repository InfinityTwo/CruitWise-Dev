import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../../../store/store";

export enum TransitionStage {
  BEGIN,
  NONE,
  END,
  LAST,
  FIRST,
}

interface CardWrapperState {
  transition: TransitionStage;
}

const initialState: CardWrapperState = {
  transition: TransitionStage.FIRST,
};

export const cardWrapperSlice = createSlice({
  name: "cardWrapper",
  initialState,
  reducers: {
    setTransition: (state, action: PayloadAction<TransitionStage>) => {
      state.transition = action.payload;
    },
    setStartTransition: (state) => {
      state.transition = TransitionStage.BEGIN;
    },
    setNoTransition: (state) => {
      state.transition = TransitionStage.NONE;
    },
    setEndTransition: (state) => {
      state.transition = TransitionStage.END;
    },
    setLastTransition: (state) => {
      state.transition = TransitionStage.LAST;
    },
    setFirstTransition: (state) => {
      state.transition = TransitionStage.FIRST;
    },
  },
});

export const {
  setTransition,
  setStartTransition,
  setNoTransition,
  setEndTransition,
  setLastTransition,
  setFirstTransition,
} = cardWrapperSlice.actions;

export const selectTransition = (state: RootState) => state.cardWrapper.transition;

export default cardWrapperSlice.reducer;
