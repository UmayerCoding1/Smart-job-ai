import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/user/userSlice";
import searchReducer from "../features/searchSlice";

export const store = configureStore({
  reducer: {
    authR: authReducer,
    searchR: searchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
