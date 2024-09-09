import { configureStore } from '@reduxjs/toolkit'
import currentNoteReducer from './currentNoteSlice'
import notebooksReducer from './notebooksSlice'
import notebookChaptersReducer from './currentNotebook'

const store = configureStore({
  reducer: {
    currentNote: currentNoteReducer,
    notebooks: notebooksReducer,
    currentNotebook: notebookChaptersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export default store
