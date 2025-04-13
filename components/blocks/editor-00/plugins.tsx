import { ContentEditable } from '@/components/editor/editor-ui/content-editable'
import { HistoryToolbarPlugin } from '@/components/editor/plugins/toolbar/history-toolbar-plugin'
import { ToolbarPlugin } from '@/components/editor/plugins/toolbar/toolbar-plugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { useState } from 'react'

export function Plugins() {
	const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null)

	const onRef = (_floatingAnchorElem: HTMLDivElement) => {
		if (_floatingAnchorElem !== null) {
			setFloatingAnchorElem(_floatingAnchorElem)
		}
	}

	return (
		<div className='relative'>
			{/* toolbar plugins */}
			<ToolbarPlugin>
				{({ blockType }) => (
					<div className='vertical-align-middle sticky top-0 z-10 flex gap-2 overflow-auto border-b p-1'>
						<HistoryToolbarPlugin />
					</div>
				)}
			</ToolbarPlugin>

			<div className='relative'>
				<RichTextPlugin
					contentEditable={
						<div className=''>
							<div className='' ref={onRef}>
								<ContentEditable placeholder={'Start typing ...'} />
							</div>
						</div>
					}
					ErrorBoundary={LexicalErrorBoundary}
				/>

				{/* editor plugins */}
				<HistoryPlugin />
			</div>
			{/* actions plugins */}
		</div>
	)
}
