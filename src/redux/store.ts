import { configureStore } from '@reduxjs/toolkit'
import currentNoteReducer from './currentNoteSlice'
import notebooksReducer from './notebooksSlice'

const store = configureStore({
  reducer: {
    currentNote: currentNoteReducer,
    notebooks: notebooksReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export default store
