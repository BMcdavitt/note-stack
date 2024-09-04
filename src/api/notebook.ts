import axios from 'axios'
import { getNodeApiBaseUrl } from './base'

export const notebookApi = {
  fetchNotebooks() {
    const url = `${getNodeApiBaseUrl()}/notebook`
    return axios.get(url)
  },
  createNotebook(title: string, description: string) {
    const url = `${getNodeApiBaseUrl()}/notebook`
    return axios.post(url, { title, description })
  },
}
