import { Input, Modal } from 'antd'
import { useState } from 'react'

interface IAddNotebookModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (newNotebookTitle: string, newNotebookDescription: string) => void
}

const AddNotebookModal = ({ isOpen, onClose, onSave }: IAddNotebookModalProps) => {
  const [newNotebookTitle, setNewNotebookTitle] = useState('')
  const [newNotebookDescription, setNewNotebookDescription] = useState('')

  return (
    <Modal open={isOpen} onCancel={onClose} onOk={() => onSave(newNotebookTitle, newNotebookDescription)}>
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
