import { FC } from 'react'
import { ButtonProps } from './types'

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  children,
  icon,
  className,
  disabled,
  ...props
}) => {
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-700 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
    danger: 'bg-red-500 hover:bg-red-700 text-white',
    success: 'bg-green-500 hover:bg-green-700 text-white',
    warning: 'bg-yellow-500 hover:bg-yellow-700 text-white',
    info: 'bg-blue-500 hover:bg-blue-700 text-white',
    transparent: 'bg-transparent',
  }[variant];

  return (
    <button className={`${variantClasses} p-2 rounded-md w-[100%] ${className} ${disabled && 'opacity-25 cursor-not-allowed'}`} {...props} disabled={disabled}>
      {children} {icon}
    </button>
  )
}
