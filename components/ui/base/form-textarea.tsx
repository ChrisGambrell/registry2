import { cn } from '@/lib/utils'
import { Label } from '../label'
import { Textarea } from './c-textarea'
import { FormError } from './form-error'
import { ActionState } from './types'

export function FormTextarea({
	className,
	clearOnError = false,
	id: _id,
	label,
	name,
	state,
	...props
}: React.ComponentProps<'textarea'> & { clearOnError?: boolean; label: React.ReactNode | string; state?: ActionState }) {
	const id = String(name ?? _id)
	const value = clearOnError ? '' : state?.values?.[id] ?? ''
	const error = state?.fieldErrors?.[id]?.[0]

	return (
		<div className={cn('grid gap-2 h-fit', className)}>
			{label && (typeof label === 'string' ? <Label htmlFor={id}>{label}</Label> : label)}
			<Textarea id={id} name={id} defaultValue={value} {...props} />
			<FormError value={error ? [error] : []} />
		</div>
	)
}
