import { FC, useContext, useState } from 'react'
import { ListBody, ListHead, ListItem, Loading } from 'src/shared/ui'
import { ContactContext } from '../ContactContext'
import { RemoveContact } from '../RemoveContact'

export const ContactList: FC = () => {
  const { items, setCurrItem, isLoading, toggleSortDir, nameSortDir } = useContext(ContactContext)
  const [removeCandidateId, setRemoveCandidateId] = useState<null | string>(null)

  if (!items?.length && isLoading) {
    return <Loading />
  }

  return (
    <>
      <ListHead
        items={[
          { title: 'Name', width: 100, sortDir: nameSortDir, toggleSort: toggleSortDir },
          { title: 'Email', width: 175, },
          { title: 'Phone', width: 175, },
          { title: 'Age', width: 100, },
        ]}
      />

      <ListBody isLoading={isLoading}>
        {items.map(item => (
          <ListItem
            items={[
              { title: item.name, width: 100 },
              { title: item.email, width: 175 },
              { title: item.phone, width: 175 },
              { title: item.age, width: 100 },
            ]}
            onEdit={() => setCurrItem(item)}
            onDelete={() => setRemoveCandidateId(item.id)}
          />
        ))}
      </ListBody>

      <RemoveContact
        removeId={removeCandidateId}
        onClose={() => setRemoveCandidateId(null)}
      />
    </>
  )
}
