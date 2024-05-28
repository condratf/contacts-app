import { Replacement } from "@react-input/mask"
import { FieldError, UseFormRegister } from "react-hook-form"
import { ContactFormData } from "src/features/contacts/ContactForm/types"

export type FormFieldProps <T extends Record<string, unknown> = ContactFormData> = {
  type: string,
  placeholder: string,
  name: keyof T,
  register: UseFormRegister<T>,
  error: FieldError | undefined,
  valueAsNumber?: boolean,
  mask?: string,
  replacement?: string | Replacement
  min?: number,
  max?: number,
  required?: boolean
  setValueAs?: (v: unknown) => string | number | undefined,
}