import { FC } from 'react'
import downIc from 'src/shared/assets/angle-down.svg'
import upIc from 'src/shared/assets/angle-up.svg'
import close from 'src/shared/assets/close.svg'

type IconProps = {
  name: 'down' | 'up' | 'close'
} & React.HTMLAttributes<HTMLImageElement>

export const Icon: FC<IconProps> = ({ name, ...props }) => ({
  down: <img src={downIc} alt="collapse" width={22} height={22} {...props} />,
  up: <img src={upIc} alt="expand" width={22} height={22} {...props} />,
  close: <img src={close} alt="expand" width={22} height={22} {...props} />,
}[name])