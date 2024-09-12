import { Input, Modal } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editNotebook, getNotebookById } from '../../redux/notebooksSlice'

interface IEditNotebookModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  notebookId: number
}

const EditNotebookModal = ({ isOpen, setIsOpen, notebookId }: IEditNotebookModalProps) => {
  const [notebookTitle, setNotebookTitle] = useState('')
  const [notebookDescription, setNotebookDescription] = useState('')

  const dispatch = useDispatch()

  const notebookData = useSelector((state) => getNotebookById(state, notebookId))

  useEffect(() => {
    setNotebookTitle(notebookData.title)
    setNotebookDescription(notebookData.description)
  }, [notebookData])

  const handleSaveNotebook = (notebookTitle: string, notebookDescription: string) => {
    dispatch(editNotebook({ id: notebookId, title: notebookTitle, description: notebookDescription }) as any)
    setIsOpen(false)
  }

  const handleCancelEditNotebook = () => {
    setIsOpen(false)
  }

  return (
    <Modal
      open={isOpen}
      onCancel={handleCancelEditNotebook}
      onOk={() => handleSaveNotebook(notebookTitle, notebookDescription)}
    >
      <p>Edit Notebook</p>
      <div style={{ display: 'flex', gap: '15px', flexDirection: 'column' }}>
        <Input
          placeholder="Title"
          value={notebookTitle}
          onChange={(e) => {
            setNotebookTitle(e.target.value)
          }}
        />
        <Input
          placeholder="Description"
          value={notebookDescription}
          onChange={(e) => {
            setNotebookDescription(e.target.value)
          }}
        />
      </div>
    </Modal>
  )
}

export default EditNotebookModal
