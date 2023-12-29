import { useParams } from "react-router-dom";
import { NotebookChapters, INotebookChapter } from "../data";
import Tree, { DataNode } from "antd/es/tree";

const Notebook = () => {
  const getChaptersForNotebook = (notebookId?: number) => {
    const chapters = NotebookChapters.filter((chapter) => chapter.notebookId === notebookId);
    return chapters;
  };

  const { notebookId } = useParams();

  const Chapters = getChaptersForNotebook(notebookId ? parseInt(notebookId) : undefined);

  // Function to generate tree data recursively

  function generateTree(chapters: (INotebookChapter | undefined)[], parentId: number | null = null) {
    const nodes = [];

    for (const chapter of chapters) {
      if (chapter && chapter.parentChapter === parentId) {
        const node: DataNode = {
          title: chapter.title,
          key: `node-${chapter.id}`,
        };

        if (chapter.childChapters.length) {
          const mappedChildChapters = chapter.childChapters.map((chapter) => {
            return NotebookChapters.find((notebookChapter) => notebookChapter.id === chapter);
          });

          const childChapters = generateTree(mappedChildChapters, chapter.id);
          if (childChapters.length) {
            node.children = childChapters;
          }
        }

        nodes.push(node);
      }
    }

    return nodes;
  }

  // Call the function with the provided NotebookChapters
  const chapterData: DataNode[] = generateTree(Chapters);

  return <Tree treeData={chapterData} />;
};

export default Notebook;
