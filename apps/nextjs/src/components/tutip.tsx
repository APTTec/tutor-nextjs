import type { Side } from '@radix-ui/react-popper'

import { Tooltip, TooltipContent, TooltipTrigger } from '@a/ui/tooltip'

interface TutipProps {
  content: string
  side: Side
  children: React.ReactNode
}

export const Tutip = ({ content, side, children }: TutipProps) => (
  <Tooltip>
    <TooltipTrigger asChild>{children}</TooltipTrigger>
    <TooltipContent side={side}>{content}</TooltipContent>
  </Tooltip>
)
