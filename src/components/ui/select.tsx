import * as SelectPrimitive from '@radix-ui/react-select'
import { ChevronDown } from 'lucide-react'
import { ChangeEvent, SelectHTMLAttributes } from 'react'

import { useAppSelector } from '@/app/hooks'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

export const Select = ({ onChange }: SelectProps) => {
  const board = useAppSelector((state) =>
    state.board.find((board) => board.isSelected),
  )

  return (
    <SelectPrimitive.Root
      onValueChange={(value: string) =>
        onChange(value as unknown as ChangeEvent<HTMLSelectElement>)
      }
      defaultValue={board?.columns[0].id}
    >
      <SelectPrimitive.Trigger className="flex h-9 w-full items-center justify-between whitespace-nowrap rounded border border-medium-grey/25 bg-transparent px-4 py-2 text-xs font-medium text-black outline-none disabled:cursor-not-allowed  disabled:opacity-50 data-[state=open]:border-main-purple dark:text-white">
        <SelectPrimitive.Value placeholder="Select a task" />
        <SelectPrimitive.Icon className=" text-main-purple">
          <ChevronDown size={12} strokeWidth={3} />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          position="popper"
          className="relative z-50 mt-1 overflow-hidden rounded bg-light-grey-light-bg text-medium-grey data-[state=open]:animate-flip-down data-[state=open]:animate-duration-200 dark:bg-very-dark-grey-dark-bg"
        >
          <SelectPrimitive.Viewport className="flex  h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] flex-col gap-2 overflow-hidden p-4">
            {board?.columns.map((col) => (
              <SelectPrimitive.Item
                className="cursor-pointer text-xs font-medium leading-6 text-medium-grey outline-none"
                value={col.id}
                key={col.id}
              >
                <SelectPrimitive.ItemText>{col.name}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}
