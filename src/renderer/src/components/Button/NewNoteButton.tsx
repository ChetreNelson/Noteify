import { ActionButton, ActionButtonProps } from '@/components'
import { createEmptyNoteAtom } from '@renderer/store'
import { useSetAtom } from 'jotai'
import { IoCreateOutline } from 'react-icons/io5'

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  const createEmptyNote = useSetAtom(createEmptyNoteAtom)
  const handleCreation = async () => {
    await createEmptyNote()
  }
  return (
    <ActionButton onClick={handleCreation} {...props}>
      <IoCreateOutline className="w-4 h-4  text-zinc-30" />
    </ActionButton>
  )
}
