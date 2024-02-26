import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'

interface ICurrentNoteState {
  id: number | null
  text: {}
}

const initialState: ICurrentNoteState = {
  id: null,
  text: {},
}

const currentNoteSlice = createSlice({
  name: 'currentNote',
  initialState,
  reducers: {
    setCurrentNote: (state, action) => {
      state.id = action.payload
    },
    setCurrentNoteText: (state, action) => {
      state.text = action.payload
    },
  },
})

export const { setCurrentNote } = currentNoteSlice.actions
export default currentNoteSlice.reducer

export const selectCurrentNote = (state: RootState) => state.currentNote.id
export const selectCurrentNoteText = (state: RootState) => state.currentNote.text
