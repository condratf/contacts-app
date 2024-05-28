import { FC } from 'react'

export const ErrorView: FC<{ err?: unknown }> = ({ err }) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4">
      <h2 className="text-black text-center text-base">Error occurred</h2>
      <p className="text-black text-center">{JSON.stringify(err)}</p>
    </div>
  )
}
