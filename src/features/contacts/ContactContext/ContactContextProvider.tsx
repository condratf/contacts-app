import { useQuery, useMutation } from '@tanstack/react-query'
import { FC, PropsWithChildren, useEffect, useState } from 'react'
import { IContact, apiFetchAllContacts, apiAddContact, apiUpdateContact, apiDeleteContact } from 'src/data/contacts'
import { ContactContext } from './ContactContext'
import { CONTACTS_KEY } from 'src/config'
import { MutationParams } from './types'
import { useNotification } from 'src/shared/hooks'

export const ContactContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [currItem, setCurrItem] = useState<IContact | null>(null)
  const [actionSuccess, setActionSuccess] = useState<true | null>(null)
  const [sortDir, setSortDir] = useState<'asc' | 'desc' | null>(null)

  const { notifyError, notifySuccess } = useNotification()

  useEffect(() => {
    actionSuccess && setCurrItem(null)
  }, [actionSuccess])

  const {
    data, error, isLoading, isFetching, refetch: refetchList
  } = useQuery<Array<IContact>>({
    queryKey: [CONTACTS_KEY],
    queryFn: async () => {
      return await apiFetchAllContacts()
    },
  })

  const {
    mutate,
    error: mutationError,
    isPending: mutationIsPending
  } = useMutation<void | null, Error, MutationParams>({
    mutationFn: async (params: MutationParams): Promise<void | null> => {
      setActionSuccess(null)
      const { action, contact, id } = params
      if (action === 'add') {
        return await apiAddContact(contact)
      } else if (action === 'update') {
        return await apiUpdateContact(contact)
      } else if (action === 'delete') {
        return await apiDeleteContact(id)
      }
      return null
    },
    onSuccess: () => {
      notifySuccess()
      setActionSuccess(true)
      setTimeout(() => setActionSuccess(null), 99)
      refetchList()
    },
    onError: (err) => {
      setActionSuccess(null)
      notifyError(err)
      refetchList()
    },
  })

  return (
    <ContactContext.Provider value={{
      items: {
        'asc': data?.slice().sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())) || [],
        'desc': data?.slice().sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase())) || [],
        'default': data || [],
      }[sortDir || 'default'],
      error,
      isLoading: isLoading || isFetching,
      currItem,
      actionError: mutationError,
      isPending: mutationIsPending,
      actionSuccess,
      nameSortDir: sortDir,
      setCurrItem,
      toggleSortDir: () => setSortDir(prev => {
        if (prev === null) return 'asc'
        if (prev === 'asc') return 'desc'
        return null
      }),
      add: (item: IContact) => mutate(
        { action: 'add', contact: item }
      ),
      update: (item: IContact) => mutate(
        { action: 'update', contact: item }
      ),
      remove: (id: IContact['id']) => mutate(
        { action: 'delete', id }
      ),
    }}>
      {children}
    </ContactContext.Provider>
  )
}
