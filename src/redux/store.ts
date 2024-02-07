import { configureStore } from '@reduxjs/toolkit'
import currentNoteReducer from './currentNoteSlice'

const store = configureStore({
  reducer: {
    currentNote: currentNoteReducer,
  },
  devTools: true,
})

export default store
