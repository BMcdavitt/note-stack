import { createSlice } from '@reduxjs/toolkit'

const currentNoteSlice = createSlice({
  name: 'currentNote',
  initialState: {
    id: null,
    text: {},
  },
  reducers: {
    setCurrentNote: (state, action) => {
      state.initialState.text = action.payload
    },
  },
})

export const { setCurrentNote } = currentNoteSlice.actions
export default currentNoteSlice.reducer
