import { ContentEditable } from '@/components/editor/editor-ui/content-editable'
import { BlockFormatDropDown } from '@/components/editor/plugins/toolbar/block-format-toolbar-plugin'
import { FormatBulletedList } from '@/components/editor/plugins/toolbar/block-format/format-bulleted-list'
import { FormatCheckList } from '@/components/editor/plugins/toolbar/block-format/format-check-list'
import { FormatHeading } from '@/components/editor/plugins/toolbar/block-format/format-heading'
import { FormatNumberedList } from '@/components/editor/plugins/toolbar/block-format/format-numbered-list'
import { FormatParagraph } from '@/components/editor/plugins/toolbar/block-format/format-paragraph'
import { FormatQuote } from '@/components/editor/plugins/toolbar/block-format/format-quote'
import { FontFormatToolbarPlugin } from '@/components/editor/plugins/toolbar/font-format-toolbar-plugin'
import { FontSizeToolbarPlugin } from '@/components/editor/plugins/toolbar/font-size-toolbar-plugin'
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
					<div className='vertical-align-middle sticky top-0 z-10 flex items-center gap-3 overflow-auto border-b p-1'>
						<HistoryToolbarPlugin />
						<BlockFormatDropDown>
							<FormatParagraph />
							<FormatHeading levels={['h1', 'h2', 'h3']} />
							{/* BUG: Lists not working */}
							<FormatNumberedList />
							{/* BUG: Lists not working */}
							<FormatBulletedList />
							{/* BUG: Lists not working */}
							<FormatCheckList />
							<FormatQuote />
						</BlockFormatDropDown>
						<FontSizeToolbarPlugin />
						<div className='flex gap-1'>
							<FontFormatToolbarPlugin format='bold' />
							<FontFormatToolbarPlugin format='italic' />
							<FontFormatToolbarPlugin format='underline' />
							<FontFormatToolbarPlugin format='strikethrough' />
						</div>
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
