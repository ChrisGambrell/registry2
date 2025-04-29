'use client'

import { useEffect, useState } from 'react'

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { COMMAND_PRIORITY_CRITICAL, SELECTION_CHANGE_COMMAND } from 'lexical'

import { ToolbarContext } from '@/components/ui/base/editor/context/toolbar-context'

import { useEditorModal } from '@/components/ui/base/editor/editor-hooks/use-modal'

export function ToolbarPlugin({
  children,
}: {
  children: (props: {
    blockType: string
  }) => React.ReactNode
}) {
  const [editor] = useLexicalComposerContext()

  const [activeEditor, setActiveEditor] = useState(editor)
  const [blockType, setBlockType] = useState<string>('paragraph')

  const [modal, showModal] = useEditorModal()

  const $updateToolbar = () => {}

  useEffect(() => {
    return activeEditor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        setActiveEditor(newEditor)
        return false
      },
      COMMAND_PRIORITY_CRITICAL
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor])

  return (
    <ToolbarContext
      activeEditor={activeEditor}
      $updateToolbar={$updateToolbar}
      blockType={blockType}
      setBlockType={setBlockType}
      showModal={showModal}
    >
      {modal}

      {children({ blockType })}

    </ToolbarContext>
  )
}
