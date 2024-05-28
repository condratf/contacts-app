import { FC, PropsWithChildren } from 'react'
import { createPortal } from 'react-dom'

export const NotificationPortal: FC<PropsWithChildren> = ({ children }) => {
  return createPortal(
    <div className='fixed bottom-4 right-4 rounded-md shadow-md'>
      {children}
    </div>, document?.body
  )
}

export const Notification: FC<{ type: 'success' | 'error', msg: string }> = ({ type, msg }) => {
  const classes = {
    success: 'bg-green-500 ',
    error: 'bg-red-500',
  }[type]

  return (
    <div className={`p-1 text-center text-white ${classes} w-[100%] h-[100%] p-4`}>
      <p>{msg}</p>
    </div>
  )
}
