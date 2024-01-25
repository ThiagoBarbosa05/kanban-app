import { EyeOff, KanbanSquare, Plus } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectBoard } from '@/features/boardSlice'

import { AddNewBoard } from '../modal/board/add-new-board'
import { ThemeToggle } from '../theme/theme-toggle'

interface SidebarProps {
  isHideSidebar: boolean
  setIsHideSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

export function Sidebar({ isHideSidebar, setIsHideSidebar }: SidebarProps) {
  const boards = useAppSelector((state) => state.board)

  const dispatch = useAppDispatch()

  const handleBoardClick = (boardId?: string) => {
    if (boardId) {
      dispatch(selectBoard({ id: boardId }))
    }
  }

  return (
    <section
      className={twMerge(
        'hidden w-[284px] flex-col justify-between border-r border-lines-light bg-white pb-12 transition-all duration-300 dark:border-lines-dark dark:bg-dark-grey md:flex',
        isHideSidebar ? 'ml-[-284px]' : 'ml-0',
      )}
    >
      <div>
        <span className="mb-5 mt-4 block pl-6 text-xs font-bold tracking-[2.4px] text-medium-grey">
          ALL BOARDS (3)
        </span>
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
      </div>

      <div>
        <ThemeToggle />
        <button
          onClick={() => setIsHideSidebar(true)}
          className="mt-2 flex w-[calc(100%_-_16px)] items-center gap-2 rounded-r-full py-[0.875rem] pl-6 text-md font-bold text-medium-grey hover:bg-main-purple/10 hover:text-main-purple dark:hover:bg-white"
        >
          <EyeOff /> Hide Sidebar
        </button>
      </div>
    </section>
  )
}
