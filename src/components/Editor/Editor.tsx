//  Base Type Script Implementation courtesy of https://github.com/Sithija97/Lexical-rich-text-editor-typescript-

import ExampleTheme from './themes/ExampleTheme'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'

import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table'
import { ListItemNode, ListNode } from '@lexical/list'
import { CodeHighlightNode, CodeNode } from '@lexical/code'
import { AutoLinkNode, LinkNode } from '@lexical/link'
import ToolbarPlugin from './plugins/ToolbarPlugin'
import AutoLinkPlugin from './plugins/AutoLinkPlugin'

import './index.css'
import { useEffect, useState } from 'react'
import OnChangePlugin from './plugins/OnChangePlugin'
import { $getRoot, EditorState, SerializedEditorState } from 'lexical'
import { useSelector } from 'react-redux'
import { NotebookChapters } from '../data'
import { selectCurrentNote } from '../../redux/currentNoteSlice'
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'

function Placeholder() {
  return <div className="editor-placeholder">Enter some text for this page...</div>
}

const editorConfig = {
  editorState: null,
  namespace: 'MyEditor',
  theme: ExampleTheme,
  onError(error: any) {
    throw error
  },
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
}

const EditorContent = () => {
  const [editor] = useLexicalComposerContext()
  const [editorState, setEditorState] = useState<string>()

  const noteId = useSelector(selectCurrentNote)

  useEffect(() => {
    const noteRecord = NotebookChapters.find((obj) => obj.id === noteId)
    if (noteRecord?.notes) {
      editor.update(() => {
        const editorState = editor.parseEditorState(noteRecord.notes as SerializedEditorState)
        editor.setEditorState(editorState)
      })
    } else {
      editor.update(() => {
        $getRoot().clear()
      })
    }
  }, [noteId, editor])

  function onChange(editorContent: EditorState) {
    const editorStateJSON = editorContent.toJSON()
    setEditorState(JSON.stringify(editorStateJSON))
    // TODO: Update the redux store with the new editor state
  }

  return (
    <div>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={
              <div>
                <ContentEditable className="editor-input" />
              </div>
            }
            placeholder={<Placeholder />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <AutoLinkPlugin />
          <ListPlugin />
          <LinkPlugin />
        </div>
      </div>
      <OnChangePlugin onChange={onChange} />
    </div>
  )
}

const Editor = () => {
  return (
    <LexicalComposer initialConfig={editorConfig}>
      <EditorContent />
    </LexicalComposer>
  )
}

export default Editor
