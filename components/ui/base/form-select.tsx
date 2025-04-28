'use client'

import { cn } from '@/lib/utils'
import { SelectProps } from '@radix-ui/react-select'
import { useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../base/c-select'
import { Label } from '../label'
import { FormError } from './form-error'
import { ActionState } from './utils'

export function FormSelect({
	className,
	clearOnError = false,
	defaultValue,
	label,
	name,
	options,
	state,
	...props
}: SelectProps & {
	className?: string
	clearOnError?: boolean
	label: React.ReactNode | string
	options: ({ label: React.ReactNode; value: string } | string)[]
	state?: ActionState
}) {
	const id = name ?? ''
	// TODO: Use defaultValue in all form components?
	const _value = clearOnError ? '' : state?.values?.[id] ?? defaultValue ?? ''
	const error = state?.fieldErrors?.[id]?.[0]

	const [value, setValue] = useState(_value)

	useEffect(() => {
		setValue(_value)
	}, [_value])

	return (
		<div className={cn('grid gap-2 h-fit', className)}>
			{label && (typeof label === 'string' ? <Label htmlFor={id}>{label}</Label> : label)}
			<Select value={value} onValueChange={setValue} {...props}>
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
			<input type='hidden' name={id} value={value} />
			<FormError value={error ? [error] : []} />
		</div>
	)
}
