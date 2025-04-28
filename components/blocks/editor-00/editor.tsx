'use client'

import { $generateHtmlFromNodes } from '@lexical/html'
import { InitialConfigType, LexicalComposer } from '@lexical/react/LexicalComposer'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { SerializedEditorState } from 'lexical'

import { editorTheme } from '@/components/editor/themes/editor-theme'
import { TooltipProvider } from '@/components/ui/tooltip'

import { useState } from 'react'
import { nodes } from './nodes'
import { Plugins } from './plugins'

const editorConfig: InitialConfigType = {
	namespace: 'Editor',
	theme: editorTheme,
	nodes,
	onError: (error: Error) => {
		console.error(error)
	},
}

export function Editor({ value, onValueChange }: { value?: SerializedEditorState; onValueChange: (value: SerializedEditorState) => void }) {
	const [editorState, setEditorState] = useState(
		value ?? {
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
		}
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
							console.log($generateHtmlFromNodes(editorState, null))
							setEditorState(editorState.toJSON())
							onValueChange(editorState.toJSON())
						}}
					/>
				</TooltipProvider>
			</LexicalComposer>
		</div>
	)
}
