import { useParams } from 'react-router-dom'
import { NotebooksData } from '../../data'
import Card from 'antd/es/card/Card'
import { Typography } from 'antd'

const PageHeader = () => {
  const { notebookId } = useParams()

  const foundNotebookData = NotebooksData.find((NotebookData) => {
    return NotebookData.id === (notebookId && parseInt(notebookId))
  })

  console.log('foundNotebookData', foundNotebookData)

  return (
    <Card style={{ margin: '10px 15px 0 15px', height: '10vh' }}>
      <Typography>{`${foundNotebookData?.title} - ${foundNotebookData?.description}`}</Typography>
    </Card>
  )
}

export default PageHeader
