import React from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, error, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <input
          type={type}
          className={twMerge(
            'w-full rounded border border-medium-grey/25 bg-transparent px-4 py-2 text-xs font-medium leading-6 outline-1 outline-main-purple dark:text-white',
            error && 'border-red outline-red',
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-red">
            {error}
          </span>
        )}
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
