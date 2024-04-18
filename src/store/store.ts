import { configureStore } from "@reduxjs/toolkit"

import rootReducer from "./rootReducer"
import apiClient from "../services/training-application-api-slice"

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false
    }).concat(apiClient.middleware)
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export default store
