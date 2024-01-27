import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { nanoid } from '@reduxjs/toolkit'
import { Plus, X } from 'lucide-react'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { Box } from '@/components/ui/box'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DialogOverlay } from '@/components/ui/overlay'
import { addColumn, BoardState } from '@/features/boardSlice'
import { getRandomColor } from '@/lib/utils'

interface AddColumnProps {
  children: React.ReactNode
  board: BoardState
}

const addColumnSchema = z.object({
  columns: z.array(
    z.object({ id: z.string(), name: z.string(), color: z.string() }),
  ),
})

type AddColumnData = z.infer<typeof addColumnSchema>

export function AddColumn({ children }: AddColumnProps) {
  const [isOpen, setIsOpen] = useState(false)

  const board = useAppSelector((state) =>
    state.board.find((board) => board.isSelected),
  )

  const dispatch = useAppDispatch()

  const { control, register, handleSubmit } = useForm<AddColumnData>({
    resolver: zodResolver(addColumnSchema),
    defaultValues: {
      columns: board!.columns,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'columns',
  })

  function handleAddColumn(data: AddColumnData) {
    data.columns.forEach((col) => {
      if (col.color === '') {
        col.color = getRandomColor()
      }
    })
    dispatch(addColumn({ id: board!.id, columns: data.columns }))
    setIsOpen(!isOpen)
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay />
        <Dialog.Content>
          <Box size="md">
            <h3 className="mb-6 text-lg font-bold text-black dark:text-white">
              Add Column on{' '}
              <span className="text-main-purple">{board?.name}</span>
            </h3>

            <form onSubmit={handleSubmit(handleAddColumn)}>
              <div className="flex flex-col gap-3">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex items-center justify-between gap-4"
                  >
                    <Input
                      type="text"
                      {...field}
                      {...register(`columns.${index}.name`)}
                    />
                    <button onClick={() => remove(index)}>
                      <X
                        className="text-medium-grey"
                        size={20}
                        strokeWidth={3}
                      />
                    </button>
                  </div>
                ))}

                <Button
                  className="mt-3 flex items-center justify-center gap-1 py-3 text-xs"
                  variant="secondary"
                  type="button"
                  onClick={() => append({ id: nanoid(), name: '', color: '' })}
                >
                  <Plus size={12} /> Add New Column
                </Button>
              </div>
              <Button
                className="mt-3 py-3 text-xs font-bold text-white"
                variant="primary"
              >
                Save
              </Button>
            </form>
          </Box>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
