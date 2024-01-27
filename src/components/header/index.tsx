import { MoreVertical, Plus } from 'lucide-react'

import { useAppSelector } from '@/app/hooks'
import logo from '@/assets/logo.png'

import { BoardDropdownMenu } from '../board/board-dropdown-menu'
import { MenuMobile } from '../modal/menu-mobile'
import AddNewTask from '../modal/task/add-new-task'
import { Button } from '../ui/button'

export function Header() {
  const board = useAppSelector((state) =>
    state.board.find((board) => board.isSelected),
  )

  return (
    <header className="flex h-16 items-center justify-between bg-white px-4 dark:border-lines-dark dark:bg-dark-grey md:h-20 md:border-b md:border-lines-light md:px-6">
      <div className="flex items-center gap-4 md:items-center md:gap-6">
        <div className="relative flex items-center gap-4 md:w-[260px]">
          <img src={logo} alt="kanban logo" />
          <span className="hidden pr-20 text-3xl font-black text-black after:absolute after:bottom-0 after:right-0 after:top-[-1.4rem] after:h-20 after:w-[1px] after:bg-lines-light dark:text-white after:dark:bg-lines-dark md:block">
            Kanban
          </span>
        </div>

        <span className="hidden text-[1.25rem] font-bold text-black dark:text-white md:block">
          {board ? board.name : 'No boards found'}
        </span>
        <MenuMobile />
      </div>
      {board && (
        <div className="flex items-center gap-3">
          <AddNewTask>
            <Button
              variant="primary"
              className="flex items-baseline gap-1 px-[1.125rem] py-[0.625rem] disabled:opacity-25"
            >
              <Plus className="h-3 w-3" strokeWidth={3} />
              <span className="hidden sm:block">Add New Task</span>
              <span className="sr-only">Add new task</span>
            </Button>
          </AddNewTask>

          <BoardDropdownMenu>
            <button>
              <MoreVertical className="h-6 text-medium-grey" />
            </button>
          </BoardDropdownMenu>
        </div>
      )}
    </header>
  )
}
