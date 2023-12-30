import { Card, Flex } from 'antd'
import { useNavigate } from 'react-router-dom'
import { NotebooksData } from '../data'

const NoteStackMain = () => {
  const navigate = useNavigate()
  const handleCardClick = (id: number) => {
    navigate(`/notebook/${id}`)
  }

  const Notebooks = NotebooksData

  return (
    <Flex wrap="wrap" gap={'middle'}>
      {Notebooks.map((notebook, index) => {
        return (
          <Card
            title={notebook.title}
            style={{ width: 500 }}
            onClick={() => {
              handleCardClick(notebook.id)
            }}
            key={index}
          >
            {notebook.description}
          </Card>
        )
      })}
    </Flex>
  )
}

export default NoteStackMain
