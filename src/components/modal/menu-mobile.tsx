import * as Dialog from '@radix-ui/react-dialog'
import { ChevronDown, KanbanSquare, Plus } from 'lucide-react'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectBoard } from '@/features/boardSlice'

import { ThemeToggle } from '../theme/theme-toggle'
import { DialogOverlay } from '../ui/overlay'
import { AddNewBoard } from './board/add-new-board'

export function MenuMobile() {
  const [isMenuOpen, setMenuIsOpen] = useState<boolean>(false)

  const boards = useAppSelector((state) => state.board)

  const dispatch = useAppDispatch()

  const board = boards.find((board) => board.isSelected)

  const handleBoardClick = (boardId?: string) => {
    if (boardId) {
      dispatch(selectBoard({ id: boardId }))
    }
    setMenuIsOpen(!isMenuOpen)
  }

  return (
    <Dialog.Root open={isMenuOpen} onOpenChange={setMenuIsOpen}>
      <Dialog.Trigger asChild>
        <div className="flex items-center gap-2 md:hidden">
          <span className="text-lg font-bold text-black dark:text-white">
            {board ? board.name : 'No boards found'}
          </span>
          <ChevronDown
            strokeWidth={3}
            className={twMerge(
              'mt-1 h-4 w-4 text-main-purple md:hidden',
              isMenuOpen
                ? 'rotate-180 transition-transform duration-200 ease-in'
                : 'rotate-0 transition-transform duration-200 ease-in',
            )}
          />
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay />

        <Dialog.Content className="fixed left-1/2 top-20 min-w-[264px] -translate-x-1/2 rounded-lg bg-white py-4 shadow-custom data-[state=open]:animate-fade data-[state=open]:animate-duration-500 dark:bg-dark-grey  sm:w-[375px]">
          <Dialog.Title className="mb-5 pl-6 text-xs font-bold tracking-[2.4px] text-medium-grey">
            ALL BOARDS (3)
          </Dialog.Title>
          <nav className="mb-4">
            {boards.map((board) => (
              <button
                onClick={() => handleBoardClick(board.id)}
                key={board.id}
                className={twMerge(
                  'flex w-[85%] items-center gap-3 rounded-r-full py-[0.875rem] pl-6 text-md font-bold text-medium-grey outline-none ',
                  board.isSelected && 'bg-main-purple text-white ',
                )}
              >
                <KanbanSquare />
                <span>{board.name}</span>
              </button>
            ))}

            <AddNewBoard>
              <button className="flex  items-center gap-3 py-[0.875rem] pl-6 font-bold text-main-purple outline-none ">
                <KanbanSquare />
                <span className="flex items-center gap-1 text-md font-bold">
                  <Plus className="h-3 w-3" strokeWidth={3} />
                  <span>Create New Board</span>
                </span>
              </button>
            </AddNewBoard>
          </nav>
          <ThemeToggle />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
