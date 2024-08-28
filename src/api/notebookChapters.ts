import axios from 'axios'
import { getNodeApiBaseUrl } from './base'

export const notebookChaptersApi = {
  fetchNotebookChapters(notebookId: number) {
    const url = `${getNodeApiBaseUrl()}/notebookChapters/notebook/${notebookId}`
    return axios.get(url)
  },
}
