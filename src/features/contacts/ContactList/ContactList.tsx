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
          { title: 'Name', sortDir: nameSortDir, toggleSort: toggleSortDir },
          { title: 'Email', },
          { title: 'Phone', },
          { title: 'Age', },
        ]}
      />

      <ListBody isLoading={isLoading}>
        {items.map(item => (
          <ListItem
            items={[
              { title: item.name },
              { title: item.email },
              { title: item.phone },
              { title: item.age },
            ]}
            onEdit={() => setCurrItem(item)}
            onDelete={() => setRemoveCandidateId(item.id)}
            key={item.id}
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
