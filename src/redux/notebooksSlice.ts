import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { notebookApi } from '../api/notebook'

export interface INotebook {
  id: number
  title: string
  description: string
}

export interface INotebooksState {
  notebooks: INotebook[]
}

const initialState: INotebooksState = {
  notebooks: [],
}

export const fetchNotebooks = createAsyncThunk<{ data: INotebook[] }, void, { state: any }>(
  'notebooks/fetchNotebooks',
  async () => {
    try {
      const response = await notebookApi.fetchNotebooks()

      return { data: response.data } as { data: INotebook[] }
    } catch (error) {
      console.error('error', error)
      throw error
    }
  }
)

const currentNotebooksSlice = createSlice({
  name: 'notebooks',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchNotebooks.fulfilled, (state, action) => {
      // @ts-ignore
      state.notebooks = action.payload.data
    })
  },
})

export default currentNotebooksSlice.reducer

export const listNotebooks = (state: any) => state.notebooks.notebooks
