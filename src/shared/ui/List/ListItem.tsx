import { FC } from 'react'
import { Button } from '../Button'

export const ListItem: FC<{
  items: Array<{ title?: string | number }>,
  onEdit?: (...args: Array<unknown>) => void,
  onDelete?: (...args: Array<unknown>) => void,
}> = ({ items, onEdit, onDelete }) => {
  return (
    <div className='d-flex flex-row w-[100%] align-items-center p-2 border border-dark rounded-3 bg-light'>
      {items.map(({ title }) => title ? (
        <span className={`w-[200px] overflow-hidden`} key={title}>
          <p> {title} </p>
        </span>
      ) : null)}

      <div className='d-flex gap-1 ml-auto'>
        {onEdit && <Button variant='secondary' className='w-[50px]' onClick={onEdit}> Edit </Button>}
        {onDelete && <Button variant='danger' className='w-[75px]' onClick={onDelete}> Delete </Button>}
      </div>
    </div>
  )
}
