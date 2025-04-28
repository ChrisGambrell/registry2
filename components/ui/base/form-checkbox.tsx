import { cn } from '@/lib/utils'
import { Checkbox } from '../checkbox'
import { Label } from '../label'
import { FormError } from './form-error'
import { ActionState } from './utils'

export function FormCheckbox({
	className,
	id: _id,
	label,
	name,
	state,
	...props
}: React.ComponentProps<typeof Checkbox> & { label: React.ReactNode | string; state?: ActionState }) {
	const id = String(name ?? _id)
	const error = state?.fieldErrors?.[id]?.[0]

	return (
		<div className={cn('grid gap-2', className)}>
			<div className='flex items-center gap-2'>
				<Checkbox id={id} name={id} {...props} />
				<Label htmlFor={id}>{label}</Label>
			</div>
			<FormError value={error ? [error] : []} />
		</div>
	)
}
