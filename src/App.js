import { Route, Routes } from 'react-router-dom'
import NoteStackMain from './components/NoteStackMain/NoteStackMain'
import Notebook from './components/Notebook/Notebook'

function App() {
  return (
    <Routes>
      <Route path="/" element={<NoteStackMain />} />
      <Route path="/notebook/:notebookId" element={<Notebook />} />
    </Routes>
  )
}

export default App
