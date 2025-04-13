'use client'

import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const RichInput = () => {
	const editor = useEditor({
		extensions: [StarterKit],
		content: '<p>Hello World! 🌎️</p>',
	})

	return <EditorContent editor={editor} />
}

export default RichInput
