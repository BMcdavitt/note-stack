//  Base Type Script Implementation courtesy of https://github.com/Sithija97/Lexical-rich-text-editor-typescript-

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'

import { $getRoot, EditorState } from 'lexical'
import ExampleTheme from './themes/ExampleTheme'
import './index.css'
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
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import ToolbarPlugin from './plugins/ToolbarPlugin'
import AutoLinkPlugin from './plugins/AutoLinkPlugin'
import OnChangePlugin from './plugins/OnChangePlugin'

import { selectCurrentNote, selectCurrentNoteText } from '../../redux/currentNoteSlice'
import { setCurrentNotebookChapterNotes } from '../../redux/currentNotebook'
import { updateNotebookChapterText } from '../../api/notebookChapters'

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

  const dispatch = useDispatch<Dispatch<any>>()

  const noteId = useSelector(selectCurrentNote)
  const noteText = useSelector(selectCurrentNoteText)

  useEffect(() => {
    if (noteText && noteText !== '{}') {
      editor.update(() => {
        const editorState = editor.parseEditorState(JSON.parse(noteText))
        editor.setEditorState(editorState)
      })
    } else {
      editor.update(() => {
        $getRoot().clear()
      })
    }
    return () => {}
  }, [editor, noteText, dispatch])

  function onChange(editorContent: EditorState) {
    const editorStateJSON = editorContent.toJSON()
    dispatch(setCurrentNotebookChapterNotes({ id: noteId, notes: JSON.stringify(editorStateJSON) }))
    //  Is this happening too often? Should we debounce this?
    noteId && updateNotebookChapterText(noteId, JSON.stringify(editorStateJSON))
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
