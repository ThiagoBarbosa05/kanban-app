import * as Dialog from '@radix-ui/react-dialog'
import { MoreVertical, X } from 'lucide-react'

import { Box } from '../../ui/box'
import { Checkbox } from '../../ui/checkbox'
import { DialogOverlay } from '../../ui/overlay'
import { Select } from '../../ui/select'
import { TaskDropdownMenu } from './task-dropdown-menu'

interface TaskDetailProps {
  children: React.ReactNode
}

export function TaskDetail({ children }: TaskDetailProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay />
        <Dialog.Content>
          <Box size="md">
            <div className="mb-6 flex items-center justify-between gap-4">
              <h3 className="leading- text-lg font-bold leading-6 text-black dark:text-white">
                Research pricing points of various competitors and trial
                different business models
              </h3>
              <TaskDropdownMenu>
                <MoreVertical className="min-w-10 text-medium-grey" />
              </TaskDropdownMenu>
            </div>

            <p className="text-xs font-medium leading-6 text-medium-grey">
              We know what we&apos;re planning to build for version one. Now we
              need to finalise the first pricing model we&apos;ll use. Keep
              iterating the subtasks until we have a coherent proposition.
            </p>

            <div className="mt-6">
              <span className="text-sm font-bold text-medium-grey dark:text-white">
                Subtasks (2 of 3)
              </span>
              <div className="mt-4 flex flex-col gap-2">
                <Checkbox>
                  Research competitor pricing and business models
                </Checkbox>
                <Checkbox>
                  Outline a business model that works for our solution
                </Checkbox>
                <Checkbox>Surveying and testing</Checkbox>
              </div>

              <div className="mt-6">
                <span className="mb-2 block text-xs font-bold text-medium-grey dark:text-white">
                  Current Status
                </span>
                <Select />
              </div>
            </div>
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
