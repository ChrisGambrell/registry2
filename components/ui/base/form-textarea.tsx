import { cn } from '@/lib/utils'
import { Label } from '../label'
import { Textarea } from './c-textarea'
import { FormError } from './form-error'
import { ActionState } from './utils'

interface FormTextareaProps extends React.ComponentProps<'textarea'> {
	clearOnError?: boolean
	desc?: React.ReactNode | string
	label: React.ReactNode | string
	state?: ActionState
}

export function FormTextarea({ className, clearOnError = false, desc, id: _id, label, name, state, ...props }: FormTextareaProps) {
	const id = String(name ?? _id)
	const value = clearOnError ? '' : state?.values?.[id] ?? ''
	const error = state?.fieldErrors?.[id]?.[0]

	return (
		<div className={cn('grid gap-2 h-fit', className)}>
			{label && (typeof label === 'string' ? <Label htmlFor={id}>{label}</Label> : label)}
			{desc && (typeof desc === 'string' ? <p className='text-xs text-muted-foreground -mt-1'>{desc}</p> : desc)}
			<Textarea id={id} name={id} defaultValue={value} {...props} />
			<FormError value={error ? [error] : []} />
		</div>
	)
}
