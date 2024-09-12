import { Button, Card, Flex, Modal } from 'antd'
import { useNavigate } from 'react-router-dom'
import { deleteNotebook, INotebook } from '../../redux/notebooksSlice'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'

const NotebookCard = ({
  notebook,
  callEditNotebook,
}: {
  notebook: INotebook
  callEditNotebook: (editNotebookId: number) => void
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleCardClick = (id: number) => {
    navigate(`/notebook/${id}`)
  }

  const editNotebook = (event: React.MouseEvent) => {
    event.stopPropagation()
    callEditNotebook(notebook.id)
  }

  const deleteNotebookConfirmation = (): Promise<boolean> => {
    return new Promise((resolve) => {
      Modal.confirm({
        title: 'Delete Notebook',
        content: 'Are you sure you want to delete this notebook?',
        okType: 'danger',
        onOk() {
          resolve(true)
        },
        onCancel() {
          resolve(false)
        },
      })
    })
  }

  const callDeleteNotebook = async (event: React.MouseEvent) => {
    event.stopPropagation()
    const ok = await deleteNotebookConfirmation()
    if (ok) {
      const id = notebook.id
      dispatch(deleteNotebook(id) as any)
      console.log('delete notebook', id)
    }
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
      <Flex vertical>
        {notebook.description}
        <Flex justify="end" gap={'10px'}>
          <Button shape="circle" icon={<EditOutlined />} onClick={editNotebook} />
          <Button shape="circle" icon={<DeleteOutlined />} onClick={callDeleteNotebook} />
        </Flex>
      </Flex>
    </Card>
  )
}

export default NotebookCard
