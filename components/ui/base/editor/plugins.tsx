import { CheckListPlugin } from '@lexical/react/LexicalCheckListPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { ListPlugin } from '@lexical/react/LexicalListPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { useState } from 'react'
import { ContentEditable } from './editor-ui/content-editable'
import { ActionsPlugin } from './plugins/actions/actions-plugin'
import { CharacterLimitPlugin } from './plugins/actions/character-limit-plugin'
import { CounterCharacterPlugin } from './plugins/actions/counter-character-plugin'
import { MaxLengthPlugin } from './plugins/actions/max-length-plugin'
import { DraggableBlockPlugin } from './plugins/draggable-block-plugin'
import { BlockFormatDropDown } from './plugins/toolbar/block-format-toolbar-plugin'
import { FormatBulletedList } from './plugins/toolbar/block-format/format-bulleted-list'
import { FormatCheckList } from './plugins/toolbar/block-format/format-check-list'
import { FormatHeading } from './plugins/toolbar/block-format/format-heading'
import { FormatNumberedList } from './plugins/toolbar/block-format/format-numbered-list'
import { FormatParagraph } from './plugins/toolbar/block-format/format-paragraph'
import { FormatQuote } from './plugins/toolbar/block-format/format-quote'
import { ClearFormattingToolbarPlugin } from './plugins/toolbar/clear-formatting-toolbar-plugin'
import { FontBackgroundToolbarPlugin } from './plugins/toolbar/font-background-toolbar-plugin'
import { FontColorToolbarPlugin } from './plugins/toolbar/font-color-toolbar-plugin'
import { FontFormatToolbarPlugin } from './plugins/toolbar/font-format-toolbar-plugin'
import { FontSizeToolbarPlugin } from './plugins/toolbar/font-size-toolbar-plugin'
import { HistoryToolbarPlugin } from './plugins/toolbar/history-toolbar-plugin'
import { SubSuperToolbarPlugin } from './plugins/toolbar/subsuper-toolbar-plugin'
import { ToolbarPlugin } from './plugins/toolbar/toolbar-plugin'

const maxLength = 100

export function Plugins() {
	const [floatingAnchorElem, setFloatingAnchorElem] = useState<HTMLDivElement | null>(null)

	const onRef = (_floatingAnchorElem: HTMLDivElement) => {
		if (_floatingAnchorElem !== null) setFloatingAnchorElem(_floatingAnchorElem)
	}

	return (
		<div className='relative'>
			{/* toolbar plugins */}
			<ToolbarPlugin>
				{() => (
					<div className='vertical-align-middle sticky top-0 z-10 flex items-center gap-2 overflow-auto border-b p-1'>
						<HistoryToolbarPlugin />
						<Separator />
						<BlockFormatDropDown>
							<FormatParagraph />
							<FormatHeading levels={['h1', 'h2', 'h3']} />
							<FormatNumberedList />
							{/* BUG: Unordered list not working like ordered list */}
							<FormatBulletedList />
							<FormatCheckList />
							<FormatQuote />
						</BlockFormatDropDown>
						<Separator />
						<FontSizeToolbarPlugin />
						<Separator />
						<div className='flex gap-1'>
							<FontFormatToolbarPlugin format='bold' />
							<FontFormatToolbarPlugin format='italic' />
							<FontFormatToolbarPlugin format='underline' />
							<FontFormatToolbarPlugin format='strikethrough' />
						</div>
						<Separator />
						<SubSuperToolbarPlugin />
						<Separator />
						<div className='flex gap-1'>
							<FontColorToolbarPlugin />
							<FontBackgroundToolbarPlugin />
						</div>
						<Separator />
						<ClearFormattingToolbarPlugin />
						{/* BUG: Link */}
					</div>
				)}
			</ToolbarPlugin>

			{/* editor plugins */}
			<div className='relative'>
				<RichTextPlugin
					contentEditable={
						<div className=''>
							<div className='' ref={onRef}>
								<ContentEditable placeholder={'Start typing...'} />
							</div>
						</div>
					}
					ErrorBoundary={LexicalErrorBoundary}
				/>
				<HistoryPlugin />
				<ListPlugin />
				<CheckListPlugin />
				<DraggableBlockPlugin anchorElem={floatingAnchorElem} />
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
						{/* center action buttons */}
						<CounterCharacterPlugin charset='UTF-16' />
					</div>
					<div className='flex justify-end flex-1'>{/* right side action buttons */}</div>
				</div>
			</ActionsPlugin>
		</div>
	)
}

const Separator = () => <div className='h-6 mx-1 my-auto border-l' />
