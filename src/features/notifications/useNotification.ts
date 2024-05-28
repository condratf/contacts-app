import { useContext } from "react"
import { NotificationContext } from "./NotificationContext"

export function useNotification() {
  const { setCurrNotif } = useContext(NotificationContext)

  const notifyError = (err: Error) => {
    const msg = err.message || 'error occurred'
    console.error(err);
    setCurrNotif({ msg, type: 'error' })
  }

  const notifySuccess = (msg = 'operation succeeded') => {
    setCurrNotif({ msg, type: 'success' })
  }

  return {
    notifyError,
    notifySuccess
  }
}