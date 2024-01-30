import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { nanoid } from '@reduxjs/toolkit'
import { Plus, X } from 'lucide-react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { Box } from '@/components/ui/box'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DialogOverlay } from '@/components/ui/overlay'
import { Select } from '@/components/ui/select'
import { addTask } from '@/features/boardSlice'

interface AddNewTaskProps {
  children: React.ReactNode
}

const addTaskSchema = z.object({
  title: z.string().min(1, { message: "Can't be empty" }),
  description: z.string().optional(),
  subtasks: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
    }),
  ),
  columnId: z.string(),
})

type AddTaskData = z.infer<typeof addTaskSchema>

export default function AddNewTask({ children }: AddNewTaskProps) {
  const dispatch = useAppDispatch()
  const board = useAppSelector((state) =>
    state.board.find((board) => board.isSelected),
  )

  if (!board) {
    throw new Error('Board not found')
  }

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddTaskData>({
    resolver: zodResolver(addTaskSchema),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subtasks',
  })

  function onAddTask(data: AddTaskData) {
    console.log(data)
    dispatch(addTask({ ...data, id: nanoid(), boardId: board!.id }))
  }

  console.log(board)

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay />
        <Dialog.Content>
          <Box size="md" className="">
            <h3 className="mb-6 text-lg font-bold text-black dark:text-white">
              Add New Task
            </h3>

            <form
              onSubmit={handleSubmit(onAddTask)}
              className="flex w-full flex-col gap-6"
            >
              <div>
                <label
                  className="mb-2 block text-xs font-bold text-medium-grey dark:text-white"
                  htmlFor="title"
                >
                  Title
                </label>
                <Input
                  type="text"
                  id="title"
                  placeholder="e.g. Take coffee break"
                  {...register('title')}
                  error={errors.title?.message}
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="mb-2 block text-xs font-bold text-medium-grey dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  className="h-28 w-full resize-none rounded border border-medium-grey/25 bg-transparent px-4 py-2 text-xs font-medium leading-6 outline-1 outline-main-purple dark:text-white"
                  placeholder="e.g. It’s always good to take a break. This 15 minute break will  recharge the batteries little."
                  {...register('description')}
                />
              </div>

              <div>
                <span className="mb-2 block text-xs font-bold text-medium-grey dark:text-white">
                  Subtasks
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
                        {...register(`subtasks.${index}.title`)}
                      />
                      <button type="button" onClick={() => remove(index)}>
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
                  onClick={() => append({ id: nanoid(), title: '' })}
                >
                  <Plus size={12} /> Add New Subtask
                </Button>
              </div>

              <div>
                <span className="mb-2 block text-xs font-bold text-medium-grey dark:text-white">
                  Status
                </span>
                <Controller
                  name="columnId"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange } }) => (
                    <Select onChange={onChange} />
                  )}
                />
              </div>

              <Button
                className="py-3 text-xs font-bold text-white"
                variant="primary"
              >
                Create Task
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
