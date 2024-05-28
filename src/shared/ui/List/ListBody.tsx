import { FC, PropsWithChildren } from 'react'
import { LoadingWithBackdrop } from '../Loading'

export const ListBody: FC<PropsWithChildren<{ isLoading?: boolean }>> = ({ children, isLoading }) => {
  return (
    <div className='relative w-[100%] h-[100%]'>
      <ul className='d-flex flex-col gap-2 p-1 m-1 w-full'>
        {children}
      </ul>
      {isLoading && (
        <LoadingWithBackdrop />
      )}
    </div>
  )
}
