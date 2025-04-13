import { ContentEditable } from '@/components/editor/editor-ui/content-editable'
import { ActionsPlugin } from '@/components/editor/plugins/actions/actions-plugin'
import { CharacterLimitPlugin } from '@/components/editor/plugins/actions/character-limit-plugin'
import { CounterCharacterPlugin } from '@/components/editor/plugins/actions/counter-character-plugin'
import { MaxLengthPlugin } from '@/components/editor/plugins/actions/max-length-plugin'
import { BlockFormatDropDown } from '@/components/editor/plugins/toolbar/block-format-toolbar-plugin'
import { FormatBulletedList } from '@/components/editor/plugins/toolbar/block-format/format-bulleted-list'
import { FormatCheckList } from '@/components/editor/plugins/toolbar/block-format/format-check-list'
import { FormatHeading } from '@/components/editor/plugins/toolbar/block-format/format-heading'
import { FormatNumberedList } from '@/components/editor/plugins/toolbar/block-format/format-numbered-list'
import { FormatParagraph } from '@/components/editor/plugins/toolbar/block-format/format-paragraph'
import { FormatQuote } from '@/components/editor/plugins/toolbar/block-format/format-quote'
import { ElementFormatToolbarPlugin } from '@/components/editor/plugins/toolbar/element-format-toolbar-plugin'
import { FontFormatToolbarPlugin } from '@/components/editor/plugins/toolbar/font-format-toolbar-plugin'
import { FontSizeToolbarPlugin } from '@/components/editor/plugins/toolbar/font-size-toolbar-plugin'
import { HistoryToolbarPlugin } from '@/components/editor/plugins/toolbar/history-toolbar-plugin'
import { ToolbarPlugin } from '@/components/editor/plugins/toolbar/toolbar-plugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin'
import { useState } from 'react'

const maxLength = 100

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
						<ElementFormatToolbarPlugin />
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
				<TabIndentationPlugin />
			</div>

			{/* actions plugins */}
			<ActionsPlugin>
				<div className='clear-both flex items-center justify-between border-t p-1 overflow-auto gap-2'>
					<div className='flex justify-start flex-1'>
						{/* left side action buttons */}
						<MaxLengthPlugin maxLength={maxLength} />
						<CharacterLimitPlugin maxLength={maxLength} charset='UTF-16' />
					</div>
					<div>
						<CounterCharacterPlugin charset='UTF-16' />
						{/* center action buttons */}
					</div>
					<div className='flex justify-end flex-1'>{/* right side action buttons */}</div>
				</div>
			</ActionsPlugin>
		</div>
	)
}
