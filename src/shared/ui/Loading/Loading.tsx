import { FC } from 'react'

export const Loading: FC = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="border-4 border-solid border-gray-200 border-t-4 border-t-[#8588F4] rounded-full w-10 h-10 animate-spin" />
    </div>
  )
}

export const LoadingWithBackdrop: FC = () => {
  return (
    <div className='absolute top-0 left-0 w-[100%] h-[100%] d-flex align-center justify-center opacity-25 bg-black'>
      <Loading />
    </div>
  )
}