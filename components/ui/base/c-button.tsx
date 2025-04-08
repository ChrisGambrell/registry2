import { cn } from '@/lib/utils'
import { VariantProps } from 'class-variance-authority'
import { Button as ButtonBase, buttonVariants } from '../button'

export type ButtonProps = React.ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { asChild?: boolean }

export function Button({ className, ...props }: ButtonProps) {
	return <ButtonBase className={cn('cursor-pointer', className)} {...props} />
}
