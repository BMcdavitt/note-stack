import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { notebookChaptersApi } from '../api/notebookChapters'

export interface IChapter {
  id: number
  title: string
  notes: string
  notebookId: number
  parentNotebookChapterId: number
}

export interface IChapterState {
  notebookId: number | null
  chapters: IChapter[]
}

export const fetchNotebookChapters = createAsyncThunk<{ data: IChapter[] }, number, { state: any }>(
  'currentNotebook/fetchNotebookChapters',
  async (notebookId) => {
    try {
      const response = await notebookChaptersApi.fetchNotebookChapters(notebookId)
      return { data: response.data } as { data: IChapter[] }
    } catch (error) {
      console.error('error', error)
      throw error
    }
  }
)

const initialState: IChapterState = {
  notebookId: null,
  chapters: [],
}

const currentNotebookSlice = createSlice({
  name: 'currentNotebook',
  initialState,
  reducers: {
    setCurrentNotebookId(state, action) {
      state.notebookId = action.payload
    },
    setCurrentNotebookChapterNotes(state, action) {
      const chapter = state.chapters.find((c) => c.id === action.payload.id)
      if (chapter) {
        chapter.notes = action.payload.notes
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchNotebookChapters.fulfilled, (state, action) => {
      state.chapters = action.payload.data
    })
  },
})

export const { setCurrentNotebookId, setCurrentNotebookChapterNotes } = currentNotebookSlice.actions
export default currentNotebookSlice.reducer

export const getCurrentNotebookChapters = (state: any) => state.currentNotebook.chapters
export const getCurrentNotebookId = (state: any) => state.currentNotebook.notebookId
export const getCurrentNotebookChapterNote = (state: any, chapterId: number) => {
  const chapter = state.currentNotebook.chapters.find((c: IChapter) => c.id === chapterId)
  return chapter ? chapter.notes : ''
}
