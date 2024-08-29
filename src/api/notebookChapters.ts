import axios from 'axios'
import { getNodeApiBaseUrl } from './base'

export const notebookChaptersApi = {
  fetchNotebookChapters(notebookId: number) {
    const url = `${getNodeApiBaseUrl()}/notebookChapters/notebook/${notebookId}`
    return axios.get(url)
  },
}

export const updateNotebookChapterText = async (notebookChapterId: number, text: string) => {
  const url = `${getNodeApiBaseUrl()}/notebookChapters/${notebookChapterId}`
  const response = await axios.put(url, { notes: text })
  return response.data
}
