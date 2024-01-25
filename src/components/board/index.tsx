import { Plus } from 'lucide-react'

// import { useState } from 'react'
import { useAppSelector } from '@/app/hooks'

// import { BoardState } from '@/features/boardSlice'
import Column from './column'

export function Board() {
  const boards = useAppSelector((state) => state.board)
  const boardSelected = boards.find((board) => board.isSelected)

  return (
    <div className="scrollbar-styled mt-6 flex flex-1 gap-6 overflow-x-auto overflow-y-auto  px-4 pb-12 md:px-6">
      {/* {boards.map((board) => (
        <div key={board.id}>
          {board.columns.map((col) => (
            <Column key={col.id} column={col} />
          ))}
        </div>
      ))} */}
      {boardSelected?.columns.map((col) => (
        <Column key={col.id} column={col} />
      ))}

      <button className="mt-[44px] min-w-[280px] max-w-[280px] rounded-md bg-new-column-light text-medium-grey hover:text-main-purple hover:opacity-65 dark:bg-new-column-dark">
        <span className="flex items-baseline justify-center gap-1 text-lg font-bold ">
          <Plus size={12} strokeWidth={3} /> New Column
        </span>
      </button>
    </div>
  )
}
