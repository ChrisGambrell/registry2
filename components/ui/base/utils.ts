import { ZodSchema } from 'zod'

export type Params = Promise<{ [key: string]: string }>
export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
export type ServerProps = { params: Params; searchParams: SearchParams }
export type LayoutProps = { children: React.ReactNode; params: Params }

export type ActionResult<T> = {
	success: boolean
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
}

export type OnValidResult<T> = null | {
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
			fieldErrors,
			globalError: null,
			values: Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, String(v ?? '')])) as Partial<Record<keyof T, string>>,
		}
	}

	return { success: true, data: parsed.data }
}
