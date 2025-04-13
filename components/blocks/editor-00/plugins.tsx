import { ContentEditable } from '@/components/editor/editor-ui/content-editable'
import { ToolbarPlugin } from '@/components/editor/plugins/toolbar/toolbar-plugin'
import { Button } from '@/components/ui/base/c-button'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { Plus } from 'lucide-react'
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
						<Button variant='outline' size='icon' className='h-8 w-8'>
							<Plus />
						</Button>
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
			</div>
			{/* actions plugins */}
		</div>
	)
}
