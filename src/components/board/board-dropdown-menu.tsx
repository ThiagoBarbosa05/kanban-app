import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { useState } from 'react'

import { useAppSelector } from '@/app/hooks'

import { DeleteBoard } from '../modal/board/delete-board'
import EditBoard from '../modal/board/edit-board'
import { Box } from '../ui/box'

interface BoardDropdownMenuProps {
  children: React.ReactNode
}

export function BoardDropdownMenu({ children }: BoardDropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const board = useAppSelector((state) =>
    state.board.find((board) => board.isSelected),
  )

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu.Trigger asChild>{children}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="pr-6">
          <Box
            size="sm"
            className="relative flex animate-flip-down flex-col items-start shadow-dropdown-menu  dark:bg-very-dark-grey-dark-bg"
          >
            <EditBoard boardId={board?.id}>
              <button className="mb-4 cursor-pointer text-sm font-medium leading-6 text-medium-grey">
                Edit Board
              </button>
            </EditBoard>

            <DeleteBoard closeMenuDropdown={setIsOpen}>
              <button className="cursor-pointer text-sm font-medium leading-6 text-red">
                Delete Board
              </button>
            </DeleteBoard>
          </Box>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
