import type { PersonType } from "./PersonType";
import type { RoomType } from "./RoomType";
import type { TableType } from "./TableType";

export type PageContext = {
  editMode: boolean;
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
  people: PersonType[];
  setPeople: React.Dispatch<React.SetStateAction<PersonType[]>>;
  tables: TableType[];
  setTables: React.Dispatch<React.SetStateAction<TableType[]>>;
  rooms: RoomType[];
  setRooms: React.Dispatch<React.SetStateAction<RoomType[]>>;
};
