import { IContact } from "src/data/contacts";

export type ContactFormData = Pick<IContact, 'name' | 'email' | 'age' | 'phone'>

export type ContactFormProps = {
  type: 'edit',
  itemValues: IContact,
  submitCb?: (...args: Array<unknown>) => void
} | {
  type: 'add',
  itemValues?: never
  submitCb?: (...args: Array<unknown>) => void
}
