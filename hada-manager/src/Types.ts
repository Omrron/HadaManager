export interface RoomType {
    id: string
    name: string,
}

export interface TableType {
    peopleIds: string[],
    roomId: string,
    id: string,
    name: string,
    capacity: number,
    reserved?: boolean
}

export interface PersonType {
    roomName?: string,
    tableName?: string,
    id: string
    name: string,
    eatingState: number,
    idNumber: number,
}

export interface TopLevelProps {
    editMode: boolean;
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    people: PersonType[];
    setPeople: React.Dispatch<React.SetStateAction<PersonType[]>>;
    tables: TableType[];
    setTables: React.Dispatch<React.SetStateAction<TableType[]>>;
    rooms: RoomType[];
    setRooms: React.Dispatch<React.SetStateAction<RoomType[]>>;
}