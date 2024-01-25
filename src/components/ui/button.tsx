import React, { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ComponentProps<'button'> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'destructive'
  size?: 'lg' | 'sm'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, children, className, ...props }, ref) => {
    return (
      <button
        {...props}
        className={twMerge(
          'block w-full rounded-full font-bold text-white transition',
          variant === 'primary' && 'bg-main-purple hover:bg-main-purple-hover',
          variant === 'secondary' &&
            'bg-main-purple/10 text-main-purple hover:bg-main-purple/25 dark:bg-white',
          variant === 'destructive' && 'bg-red hover:bg-red-hover',
          size === 'lg' && 'py-[0.875rem] text-md',
          size === 'sm' && 'py-2 text-sm',
          className,
        )}
        ref={ref}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
