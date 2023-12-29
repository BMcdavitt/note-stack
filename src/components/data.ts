interface INotebooksData {
  id: number
  title: string
  description: string
}

export interface INotebookChapter {
  id: number
  title: string
  notes?: string
  childChapters: number[]
  parent: string
  notebookId?: number | null
  parentChapter?: number | null
}

export const NotebooksData: INotebooksData[] = [
  { id: 1, title: 'Notebook 1', description: 'My Work Notebook' },
  { id: 2, title: 'Notebook 2', description: 'My Quick Notebook' },
  { id: 3, title: 'Notebook 3', description: 'Random Ideas' },
  { id: 4, title: 'Dreams', description: 'My Dreams Notebook' },
]

export const NotebookChapters: INotebookChapter[] = [
  { id: 1, title: '2023', notes: undefined, childChapters: [2], parent: 'notebook', notebookId: 1 },
  { id: 2, title: 'December', notes: undefined, childChapters: [3, 4], parent: 'chapter' },
  { id: 3, title: '28', notes: undefined, childChapters: [17, 18], parent: 'chapter' },
  { id: 4, title: '29', notes: undefined, childChapters: [19], parent: 'chapter' },
  { id: 5, title: '2024', notes: undefined, childChapters: [6], parent: 'notebook', notebookId: 1 },
  { id: 6, title: 'January', notes: undefined, childChapters: [7, 8], parent: 'chapter' },
  { id: 7, title: '1', notes: undefined, childChapters: [], parent: 'chapter' },
  { id: 8, title: '2', notes: undefined, childChapters: [], parent: 'chapter' },
  { id: 9, title: 'Quick Workbook', notes: undefined, childChapters: [], parent: 'notebook', notebookId: 2 },
  { id: 10, title: 'Good Ideas', notes: undefined, childChapters: [11, 12], parent: 'notebook', notebookId: 3 },
  { id: 11, title: 'Idea 1', notes: undefined, childChapters: [], parent: 'chapter' },
  { id: 12, title: 'Idea 2', notes: undefined, childChapters: [], parent: 'chapter' },
  { id: 13, title: 'Bad Ideas', notes: undefined, childChapters: [14], parent: 'notebook', notebookId: 3 },
  { id: 14, title: 'Idea 1', notes: undefined, childChapters: [], parent: 'chapter' },
  { id: 15, title: 'Good Dreams', notes: undefined, childChapters: [], parent: 'notebook', notebookId: 4 },
  { id: 16, title: 'Bad Dreams', notes: undefined, childChapters: [], parent: 'notebook', notebookId: 4 },
  { id: 17, title: 'Doc This Way Weekly Update', notes: undefined, childChapters: [], parent: 'chapter' },
  { id: 18, title: 'Surgery Weekly Update', notes: undefined, childChapters: [], parent: 'chapter' },
  { id: 19, title: 'DisObey Weekly Update', notes: undefined, childChapters: [], parent: 'chapter' },
]
