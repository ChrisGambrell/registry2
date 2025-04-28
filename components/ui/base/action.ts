'use server'

import { ZodSchema } from 'zod'
import { ActionResult, OnValidResult, validateFormData } from './utils'

export async function handleFormAction<T extends Record<string, unknown>>(
	formData: FormData,
	schema: ZodSchema<T>,
	onValid: (data: T) => Promise<OnValidResult<T> | void>
): Promise<ActionResult<T>> {
	const parsed = validateFormData(formData, schema) as ActionResult<T>
	if (!parsed.success) return parsed

	const result = await onValid(parsed.data!)

	if (result?.fieldErrors || result?.globalError) {
		return {
			success: false,
			fieldErrors: result.fieldErrors ?? {},
			globalError: result.globalError ?? null,
			values: Object.fromEntries(Object.entries(parsed).map(([k, v]) => [k, String(v ?? '')])) as Partial<Record<keyof T, string>>,
		}
	}

	return {
		success: true,
		fieldErrors: {},
		globalError: null,
		values: {},
	}
}
