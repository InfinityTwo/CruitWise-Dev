import { configureStore } from "@reduxjs/toolkit";

import cardWrapperReducer from "../features/Onboard/components/cardWrapperSlice";
import developmentModeReducer from "../store/developmentTypeSlice";
// ...

export const store = configureStore({
  reducer: {
    cardWrapper: cardWrapperReducer,
    developmentMode: developmentModeReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
