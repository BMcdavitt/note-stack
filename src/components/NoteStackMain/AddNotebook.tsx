import { Input, Modal } from 'antd'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createNotebook } from '../../redux/notebooksSlice'

interface IAddNotebookModalProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

const AddNotebookModal = ({ isOpen, setIsOpen }: IAddNotebookModalProps) => {
  const dispatch = useDispatch()

  const [newNotebookTitle, setNewNotebookTitle] = useState('')
  const [newNotebookDescription, setNewNotebookDescription] = useState('')

  const handleSaveNewNotebook = (newNotebookTitle: string, newNotebookDescription: string) => {
    dispatch(createNotebook({ title: newNotebookTitle, description: newNotebookDescription }) as any)
    setIsOpen(false)
  }

  const handleCancelNewNotebook = () => {
    setIsOpen(false)
  }

  return (
    <Modal
      open={isOpen}
      onCancel={handleCancelNewNotebook}
      onOk={() => handleSaveNewNotebook(newNotebookTitle, newNotebookDescription)}
    >
      <p>Add New Notebook</p>
      <div style={{ display: 'flex', gap: '15px', flexDirection: 'column' }}>
        <Input
          placeholder="Title"
          value={newNotebookTitle}
          onChange={(e) => {
            setNewNotebookTitle(e.target.value)
          }}
        />
        <Input
          placeholder="Description"
          value={newNotebookDescription}
          onChange={(e) => {
            setNewNotebookDescription(e.target.value)
          }}
        />
      </div>
    </Modal>
  )
}

export default AddNotebookModal
