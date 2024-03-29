import { useParams } from 'react-router-dom'
import { NotebookChapters, INotebookChapter } from '../../data'
import Tree, { DataNode } from 'antd/es/tree'
import { useDispatch } from 'react-redux'

const Chapters = () => {
  const dispatch = useDispatch()

  const getChaptersForNotebook = (notebookId?: number) => {
    const chapters = NotebookChapters.filter((chapter) => chapter.notebookId === notebookId)
    return chapters
  }

  const { notebookId } = useParams()

  const Chapters = getChaptersForNotebook(notebookId ? parseInt(notebookId) : undefined)

  // Function to generate tree data recursively

  function generateTree(chapters: (INotebookChapter | undefined)[]) {
    const nodes = []

    for (const chapter of chapters) {
      if (chapter) {
        const node: DataNode = {
          title: chapter.title,
          key: `node-${chapter.id}`,
        }

        if (chapter.childChapters.length) {
          const mappedChildChapters = chapter.childChapters.map((chapter) => {
            return NotebookChapters.find((notebookChapter) => notebookChapter.id === chapter)
          })

          const childChapters = generateTree(mappedChildChapters)
          if (childChapters.length) {
            node.children = childChapters
          }
        }

        nodes.push(node)
      }
    }

    return nodes
  }

  // Call the function with the provided NotebookChapters
  const chapterData: DataNode[] = generateTree(Chapters)

  // TODO: Fix any
  const handleChapterSelect = (nodeKey: React.Key[], info: any) => {
    // const chapter = nodeKey.split('-')

    const chapter = info.node.key.split('-')[1]
    // dispatch(setCurrentNote)
    console.log('chapter', chapter)
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
