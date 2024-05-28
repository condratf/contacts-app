import { FC } from 'react'
import { Input } from '../Input'
import { FormFieldProps } from './types'

export const FormField: FC<FormFieldProps> = ({
  name,
  register,
  valueAsNumber,
  error,
  setValueAs,
  ...props
}) => (
  <Input 
    label={name}
    errMsg={error?.message}
    {...props}
    {...register(name, { valueAsNumber, setValueAs })}
  />
);
