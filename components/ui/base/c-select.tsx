import { cn } from '@/lib/utils'
import { SelectItemProps, SelectTriggerProps } from '@radix-ui/react-select'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem as SelectItemBase,
	SelectLabel,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectSeparator,
	SelectTrigger as SelectTriggerBase,
	SelectValue,
} from '../select'

function SelectItem({ className, ...props }: SelectItemProps) {
	return <SelectItemBase className={cn('cursor-pointer', className)} {...props} />
}

function SelectTrigger({ className, ...props }: SelectTriggerProps) {
	return <SelectTriggerBase className={cn('focus-visible:ring cursor-pointer', className)} {...props} />
}

export {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectSeparator,
	SelectTrigger,
	SelectValue,
}
