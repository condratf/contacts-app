import { FC, useState } from 'react'
import { Button, Dialog } from 'src/shared/ui'
import { ContactForm } from '../ContactForm'

export const AddContact: FC = () => {
  const [showAddForm, setShowAddForm] = useState(false)

  return (
    <div className='d-flex flex-col gap-1 w-[100%]'>
      <Button onClick={() => setShowAddForm(true)} >Add Contact</Button>
      {showAddForm && (
        <Dialog isOpen={showAddForm} onClose={() => setShowAddForm(false)} title="Add Contact">
          <ContactForm type='add' submitCb={() => setShowAddForm(false)} />
        </Dialog>)
      }
    </div>
  )
}
