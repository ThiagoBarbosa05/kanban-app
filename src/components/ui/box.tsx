import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface BoxProps extends ComponentProps<'div'> {
  children: React.ReactNode
  size: 'sm' | 'md' | 'lg'
}

export function Box({ children, size, className, ...props }: BoxProps) {
  return (
    <div
      className={twMerge(
        'scrollbar-styled fixed left-4 right-4 top-1/2 mx-auto max-h-[650px] max-w-[480px] -translate-y-1/2 animate-fade overflow-y-auto rounded-md bg-white animate-delay-0 dark:bg-dark-grey ',
        size === 'sm' && 'p-4 md:p-6',
        size === 'md' && 'p-6 md:p-8',
        size === 'lg' && 'p-8',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
