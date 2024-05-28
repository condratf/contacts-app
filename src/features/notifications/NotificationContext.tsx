import { createContext, PropsWithChildren, useEffect, useState } from "react"
import { NotificationPortal, Notification } from "src/shared/ui/Notification"

export type NotificationContextType = {
  currNotif: { type: 'success' | 'error', msg: string } | null
  setCurrNotif: (v: { type: 'success' | 'error', msg: string } | null) => void
}

export const NotificationContext = createContext<NotificationContextType>({
  currNotif: null,
  setCurrNotif: () => { },
})

export const NotificationContextProvider = ({ children }: PropsWithChildren) => {
  const [currNotif, setCurrNotif] = useState<NotificationContextType['currNotif'] | null>(null)

  useEffect(() => {
    if (!currNotif) return
    let timeout = setTimeout(() => setCurrNotif(null), 1700)
    return () => {
      setCurrNotif(null)
      clearTimeout(timeout)
    }
  }, [currNotif])

  return (
    <NotificationContext.Provider value={{ currNotif, setCurrNotif }}>
      {children}

      {currNotif && (
        <NotificationPortal >
          <Notification {...currNotif} />
        </NotificationPortal>
      )}
    </NotificationContext.Provider>
  )
}