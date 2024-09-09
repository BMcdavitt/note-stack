import { Layout } from 'antd'
import Chapters from './Chapters/Chapters'
import Page from './Page/Page'
import PageHeader from './PageHeader/PageHeader'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchNotebookChapters, setCurrentNotebookId } from '../../redux/currentNotebook'
import { Dispatch } from '@reduxjs/toolkit'
import { selectCurrentNote } from '../../redux/currentNoteSlice'
import NoNoteSelected from './NoNoteSelected/NoNoteSelected'

const { Header, Sider, Content } = Layout

const Notebook = () => {
  const noteId = useSelector(selectCurrentNote)
  const dispatch = useDispatch<Dispatch<any>>()
  const { notebookId } = useParams()

  useEffect(() => {
    if (notebookId) {
      dispatch(setCurrentNotebookId(parseInt(notebookId)))
      dispatch(fetchNotebookChapters(parseInt(notebookId)))
    }
  }, [dispatch, notebookId])

  return (
    <Layout style={{ padding: '10px' }}>
      <Header style={{ backgroundColor: '#fff', borderRadius: '5px', height: '10vh', padding: '10px' }}>
        {notebookId && <PageHeader notebookId={notebookId} />}
      </Header>
      <Layout style={{ paddingTop: '10px' }}>
        <Sider style={{ borderRadius: '15px', marginRight: '10px' }}>
          <Chapters />
        </Sider>

        <Content style={{ backgroundColor: '#fff', borderRadius: '5px', padding: '10px' }}>
          {noteId ? <Page /> : <NoNoteSelected />}
        </Content>
      </Layout>
    </Layout>
  )
}

export default Notebook
