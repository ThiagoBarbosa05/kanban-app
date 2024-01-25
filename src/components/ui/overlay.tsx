import { Overlay } from '@radix-ui/react-dialog'
import React, { ComponentProps } from 'react'

interface OverlayProps extends ComponentProps<'div'> {}

export const DialogOverlay = React.forwardRef<HTMLDivElement, OverlayProps>(
  ({ ...props }, ref) => {
    return (
      <Overlay
        {...props}
        className="fixed inset-0 animate-fade bg-black/50 animate-duration-500"
        ref={ref}
      />
    )
  },
)

DialogOverlay.displayName = 'DialogOverlay'
