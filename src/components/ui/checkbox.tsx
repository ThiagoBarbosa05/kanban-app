import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

export function Checkbox({ children }: { children: React.ReactNode }) {
  const [isChecked, setIsChecked] = useState(false)

  return (
    <div
      data-check={!isChecked}
      className="flex items-center gap-4 rounded bg-light-grey-light-bg p-3 transition hover:bg-main-purple/25 dark:bg-very-dark-grey-dark-bg dark:hover:hover:bg-main-purple/25 "
    >
      <CheckboxPrimitive.Root
        className="flex h-4 w-4 min-w-4 items-center justify-center rounded-sm border border-medium-grey/25 data-[state=checked]:bg-main-purple dark:bg-dark-grey dark:data-[state=checked]:bg-main-purple"
        id="c1"
      >
        <CheckboxPrimitive.Indicator>
          <Check size={8} strokeWidth={3} color="#ffffff" />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <label
        onClick={() => setIsChecked(!isChecked)}
        className={twMerge(
          'cursor-pointer text-xs font-bold text-black group-data-[state=checked]:line-through dark:text-white',
        )}
        htmlFor="c1"
      >
        {children}
      </label>
    </div>
  )
}
