import { Button, Flex } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNotebooks, INotebook, listNotebooks } from '../../redux/notebooksSlice'
import { Dispatch } from '@reduxjs/toolkit'
import Layout, { Content, Header } from 'antd/es/layout/layout'
import NotebookCard from './NotebookCard'
import AddNotebookModal from './AddNotebook'
import { setCurrentNote, setCurrentNoteText } from '../../redux/currentNoteSlice'
import EditNotebookModal from './EditNotebook'

const NoteStackMain = () => {
  const [isNewNotebookModalOpen, setIsNewNotebookModalOpen] = useState(false)
  const [isEditNotebookModalOpen, setIsEditNotebookModalOpen] = useState(false)
  const [editNotebookId, setEditNotebookId] = useState<number | null>(null)

  const dispatch = useDispatch<Dispatch<any>>()
  const Notebooks = useSelector(listNotebooks)

  useEffect(() => {
    dispatch(fetchNotebooks())
    dispatch(setCurrentNote(null))
    dispatch(setCurrentNoteText([]))
  }, [dispatch])

  const showNewNotebookModal = () => {
    setIsNewNotebookModalOpen(true)
  }

  const showEditNotebookModal = (editNotebookId: number) => {
    setEditNotebookId(editNotebookId)
    setIsEditNotebookModalOpen(true)
  }

  return (
    <>
      <Layout style={{ padding: '10px', gap: '10px' }}>
        <Header
          style={{
            backgroundColor: '#fff',
            borderRadius: '15px',
            height: '10vh',
            padding: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <h1>Notebooks</h1>
          <Button onClick={showNewNotebookModal}>Add New</Button>
        </Header>
        <Content style={{ backgroundColor: '#fff', borderRadius: '15px', height: '85vh', padding: '20px' }}>
          <Flex wrap="wrap" gap={'middle'} justify="center">
            {Notebooks.map((notebook: INotebook, index: number) => {
              return <NotebookCard notebook={notebook} callEditNotebook={showEditNotebookModal} key={index} />
            })}
          </Flex>
        </Content>
      </Layout>
      <AddNotebookModal isOpen={isNewNotebookModalOpen} setIsOpen={setIsNewNotebookModalOpen} />
      {editNotebookId && (
        <EditNotebookModal
          isOpen={isEditNotebookModalOpen}
          setIsOpen={setIsEditNotebookModalOpen}
          notebookId={editNotebookId}
        />
      )}
    </>
  )
}

export default NoteStackMain
