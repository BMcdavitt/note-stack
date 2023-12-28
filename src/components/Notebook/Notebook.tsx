import { useParams } from "react-router-dom";
import { NotebooksData } from "../data";

const Notebook = () => {
  const getNotebookForId = (id?: number) => {
    const found = NotebooksData.find((Notebook) => {
      return Notebook.id === id;
    });
    return found;
  };

  const { notebookId } = useParams();

  const Notebook = getNotebookForId(notebookId ? parseInt(notebookId) : undefined);

  return <h2>{Notebook && Notebook.title} </h2>;
};

export default Notebook;
