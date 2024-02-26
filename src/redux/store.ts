import { configureStore } from '@reduxjs/toolkit'
import currentNoteReducer from './currentNoteSlice'

const store = configureStore({
  reducer: {
    currentNote: currentNoteReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export default store
