import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "../slices/apiSlice"
import appSlice from "../slices/appSlice"

export const store = configureStore({
  reducer: {
    app: appSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})
