'use client'

import { useActionState, useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { ZodSchema } from 'zod'
import { ActionResult, validateFormData } from './utils'

export function useForm<T>(action: (_: unknown, formData: FormData) => Promise<ActionResult<T>>, schema?: ZodSchema) {
	const [formState, formAction, formLoading] = useActionState(action, {
		success: false,
		fieldErrors: {},
		globalError: null,
		values: {},
	})

	const [combinedState, setCombinedState] = useState<ActionResult<T> | undefined>()

	useEffect(() => {
		setCombinedState(formState)
		if (!formState.globalError) return
		toast.error(formState.globalError)
	}, [formState])

	const handleSubmit = useCallback(
		(formData: FormData) => {
			if (!schema) return formAction(formData)

			const parsed = validateFormData(formData, schema) as ActionResult<T>
			if (!parsed.success) return setCombinedState(parsed)

			return formAction(formData)
		},
		[formAction, schema]
	)

	return [combinedState, handleSubmit, formLoading] as const
}
