import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { nanoid } from '@reduxjs/toolkit'
import { Plus, X } from 'lucide-react'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useAppDispatch } from '@/app/hooks'
import { Box } from '@/components/ui/box'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DialogOverlay } from '@/components/ui/overlay'
import { addBoard, BoardState, selectBoard } from '@/features/boardSlice'
import { getRandomColor } from '@/lib/utils'

interface AddNewBoardProps {
  children: React.ReactNode
}

const boardFormSchema = z.object({
  name: z.string().min(1, { message: "Can't be empty" }),
  columns: z.array(
    z.object({ id: z.string(), name: z.string(), color: z.string() }),
  ),
})

export type BoardFormData = z.infer<typeof boardFormSchema>

export function AddNewBoard({ children }: AddNewBoardProps) {
  const [isOpen, setIsOpen] = useState(false)

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<BoardState>({
    resolver: zodResolver(boardFormSchema),
  })

  const dispatch = useAppDispatch()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'columns',
  })

  function onBoardSubmit(data: BoardFormData) {
    const boardId = nanoid()
    data.columns.map((col) => (col.color = getRandomColor()))
    dispatch(addBoard({ id: boardId, ...data }))
    dispatch(selectBoard({ id: boardId }))
    setIsOpen(!isOpen)
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay />
        <Dialog.Content>
          <Box size="md" className="">
            <h3 className="mb-6 text-lg font-bold text-black dark:text-white">
              Add New Board
            </h3>

            <form
              onSubmit={handleSubmit(onBoardSubmit)}
              className="flex w-full flex-col gap-6"
            >
              <div>
                <label
                  className="mb-2 block text-xs font-bold text-medium-grey dark:text-white"
                  htmlFor="name"
                >
                  Board Name
                </label>

                <Input
                  id="name"
                  placeholder="e.g. Web Design"
                  type="text"
                  {...register('name')}
                  error={errors.name?.message}
                />
              </div>

              <div>
                <span className="mb-2 block text-xs font-bold text-medium-grey dark:text-white">
                  Board Columns
                </span>
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
                </div>

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
                className="py-3 text-xs font-bold text-white"
                variant="primary"
              >
                Create New Board
              </Button>
            </form>

            <Dialog.Close asChild>
              <X
                size={16}
                className="absolute right-3 top-3 cursor-pointer text-medium-grey"
              />
            </Dialog.Close>
          </Box>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
