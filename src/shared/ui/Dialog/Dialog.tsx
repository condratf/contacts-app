import React, { useRef, useEffect, PropsWithChildren } from 'react'
import { Icon } from '../Icon'

type DialogProps = {
  title?: string
  isOpen: boolean,
  onClose: () => void
}

export const Dialog: React.FC<PropsWithChildren<DialogProps>> = ({
  title,
  isOpen,
  onClose,
  children
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close()
      onClose()
    }
  }

  useEffect(() => {
    const dialogNode = dialogRef.current
    if (!dialogNode) return
    if (isOpen) {
      dialogNode.showModal()
    } else {
      dialogNode.close()
    }

    const handleBackdropClick = (e: MouseEvent | TouchEvent) => {
      if (e.target === dialogNode) onClose()
    };

    dialogNode.addEventListener('click', handleBackdropClick);

    return () => {
      dialogNode.removeEventListener('click', handleBackdropClick);
    };
  }, [isOpen, onClose])

  return (
    <dialog ref={dialogRef} className="p-6 rounded-lg shadow-lg m-auto relative bg-slate-200">
      <Icon name='close' className='absolute right-5 cursor-pointer hover:opacity-50' onClick={closeDialog} role="button" />

      <div className='d-flex flex-column gap-1 p-2'>
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {children}
      </div>
    </dialog>
  )
}
