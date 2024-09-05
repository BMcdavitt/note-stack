import { Empty } from 'antd'

const NoNoteSelected = () => {
  return (
    <div>
      <Empty
        description={
          <>
            <h2>No note selected</h2>
            <p>Please select a note from the list</p>
          </>
        }
      />
    </div>
  )
}

export default NoNoteSelected
