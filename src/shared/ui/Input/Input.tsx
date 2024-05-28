import { InputMask, Replacement } from '@react-input/mask'
import { forwardRef, InputHTMLAttributes } from 'react'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  errMsg?: string
  mask?: string,
  replacement?: string | Replacement
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    label,
    name,
    errMsg,
    mask,
    replacement,
    className,
    ...props
  }, ref) => {
    return (
      <div key={name} className="d-flex flex-column w-100 relative">
        <label>
          {label}
        </label>
        {(mask && replacement) ? (
          <InputMask
            ref={ref}
            name={name}
            id={name}
            className={`p-1 rounded-md ${className}`}
            mask={mask}
            replacement={replacement}
            {...props}
          />
        ) : (
          <input
            ref={ref}
            name={name}
            id={name}
            className={`p-1 rounded-md ${className}`}
            {...props}
          />
        )}
        {errMsg && <span className="text-danger absolute scale-75 bottom-[-19px] left-[-19px]">{errMsg}</span>}
      </div>
    )
  }
)