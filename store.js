import { configureStore } from '@reduxjs/toolkit'
import basketSlice from './features/basketSlice'
import restourantSlice from './features/restourantSlice'
export const store = configureStore({
  reducer: {
    basket: basketSlice,
    restourant: restourantSlice
  },
})