import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { Plus, X } from 'lucide-react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Box } from '@/components/ui/box'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DialogOverlay } from '@/components/ui/overlay'
import { Select } from '@/components/ui/select'

interface AddNewTaskProps {
  children: React.ReactNode
}

const AddNewTaskSchema = z.object({
  title: z.string().min(1, { message: "Can't be empty" }),
  description: z.string().optional(),
  subtasks: z.array(z.object({ title: z.string() })),
  boardId: z.string(),
})

type AddNewTaskData = z.infer<typeof AddNewTaskSchema>

export default function AddNewTask({ children }: AddNewTaskProps) {
  const { control } = useForm<AddNewTaskData>({
    resolver: zodResolver(AddNewTaskSchema),
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subtasks',
  })

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

            <form className="flex w-full flex-col gap-6">
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
                />
              </div>

              <div>
                <span className="mb-2 block text-xs font-bold text-medium-grey dark:text-white">
                  Subtasks
                </span>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-between gap-4">
                    <Input type="text" />
                    <X className="text-medium-grey" size={20} strokeWidth={3} />
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <Input type="text" />
                    <X className="text-medium-grey" size={20} strokeWidth={3} />
                  </div>
                </div>

                <Button
                  className="mt-3 flex items-center justify-center gap-1 py-3 text-xs"
                  variant="secondary"
                >
                  <Plus size={12} /> Add New Subtask
                </Button>
              </div>

              <div>
                <span className="mb-2 block text-xs font-bold text-medium-grey dark:text-white">
                  Status
                </span>
                <Select />
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
