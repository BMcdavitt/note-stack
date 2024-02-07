import { createSlice } from '@reduxjs/toolkit'

export interface ICurrentNoteSlice {
  id: Number | null
  text: {}
}

const initialState: ICurrentNoteSlice = {
  id: null,
  text: {},
}

const currentNoteSlice = createSlice({
  name: 'currentNote',
  initialState,
  reducers: {
    setCurrentNote: (state, action) => {
      state.id = action.payload.id
      state.text = action.payload.text
    },
  },
})

export const { setCurrentNote } = currentNoteSlice.actions
export default currentNoteSlice.reducer
