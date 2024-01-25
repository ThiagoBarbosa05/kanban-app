import { Plus } from 'lucide-react'

import { Button } from '../ui/button'

export function EmptyBoard() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-4 text-center">
      <span className="text-lg font-bold text-medium-grey">
        This board is empty. Create a new column to get started.
      </span>
      <Button
        variant="primary"
        size="lg"
        className="flex max-w-[171px] items-center justify-center gap-1 py-3"
      >
        <Plus size={16} />
        Add New Column
      </Button>
    </div>
  )
}
