import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ContactContextProvider } from './ContactContextProvider'
import { ContactContext } from './ContactContext'
import { apiFetchAllContacts, apiAddContact, apiUpdateContact, apiDeleteContact, IContact } from '../../../data/contacts'
import { useNotification } from '../../../shared/hooks'

// Mocking API calls
jest.mock('src/data/contacts', () => ({
  apiFetchAllContacts: jest.fn(),
  apiAddContact: jest.fn(),
  apiUpdateContact: jest.fn(),
  apiDeleteContact: jest.fn(),
}))

jest.mock('src/shared/hooks', () => ({
  useNotification: jest.fn(),
}))

const mockContacts: IContact[] = [
  { id: '1', name: 'Alice' },
  { id: '2', name: 'Bob' },
]

const mockNotifyError: jest.Mock = jest.fn()
const mockNotifySuccess: jest.Mock = jest.fn()



describe('ContactContextProvider', () => {
  let queryClient: QueryClient

  beforeEach(() => {
    (useNotification as jest.Mock).mockReturnValue({
      notifyError: mockNotifyError,
      notifySuccess: mockNotifySuccess,
    })
    queryClient = new QueryClient()

    jest.clearAllMocks()
  })

  test('fetches and displays contacts', async () => {
    (apiFetchAllContacts as jest.Mock).mockResolvedValueOnce(mockContacts)

    render(
      <QueryClientProvider client={queryClient}>
        <ContactContextProvider>
          <ContactContext.Consumer>
            {({ items, isLoading }) => (
              <>
                {isLoading ? 'Loading...' : items.map(contact => <div key={contact.id}>{contact.name}</div>)}
              </>
            )}
          </ContactContext.Consumer>
        </ContactContextProvider>
      </QueryClientProvider>
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()

    await waitFor(() => expect(apiFetchAllContacts).toHaveBeenCalled())
    await screen.findByText('Alice')
    expect(screen.getByText('Bob')).toBeInTheDocument()
  })

  test('adds a new contact', async () => {
    (apiFetchAllContacts as jest.Mock).mockResolvedValueOnce(mockContacts);
    (apiAddContact as jest.Mock).mockResolvedValueOnce({ id: '3', name: 'Charlie' })

    render(
      <QueryClientProvider client={queryClient}>
        <ContactContextProvider>
          <ContactContext.Consumer>
            {({ items, add }) => (
              <>
                <button onClick={() => add({ name: 'Charlie' } as IContact)}>Add Contact</button>
                {items.map(contact => <div key={contact.id}>{contact.name}</div>)}
              </>
            )}
          </ContactContext.Consumer>
        </ContactContextProvider>
      </QueryClientProvider>
    )

    await screen.findByText('Alice')
    expect(screen.getByText('Bob')).toBeInTheDocument()

    userEvent.click(screen.getByText('Add Contact'))

    await waitFor(() => expect(apiAddContact).toHaveBeenCalledWith({ name: 'Charlie' }))
    await waitFor(() => expect(mockNotifySuccess).toHaveBeenCalled())
  })


  test('updates an existing contact', async () => {
    (apiFetchAllContacts as jest.Mock).mockResolvedValueOnce(mockContacts);
    (apiUpdateContact as jest.Mock).mockResolvedValueOnce({ id: '1', name: 'Alice Updated' })

    render(
      <QueryClientProvider client={queryClient}>
        <ContactContextProvider>
          <ContactContext.Consumer>
            {({ items, update }) => (
              <>
                <button onClick={() => update({ id: '1', name: 'Alice Updated' } as IContact)}>Update Contact</button>
                {items.map(contact => <div key={contact.id}>{contact.name}</div>)}
              </>
            )}
          </ContactContext.Consumer>
        </ContactContextProvider>
      </QueryClientProvider>
    )

    await screen.findByText('Alice')
    userEvent.click(screen.getByText('Update Contact'))

    await waitFor(() => expect(apiUpdateContact).toHaveBeenCalledWith({ id: '1', name: 'Alice Updated' }))
    await waitFor(() => expect(mockNotifySuccess).toHaveBeenCalled())
  })

  test('deletes an existing contact', async () => {
    (apiFetchAllContacts as jest.Mock).mockResolvedValueOnce(mockContacts);
    (apiDeleteContact as jest.Mock).mockResolvedValueOnce({})

    render(
      <QueryClientProvider client={queryClient}>
        <ContactContextProvider>
          <ContactContext.Consumer>
            {({ items, remove }) => (
              <>
                <button onClick={() => remove('1')}>Delete Contact</button>
                {items.map(contact => <div key={contact.id}>{contact.name}</div>)}
              </>
            )}
          </ContactContext.Consumer>
        </ContactContextProvider>
      </QueryClientProvider>
    )

    await screen.findByText('Alice')
    userEvent.click(screen.getByText('Delete Contact'))

    await waitFor(() => expect(apiDeleteContact).toHaveBeenCalledWith('1'))
    await waitFor(() => expect(mockNotifySuccess).toHaveBeenCalled())
  })

  test('toggles sorting direction', async () => {
    (apiFetchAllContacts as jest.Mock).mockResolvedValueOnce(mockContacts)
  
    render(
      <QueryClientProvider client={queryClient}>
        <ContactContextProvider>
          <ContactContext.Consumer>
            {({ items, toggleSortDir }) => (
              <>
                <button onClick={toggleSortDir}>Toggle Sort</button>
                {items.map(contact => <div key={contact.id}>{contact.name}</div>)}
              </>
            )}
          </ContactContext.Consumer>
        </ContactContextProvider>
      </QueryClientProvider>
    )
  
    await screen.findByText('Alice')
    expect(screen.getByText('Bob')).toBeInTheDocument()
  
    userEvent.click(screen.getByText('Toggle Sort'))
  
    // Wait for the sorting to take effect
    await waitFor(() => {
      const sortedContacts = screen.getAllByText(/Alice|Bob/)
  
      // Expect the first contact to be Alice and the second contact to be Bob
      expect(sortedContacts[0]).toHaveTextContent('Alice')
    })
  
    // Click again to toggle the sorting direction
    userEvent.click(screen.getByText('Toggle Sort'))
  
    // Wait for the sorting to take effect
    await waitFor(() => {
      const sortedContacts = screen.getAllByText(/Alice|Bob/)
  
      // Expect the first contact to be Bob and the second contact to be Alice
      expect(sortedContacts[0]).toHaveTextContent('Bob')
    })
  })
  
})
