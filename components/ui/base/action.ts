'use server'

import { ZodSchema } from 'zod'
import { ActionResult, OnValidResult } from './types'

export async function handleFormAction<T extends Record<string, unknown>>(
	formData: FormData,
	schema: ZodSchema<T>,
	onValid: (data: T) => Promise<OnValidResult<T>>
): Promise<ActionResult<T>> {
	const raw: Record<string, unknown> = {}
	for (const [key, value] of formData.entries()) {
		raw[key] = value === 'on' ? true : value
	}

	const parsed = schema.safeParse(raw)
	if (!parsed.success) {
		const fieldErrors = parsed.error.flatten().fieldErrors as Partial<Record<keyof T, string[]>>
		return {
			success: false,
			fieldErrors,
			globalError: null,
			values: Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, String(v ?? '')])) as Partial<Record<keyof T, string>>,
		}
	}

	const result = await onValid(parsed.data)

	if (result?.fieldErrors || result?.globalError) {
		return {
			success: false,
			fieldErrors: result.fieldErrors ?? {},
			globalError: result.globalError ?? null,
			values: Object.fromEntries(Object.entries(parsed.data).map(([k, v]) => [k, String(v ?? '')])) as Partial<
				Record<keyof T, string>
			>,
		}
	}

	return {
		success: true,
		fieldErrors: {},
		globalError: null,
		values: {},
	}
}
