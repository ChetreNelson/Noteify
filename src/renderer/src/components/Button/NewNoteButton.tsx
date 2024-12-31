import { ActionButton, ActionButtonProps } from '@/components'
import { createEmptyNoteAtom } from '@renderer/store'
import { useSetAtom } from 'jotai'
import { CiCirclePlus } from 'react-icons/ci'

export const NewNoteButton = ({ ...props }: ActionButtonProps) => {
  const createEmptyNote = useSetAtom(createEmptyNoteAtom)
  const handleCreation = async () => {
    await createEmptyNote()
  }
  return (
    <ActionButton onClick={handleCreation} {...props}>
      <CiCirclePlus className="w-4 h-4  text-zinc-300" />
    </ActionButton>
  )
}
