'use client'

import { ReactNode, useActionState, useEffect, useState } from 'react'
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '../alert-dialog'
import { ActionButton } from './action-button'

export function Confirm({
	action: _action,
	children,
	desc,
	title,
	variant = 'default',
}: {
	action: () => Promise<unknown>
	children: ReactNode
	desc: string
	title: string
	variant?: 'default' | 'destructive'
}) {
	const [open, setOpen] = useState(false)
	const [state, action] = useActionState(_action, null)

	useEffect(() => {
		if (state === undefined) setOpen(false)
	}, [state])

	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{desc}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel className='cursor-pointer'>Cancel</AlertDialogCancel>
					<form action={action}>
						<ActionButton variant={variant}>Continue</ActionButton>
					</form>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)
}

export function ConfirmDelete({ action, children }: { action: () => Promise<unknown>; children: ReactNode }) {
	return (
		<Confirm
			action={action}
			title='Are you absolutely sure?'
			desc='This action cannot be undone. This will permanently delete this item and remove the data from our servers.'
			variant='destructive'>
			{children}
		</Confirm>
	)
}
