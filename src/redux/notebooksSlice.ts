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

export const deleteNotebook = createAsyncThunk<{ data: INotebook[] }, number, { state: any }>(
  'notebooks/deleteNotebook',
  async (id, thunkAPI) => {
    try {
      const response = await notebookApi.deleteNotebook(id)

      await thunkAPI.dispatch(fetchNotebooks())

      return { data: response.data } as { data: INotebook[] }
    } catch (error) {
      console.error('error', error)
      throw error
    }
  }
)

export const createNotebook = createAsyncThunk<
  { data: INotebook[] },
  { title: string; description: string },
  { state: any }
>('notebooks/createNotebook', async ({ title, description }, thunkAPI) => {
  try {
    const response = await notebookApi.createNotebook(title, description)

    await thunkAPI.dispatch(fetchNotebooks())

    return { data: response.data } as { data: INotebook[] }
  } catch (error) {
    console.error('error', error)
    throw error
  }
})

const currentNotebooksSlice = createSlice({
  name: 'notebooks',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchNotebooks.fulfilled, (state, action) => {
      state.notebooks = action.payload.data
    })
  },
})

export default currentNotebooksSlice.reducer

export const listNotebooks = (state: any) => state.notebooks.notebooks
export const getNotebookById = (state: any, notebookId: number) => {
  return state.notebooks.notebooks.find((notebook: INotebook) => notebook.id === notebookId)
}
