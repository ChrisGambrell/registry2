export type Params = Promise<{ [key: string]: string }>
export type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>
export type ServerProps = { params: Params; searchParams: SearchParams }
export type LayoutProps = { children: React.ReactNode; params: Params }

export type ActionResult<T> = {
	success: boolean
	fieldErrors: Partial<Record<keyof T, string[]>>
	globalError: string | null
	values: Partial<Record<keyof T, string>>
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
