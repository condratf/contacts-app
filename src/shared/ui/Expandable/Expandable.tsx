import { FC, PropsWithChildren, ReactNode, useState } from 'react'
// local
import { Icon } from '../Icon'

export const Expandable: FC<PropsWithChildren<{ title?: ReactNode }>> = ({ title, children }) => {
  const [collapsed, setCollapsed] = useState(true)

  return (
    <div className={`overflow-hidden w-full ease-out ${collapsed ? 'max-h-[50px]' : 'max-h-[900px] opacity-100'}`}>
      <div
        className="px-2 py-2 cursor-pointer select-none flex items-center justify-between mb-6 text-center"
        onClick={async () => { setCollapsed(v => !v) }}
        role="button"
        tabIndex={0}
      >
        <>
          {title}
        </>

        <span className="opacity-70 flex justify-between hover:opacity-100 w-[100%]">
          <div />
          <Icon name={collapsed ? 'down' : 'up'} />
        </span>
      </div>
      <div className={`px-2 pl-4 ${collapsed ? 'hidden' : 'block'}`}>
        {children}
      </div>
    </div>
  )
}
