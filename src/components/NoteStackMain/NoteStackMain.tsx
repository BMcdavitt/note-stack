import { Card, Flex } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNotebooks, INotebook, listNotebooks } from '../../redux/notebooksSlice'
import { Dispatch } from '@reduxjs/toolkit'

const NoteStackMain = () => {
  const navigate = useNavigate()
  const handleCardClick = (id: number) => {
    navigate(`/notebook/${id}`)
  }

  const dispatch = useDispatch<Dispatch<any>>()
  const Notebooks = useSelector(listNotebooks)

  useEffect(() => {
    dispatch(fetchNotebooks())
  }, [dispatch])

  return (
    <Flex wrap="wrap" gap={'middle'} justify="center">
      {Notebooks.map((notebook: INotebook, index: number) => {
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
