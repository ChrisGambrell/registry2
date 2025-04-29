'use client'

import { TooltipProvider } from '@/components/ui/tooltip'
import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { SerializedEditorState } from 'lexical'
import { useState } from 'react'
import { nodes } from './nodes'
import { Plugins } from './plugins'
import { editorTheme } from './themes/editor-theme'

const editorConfig: InitialConfigType = { namespace: 'Editor', theme: editorTheme, nodes, onError: () => {} }

export function Editor({
	value,
	onValueChange,
}: {
	value?: SerializedEditorState
	onValueChange?: (value: SerializedEditorState) => void
}) {
	const [editorState, setEditorState] = useState<SerializedEditorState>(
		value ??
			({
				root: {
					children: [
						{
							direction: 'ltr',
							format: '',
							indent: 0,
							type: 'paragraph',
							version: 1,
						},
					],
					direction: 'ltr',
					format: '',
					indent: 0,
					type: 'root',
					version: 1,
				},
			} as unknown as SerializedEditorState)
	)

	return (
		<div className='overflow-hidden rounded-lg border bg-background shadow'>
			<LexicalComposer
				initialConfig={{
					...editorConfig,
					...(editorState ? { editorState: JSON.stringify(editorState) } : {}),
				}}>
				<TooltipProvider>
					<Plugins />

					<OnChangePlugin
						ignoreSelectionChange={true}
						onChange={(editorState) => {
							setEditorState(editorState.toJSON())
							onValueChange?.(editorState.toJSON())
						}}
					/>
				</TooltipProvider>
			</LexicalComposer>
		</div>
	)
}
