'use client'

import { cn } from '@/lib/utils'
import { useEffect } from 'react'
import { useFormStatus } from 'react-dom'
import { toast } from 'sonner'

export function FormError({ hidden = false, value }: { hidden?: boolean; value: string[] | undefined }) {
	const { pending } = useFormStatus()

	useEffect(() => {
		if (!hidden) return
		if (value?.length && value.length > 0) toast.error(`FATAL: ${value[0]}`)
	}, [hidden, value])

	if (hidden || !value || !value.length) return null
	return <div className={cn('text-sm text-destructive', { hidden: pending })}>{value[0]}</div>
}
