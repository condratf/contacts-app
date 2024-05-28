import { FC } from 'react'
import { SortDir } from 'src/shared/types'
import { Icon } from '../Icon'

type ListHeadItem = {
  title: string, sortDir?: never, toggleSort?: never
} | {
  title: string, sortDir: SortDir, toggleSort: (...args: unknown[]) => void
}

export const ListHead: FC<{
  items: Array<ListHeadItem>
}> = ({ items }) => {
  return (
    <div className='d-flex flex-row w-[100%] align-items-center p-2 border border-dark rounded-3 bg-light p-1 ml-2'>
      {items.map(({ title, sortDir, toggleSort }) => (
        <span
          className={`w-[197px] overflow-hidden ${sortDir !== undefined && 'cursor-pointer'}`}
          onClick={toggleSort}
          key={title}
        >
          <label className='d-flex scale-90 opacity-75'>
            {title}:
            {sortDir === 'asc' && <Icon name='down' />}
            {sortDir === 'desc' && <Icon name='up' />}
          </label>
        </span>
      ))}
    </div>
  )
}
