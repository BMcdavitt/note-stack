import { Button, Flex } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNotebooks, createNotebook, INotebook, listNotebooks } from '../../redux/notebooksSlice'
import { Dispatch } from '@reduxjs/toolkit'
import Layout, { Content, Header } from 'antd/es/layout/layout'
import NotebookCard from './NotebookCard'
import AddNotebookModal from './AddNotebook'

const NoteStackMain = () => {
  const [isNewNotebookModalOpen, setIsNewNotebookModalOpen] = useState(false)

  const dispatch = useDispatch<Dispatch<any>>()
  const Notebooks = useSelector(listNotebooks)

  useEffect(() => {
    dispatch(fetchNotebooks())
  }, [dispatch])

  const showModal = () => {
    setIsNewNotebookModalOpen(true)
  }

  const handleSave = (newNotebookTitle: string, newNotebookDescription: string) => {
    dispatch(createNotebook({ title: newNotebookTitle, description: newNotebookDescription }))
    setIsNewNotebookModalOpen(false)
  }

  const handleCancel = () => {
    setIsNewNotebookModalOpen(false)
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
          <Button onClick={showModal}>Add New</Button>
        </Header>
        <Content style={{ backgroundColor: '#fff', borderRadius: '15px', height: '85vh', padding: '20px' }}>
          <Flex wrap="wrap" gap={'middle'} justify="center">
            {Notebooks.map((notebook: INotebook, index: number) => {
              return <NotebookCard notebook={notebook} key={index} />
            })}
          </Flex>
        </Content>
      </Layout>
      <AddNotebookModal isOpen={isNewNotebookModalOpen} onClose={handleCancel} onSave={handleSave} />
    </>
  )
}

export default NoteStackMain
