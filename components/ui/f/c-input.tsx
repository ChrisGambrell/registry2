import { cn } from '@/lib/utils'
import { Input as InputBase } from '../input'

export function Input({ className, ...props }: React.ComponentProps<'input'>) {
	return <InputBase className={cn('focus-visible:ring', className)} {...props} />
}
