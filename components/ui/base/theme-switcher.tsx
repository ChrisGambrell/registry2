'use client'

import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '../command'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'
import { themes } from './themes'

export function ThemeSwitcher({ children }: { children: React.ReactNode }) {
	const [open, setOpen] = useState(false)
	const { theme, setTheme } = useTheme()

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			<PopoverContent align='end' className='p-0'>
				<Command>
					<CommandInput placeholder='Search themes...' />
					<CommandList>
						<CommandEmpty>No theme found.</CommandEmpty>
						<CommandGroup>
							{themes.map((t) => (
								<CommandItem
									key={t.value}
									value={t.value}
									onSelect={(currentValue) => {
										setTheme(currentValue)
										setOpen(false)
									}}
									asChild>
									<div className='flex items-center gap-3'>
										<div className='flex gap-0.5'>
											<ColorBox color={t.styles.primary} />
											<ColorBox color={t.styles.accent} />
											<ColorBox color={t.styles.secondary} />
											<ColorBox color={t.styles.border} />
										</div>
										<span className='capitalize font-medium'>{t.label ?? 'default'}</span>
										<Check className={cn('ml-auto', theme === t.value ? 'opacity-100' : 'opacity-0')} />
									</div>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

function ColorBox({ color }: { color: string }) {
	return <div className='h-3 w-3 rounded-sm border border-muted' style={{ backgroundColor: color }} />
}
