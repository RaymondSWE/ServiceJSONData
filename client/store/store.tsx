import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebar-slice";
import localeReducer from "./locale-slice";

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    locale: localeReducer,

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
