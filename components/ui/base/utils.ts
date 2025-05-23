import { ZodSchema } from 'zod'

export type Params = Promise<{ [key: string]: string }>
export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
export type ServerProps = { params: Params; searchParams: SearchParams }
export type LayoutProps = { children: React.ReactNode; params: Params }

export type ActionResult<T> = {
	success: boolean
	successMessage: string | null
	fieldErrors: Partial<Record<keyof T, string[]>>
	globalError: string | null
	values: Partial<Record<keyof T, string>>
	data?: T
}

export type ActionState = {
	values: Record<string, string>
	fieldErrors: Record<string, string[]>
	globalError: string | null
	success: boolean
	successMessage: string | null
}

export type OnValidResult<T> = null | {
	values?: Partial<Record<keyof T, string>>
	successMessage?: string | null
	globalError?: string
	fieldErrors?: Partial<Record<keyof T, string[]>>
}

export function validateFormData<T>(formData: FormData, schema: ZodSchema<T>) {
	const raw: Record<string, unknown> = {}
	for (const [key, value] of formData.entries()) {
		raw[key] = value === 'on' ? true : value
	}

	const parsed = schema.safeParse(raw)
	if (!parsed.success) {
		const fieldErrors = parsed.error.flatten().fieldErrors as Partial<Record<keyof T, string[]>>
		return {
			success: false,
			successMessage: null,
			fieldErrors,
			globalError: null,
			values: Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, String(v ?? '')])) as Partial<Record<keyof T, string>>,
		}
	}

	return {
		success: true,
		successMessage: null,
		data: parsed.data,
		values: Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, String(v ?? '')])) as Partial<Record<keyof T, string>>,
	}
}

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
			successMessage: null,
			fieldErrors: result.fieldErrors ?? {},
			globalError: result.globalError ?? null,
			values: Object.fromEntries(Object.entries(parsed).map(([k, v]) => [k, String(v ?? '')])) as Partial<Record<keyof T, string>>,
		}
	}

	return {
		success: true,
		successMessage: result?.successMessage ?? null,
		fieldErrors: {},
		globalError: null,
		values: {},
	}
}
