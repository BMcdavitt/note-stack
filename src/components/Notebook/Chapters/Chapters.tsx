import Tree, { DataNode } from 'antd/es/tree'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { setCurrentNoteText, setCurrentNote } from '../../../redux/currentNoteSlice'
import { getCurrentNotebookChapters, IChapter } from '../../../redux/currentNotebook'

const Chapters = () => {
  const chapters = useSelector(getCurrentNotebookChapters)
  const dispatch = useDispatch<Dispatch<any>>()

  function generateTreeChildNode(parentChapterId: number, parentNode: DataNode) {
    parentNode.children = []
    chapters
      .filter((chapter: IChapter) => chapter.parentNotebookChapterId === parentChapterId)
      .forEach((chapter: IChapter) => {
        if (chapter) {
          const node: DataNode = {
            title: chapter.title,
            key: `node-${chapter.id}`,
          }
          parentNode.children && parentNode.children.push(node)

          if (chapters.some((c: IChapter) => c.parentNotebookChapterId === chapter.id)) {
            generateTreeChildNode(chapter.id, node)
          }
        }
      })
  }

  function generateTree() {
    const nodes: DataNode[] = []

    chapters
      .filter((chapter: IChapter) => chapter.parentNotebookChapterId === null)
      .forEach((chapter: IChapter) => {
        if (chapter) {
          const node: DataNode = {
            title: chapter.title,
            key: `node-${chapter.id}`,
          }
          if (chapters.some((c: IChapter) => c.parentNotebookChapterId === chapter.id)) {
            generateTreeChildNode(chapter.id, node)
          }
          nodes.push(node)
        }
      })
    return nodes
  }

  const chapterData: DataNode[] = generateTree()

  // TODO: Fix any
  const handleChapterSelect = (nodeKey: React.Key[], info: any) => {
    const chapter = parseInt(info.node.key.split('-')[1])
    dispatch(setCurrentNote(chapter))
    let chapterNotes = chapters.find((ch: IChapter) => ch.id === chapter)?.notes

    if (!chapterNotes) {
      // use of chapter in chapterNotes string is strictly to ensure a state change is detected so that the editor is re-rendered
      // TODO: Verify if this is the best approach
      chapterNotes = `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":${chapter}}}`
    }
    dispatch(setCurrentNoteText(chapterNotes))
  }
  return (
    <Tree
      treeData={chapterData}
      style={{ minHeight: '87vh' }}
      onSelect={(nodeKey, info) => {
        handleChapterSelect(nodeKey, info)
      }}
    />
  )
}

export default Chapters
