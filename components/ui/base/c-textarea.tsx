import { cn } from '@/lib/utils'
import { Textarea as TextareaBase } from '../textarea'

export function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
	return <TextareaBase className={cn('focus-visible:ring', className)} {...props} />
}
