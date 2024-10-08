import { SerializedEditorState } from 'lexical'

interface INotebooksData {
  id: number
  title: string
  description: string
}

export interface INotebookChapter {
  id: number
  title: string
  notes?: SerializedEditorState | {} | null
  childChapters: number[]
  notebookId?: number | null
}

export const NotebooksData: INotebooksData[] = [
  { id: 1, title: 'Notebook 1', description: 'My Work Notebook' },
  { id: 2, title: 'Notebook 2', description: 'My Quick Notebook' },
  { id: 3, title: 'Notebook 3', description: 'Random Ideas' },
  { id: 4, title: 'Dreams', description: 'My Dreams Notebook' },
]

export const NotebookChapters: INotebookChapter[] = [
  { id: 1, title: '2023', notes: undefined, childChapters: [2], notebookId: 15 },
  { id: 2, title: 'December', notes: undefined, childChapters: [3, 4] },
  {
    id: 3,
    title: '28',
    notes: {
      root: {
        children: [
          {
            children: [
              { detail: 0, format: 0, mode: 'normal', style: '', text: "Let's test", type: 'text', version: 1 },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
          },
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'With some Real Text',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    },
    childChapters: [17, 18],
  },
  {
    id: 4,
    title: '29',
    notes: {
      root: {
        children: [
          {
            children: [
              {
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'For the love of everything',
                type: 'text',
                version: 1,
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            type: 'paragraph',
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        type: 'root',
        version: 1,
      },
    },
    childChapters: [19],
  },
  { id: 5, title: '2024', notes: undefined, childChapters: [6], notebookId: 15 },
  { id: 6, title: 'January', notes: undefined, childChapters: [7, 8] },
  { id: 7, title: '1', notes: undefined, childChapters: [] },
  { id: 8, title: '2', notes: undefined, childChapters: [] },
  { id: 9, title: 'Quick Workbook', notes: undefined, childChapters: [], notebookId: 16 },
  { id: 10, title: 'Good Ideas', notes: undefined, childChapters: [11, 12], notebookId: 17 },
  { id: 11, title: 'Idea 1', notes: undefined, childChapters: [] },
  { id: 12, title: 'Idea 2', notes: undefined, childChapters: [] },
  { id: 13, title: 'Bad Ideas', notes: undefined, childChapters: [14], notebookId: 17 },
  { id: 14, title: 'Idea 1', notes: undefined, childChapters: [] },
  { id: 15, title: 'Good Dreams', notes: undefined, childChapters: [], notebookId: 18 },
  { id: 16, title: 'Bad Dreams', notes: undefined, childChapters: [], notebookId: 18 },
  { id: 17, title: 'Doc This Way Weekly Update', notes: undefined, childChapters: [] },
  { id: 18, title: 'Surgery Weekly Update', notes: undefined, childChapters: [] },
  { id: 19, title: 'DisObey Weekly Update', notes: undefined, childChapters: [] },
]
