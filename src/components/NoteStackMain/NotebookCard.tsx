import { Card } from 'antd'
import { useNavigate } from 'react-router-dom'
import { INotebook } from '../../redux/notebooksSlice'

const NotebookCard = ({ notebook }: { notebook: INotebook }) => {
  const navigate = useNavigate()
  const handleCardClick = (id: number) => {
    navigate(`/notebook/${id}`)
  }

  return (
    <Card
      title={notebook.title}
      style={{ width: 500, backgroundColor: '#f0f0f0' }}
      onClick={() => {
        handleCardClick(notebook.id)
      }}
      key={notebook.id}
    >
      {notebook.description}
    </Card>
  )
}

export default NotebookCard
