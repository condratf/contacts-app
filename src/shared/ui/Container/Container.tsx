import { FC, PropsWithChildren } from 'react'

export const Container: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='d-flex flex-column align-items-center justify-content-center gap-1 p-3 bg-sky-500/25 w-[100%] w-[75vw] mx-auto min-w-[700px] max-w-[990px] '>
      {children}
    </div>
  )
}
