import { configureStore } from '@reduxjs/toolkit'

import BoardsReducer from '../features/boardSlice'

export const store = configureStore({
  reducer: {
    board: BoardsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
