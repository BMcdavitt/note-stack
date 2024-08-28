import { Typography } from 'antd'
import { useSelector } from 'react-redux'
import { getNotebookById } from '../../../redux/notebooksSlice'

interface IPageHeader {
  notebookId: string
}

const PageHeader = ({ notebookId }: IPageHeader) => {
  const notebookData = useSelector((state) => getNotebookById(state, parseInt(notebookId)))

  return <Typography>{`${notebookData?.title} - ${notebookData?.description}`}</Typography>
}

export default PageHeader
