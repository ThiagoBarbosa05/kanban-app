import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import { Box } from '@/components/ui/box'

import { DeleteTask } from './delete-task'

interface TaskDropdownMenuProps {
  children: React.ReactNode
}

export function TaskDropdownMenu({ children }: TaskDropdownMenuProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>
      <DropdownMenu.Content align="end" className="mt-2">
        <Box
          size="sm"
          className="relative animate-flip-down shadow-dropdown-menu dark:bg-very-dark-grey-dark-bg  dark:shadow-transparent"
        >
          <DropdownMenu.Item className="mb-4 cursor-pointer text-sm font-medium leading-6 text-medium-grey">
            Edit Task
          </DropdownMenu.Item>
          <DeleteTask>
            <button className="cursor-pointer text-sm font-medium leading-6 text-red">
              {' '}
              Delete Task
            </button>
          </DeleteTask>
        </Box>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
