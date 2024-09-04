import { Button, Card, Flex, Input, Modal } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNotebooks, INotebook, listNotebooks } from '../../redux/notebooksSlice'
import { Dispatch } from '@reduxjs/toolkit'
import Layout, { Content, Header } from 'antd/es/layout/layout'
import { notebookApi } from '../../api/notebook'

const NoteStackMain = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newNotebookTitle, setNewNotebookTitle] = useState('')
  const [newNotebookDescription, setNewNotebookDescription] = useState('')
  const [newNotebookFlag, setNewNotebookFlag] = useState(0)

  const navigate = useNavigate()
  const handleCardClick = (id: number) => {
    navigate(`/notebook/${id}`)
  }

  const dispatch = useDispatch<Dispatch<any>>()
  const Notebooks = useSelector(listNotebooks)

  useEffect(() => {
    dispatch(fetchNotebooks())
  }, [dispatch, newNotebookFlag])

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = () => {
    notebookApi.createNotebook(newNotebookTitle, newNotebookDescription)
    setNewNotebookFlag(newNotebookFlag + 1)
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
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
              return (
                <Card
                  title={notebook.title}
                  style={{ width: 500, backgroundColor: '#f0f0f0' }}
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
        </Content>
      </Layout>
      <Modal open={isModalOpen} onCancel={handleCancel} onOk={handleOk}>
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
    </>
  )
}

export default NoteStackMain
