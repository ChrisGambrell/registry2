import { cn } from '@/lib/utils'
import { SelectProps } from '@radix-ui/react-select'
import { Label } from '../label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select'
import { FormError } from './form-error'
import { ActionState } from './types'

export function FormSelect({
	className,
	// clearOnError = false,
	label,
	name,
	options,
	state,
	...props
}: SelectProps & {
	className?: string
	// clearOnError?: boolean
	label: React.ReactNode | string
	options: ({ label: React.ReactNode; value: string } | string)[]
	state?: ActionState
}) {
	const id = name ?? ''
	// TODO: Value and clear on error
	// const value = clearOnError ? '' : state?.values?.[id] ?? ''
	const error = state?.fieldErrors?.[id]?.[0]

	return (
		<div className={cn('grid gap-2 h-fit', className)}>
			{label && (typeof label === 'string' ? <Label htmlFor={id}>{label}</Label> : label)}
			<Select {...props}>
				<SelectTrigger className='w-full'>
					<SelectValue placeholder='Select an option' />
				</SelectTrigger>
				<SelectContent>
					{options.map((option) => (
						<SelectItem
							key={typeof option === 'string' ? option : option.value}
							value={typeof option === 'string' ? option : option.value}>
							{typeof option === 'string' ? option : option.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<FormError value={error ? [error] : []} />
		</div>
	)
}
