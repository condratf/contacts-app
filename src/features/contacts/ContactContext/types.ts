import { IContact } from "src/data/contacts"

export type MutationParams = {
  action: 'delete', id: IContact['id'], contact?: never
} | {
  action: 'add' | 'update', contact: IContact, id?: never
}