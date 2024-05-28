import { FC, useContext } from 'react'
import { Dialog } from 'src/shared/ui'
import { ContactContext } from '../ContactContext'
import { ContactForm } from '../ContactForm'

export const EditContact: FC = () => {
  const {
    currItem,
    setCurrItem,
  } = useContext(ContactContext)

  return currItem && (
    <Dialog isOpen={!!currItem} onClose={() => setCurrItem(null)} title={'Edit Contact'} >
      <ContactForm type='edit' itemValues={currItem} />
    </Dialog>
  )
}
