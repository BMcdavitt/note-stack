import Tree, { DataNode } from 'antd/es/tree'
import { useSelector } from 'react-redux'
import { setCurrentNoteText, setCurrentNote } from '../../../redux/currentNoteSlice'
import { currentNotebookChapters, IChapter } from '../../../redux/currentNotebook'

const Chapters = () => {
  const chapters = useSelector(currentNotebookChapters)

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

  // Call the function with the provided NotebookChapters
  const chapterData: DataNode[] = generateTree()

  // TODO: Fix any
  const handleChapterSelect = (nodeKey: React.Key[], info: any) => {
    // const chapter = parseInt(info.node.key.split('-')[1])
    // dispatch(setCurrentNote(chapter))
    // const chapterNotes = NotebookChapters.find((ch) => ch.id === chapter)
    // if (chapterNotes) {
    //   dispatch(setCurrentNoteText(chapterNotes.notes || null))
    // }
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
