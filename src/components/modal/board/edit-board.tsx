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
import { editBoard } from '@/features/boardSlice'

interface EditBoardProps {
  children: React.ReactNode
  boardId: string | undefined
}

const boardFormSchema = z.object({
  name: z.string().min(1, { message: "Can't be empty" }),
  columns: z.array(
    z.object({ id: z.string(), name: z.string(), color: z.string() }),
  ),
})

export type BoardFormData = z.infer<typeof boardFormSchema>

export default function EditBoard({ children, boardId }: EditBoardProps) {
  const [isOpen, setIsOpen] = useState(false)

  const board = useAppSelector((state) =>
    state.board.find((board) => board.id === boardId),
  )

  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm<BoardFormData>({
    resolver: zodResolver(boardFormSchema),
    defaultValues: {
      name: board?.name,
      columns: board?.columns,
    },
  })

  const dispatch = useAppDispatch()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'columns',
  })

  function onSubmitEditBoard(data: BoardFormData) {
    dispatch(editBoard({ id: boardId!, ...data }))
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.DialogOverlay />
        <Dialog.Content>
          <Box size="md" className="">
            <h3 className="mb-6 text-lg font-bold text-black dark:text-white">
              Add New Board
            </h3>

            <form
              onSubmit={handleSubmit(onSubmitEditBoard)}
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
                Save Changes
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
