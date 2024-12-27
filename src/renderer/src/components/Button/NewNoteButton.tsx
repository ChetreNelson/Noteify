import { ActionButton, ActionButtonProps } from '@/components'
import { CiCirclePlus } from 'react-icons/ci'

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  return (
    <ActionButton {...props}>
      <CiCirclePlus className="w-4 h-4 text-zinc-300" />
    </ActionButton>
  )
}
