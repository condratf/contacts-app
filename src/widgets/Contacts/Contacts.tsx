import { FC } from 'react'
import { AddContact, ContactList, EditContact, ContactContextProvider } from 'src/features/contacts'
import { Container } from 'src/shared/ui'

export const ContactsWithProvider: FC = () => {
  return (
    <ContactContextProvider>
      <Container >
        <ContactList />

        <AddContact />

        <EditContact />
      </Container>
    </ContactContextProvider>
  )
}
