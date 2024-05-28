import { FC, useContext, useEffect } from 'react'
import { Button, Dialog } from 'src/shared/ui'
import { ContactContext } from '../ContactContext'

export const RemoveContact: FC<{
  removeId: string | null,
  onClose: () => void
}> = ({ removeId, onClose }) => {
  const { remove, isPending, actionSuccess } = useContext(ContactContext)

  const handleConfirmRemove = () => {
    if (!removeId) return
    remove(removeId)
  }

  useEffect(() => {
    actionSuccess && onClose()
  }, [actionSuccess, onClose])

  return removeId ? (
    <Dialog isOpen={!!removeId} onClose={onClose}>
      <div className='w-[100%] d-flex flex-column gap-2 align-center justify-center'>
        <h3 className='h3'>Confirm remove contact</h3>
        <div className='d-flex gap-2 align-center justify-center'>
          <Button disabled={isPending} variant='danger' onClick={handleConfirmRemove}>Confirm</Button>
          <Button disabled={isPending} variant='secondary' onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </Dialog>
  ) : null
}
