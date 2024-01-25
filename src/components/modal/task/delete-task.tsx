import * as Dialog from '@radix-ui/react-dialog'

import { Box } from '@/components/ui/box'
import { Button } from '@/components/ui/button'
import { DialogOverlay } from '@/components/ui/overlay'

interface DeleteTaskProps {
  children: React.ReactNode
}

export function DeleteTask({ children }: DeleteTaskProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay />
        <Dialog.Content>
          <Box size="md" className="flex flex-col gap-6">
            <h3 className="text-lg font-bold text-red">Delete this task</h3>

            <p className="text-xs font-medium leading-6 text-medium-grey">
              Are you sure you want to delete the ‘Build settings UI’ task and
              its subtasks? This action cannot be reversed.
            </p>

            <div className="flex flex-col gap-4">
              <Button variant="destructive" className="py-2 text-xs leading-6">
                Delete
              </Button>
              <Dialog.Close asChild>
                <Button variant="secondary" className="py-2 text-xs leading-6">
                  Cancel
                </Button>
              </Dialog.Close>
            </div>
          </Box>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
