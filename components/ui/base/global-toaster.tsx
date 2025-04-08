'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { Toaster } from '../sonner'

export function GlobalToaster() {
	const pathname = usePathname()
	const router = useRouter()
	const searchParams = useSearchParams()

	useEffect(() => {
		const message = searchParams.get('message')
		const error = searchParams.get('error')
		const success = searchParams.get('success')

		if (!message && !error && !success) return
		const toastType = message ? toast : success ? toast.success : toast.error
		toastType(message ? message : success ? success : error)

		const newSearchParams = new URLSearchParams(searchParams.toString())
		const paramsToRemove = ['message', 'error', 'success']
		paramsToRemove.forEach((param) => newSearchParams.delete(param))
		const redirectPath = `${pathname}?${newSearchParams.toString()}`
		router.replace(redirectPath, { scroll: false })
	}, [pathname, router, searchParams])

	return <Toaster position='top-center' richColors />
}
