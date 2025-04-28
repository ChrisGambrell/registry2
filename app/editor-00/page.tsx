'use client'

import { Editor } from '@/components/blocks/editor-00/editor'
import { SerializedEditorState } from 'lexical'
import { useState } from 'react'

export default function EditorPage() {
	const [value, setValue] = useState<SerializedEditorState>()
	return (
		<div className='container mx-auto my-4'>
			<Editor value={value} onValueChange={setValue} />
			<pre>{JSON.stringify(value, null, 2)}</pre>
		</div>
	)
}
