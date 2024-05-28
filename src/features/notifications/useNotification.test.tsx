import { renderHook, act } from '@testing-library/react'
import { useNotification } from './useNotification'
import { NotificationContext, NotificationContextType } from './NotificationContext'
import { PropsWithChildren } from 'react'

const mockSetCurrNotif = jest.fn()

const mockContextValue: NotificationContextType = {
  currNotif: null,
  setCurrNotif: mockSetCurrNotif
}

const wrapper: React.FC<PropsWithChildren> = ({ children }) => (
  <NotificationContext.Provider value={mockContextValue}>
    {children}
  </NotificationContext.Provider>
)

describe('useNotification', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.spyOn(console, 'error').mockImplementation(() => {})
  })

  test('notifyError sets error notification', () => {
    const { result } = renderHook(() => useNotification(), { wrapper })
    const error = new Error('Test error')

    act(() => {
      result.current.notifyError(error)
    })

    expect(console.error).toHaveBeenCalledWith(error)
    expect(mockSetCurrNotif).toHaveBeenCalledWith({ msg: 'Test error', type: 'error' })
  })

  test('notifySuccess sets success notification with default message', () => {
    const { result } = renderHook(() => useNotification(), { wrapper })

    act(() => {
      result.current.notifySuccess()
    })

    expect(mockSetCurrNotif).toHaveBeenCalledWith({ msg: 'operation succeeded', type: 'success' })
  })

  test('notifySuccess sets success notification with custom message', () => {
    const { result } = renderHook(() => useNotification(), { wrapper })
    const successMessage = 'Custom success message'

    act(() => {
      result.current.notifySuccess(successMessage)
    })

    expect(mockSetCurrNotif).toHaveBeenCalledWith({ msg: successMessage, type: 'success' })
  })
})
