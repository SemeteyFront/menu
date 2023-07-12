import { configureStore } from '@reduxjs/toolkit'
import clickSlice  from "./Slice";
const store = configureStore({
  reducer: {
    clickSlice
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch