'use client'

import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import { Button, ButtonProps } from './c-button'

export interface ActionButtonProps extends ButtonProps {
	loading?: boolean
}

export function ActionButton({ children, className, disabled, loading, ...props }: ActionButtonProps) {
	const { pending } = useFormStatus()

	return (
		<Button className={cn('relative', className)} disabled={disabled || loading || pending} type='submit' {...props}>
			<span className={cn('flex items-center gap-2', { invisible: loading || pending })}>{children}</span>
			{(loading || pending) && (
				<div className='absolute m-auto'>
					<Loader2 className='size-5 animate-spin' />
				</div>
			)}
		</Button>
	)
}
