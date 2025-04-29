import { ListItemNode, ListNode } from '@lexical/list'
import { OverflowNode } from '@lexical/overflow'
import { HeadingNode, QuoteNode } from '@lexical/rich-text'
import { Klass, LexicalNode, LexicalNodeReplacement, ParagraphNode, TextNode } from 'lexical'

export const nodes: ReadonlyArray<Klass<LexicalNode> | LexicalNodeReplacement> = [
	HeadingNode,
	ParagraphNode,
	TextNode,
	QuoteNode,
	ListNode,
	ListItemNode,
	OverflowNode,
]
