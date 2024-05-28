import { IContact } from "src/data/contacts";
import { createContext } from "react";
import { SortDir } from "src/shared/types";

type ContactContextType = {
  items: Array<IContact>,
  currItem: IContact | null,
  isLoading: boolean,
  error: Error | null,
  actionError: Error | null,
  isPending: boolean,
  actionSuccess: true | null,
  nameSortDir: SortDir,
  setCurrItem: (item: IContact | null) => void,
  add: (item: IContact) => void,
  update: (item: IContact) => void,
  remove: (id: IContact['id']) => void,
  toggleSortDir: () => void
}

export const ContactContext = createContext<ContactContextType>({
  items: [],
  currItem: null,
  isLoading: false,
  error: null,
  actionError: null,
  isPending: false,
  actionSuccess: null,
  nameSortDir: null,
  setCurrItem: () => {},
  add: () => {},
  update: () => {},
  remove: () => {},
  toggleSortDir: () => {}
});