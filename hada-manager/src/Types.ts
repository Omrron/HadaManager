export interface RoomType {
    tables: TableType[],
    peopleIds: number[],
    id: string
    name: string,
    capacity: number
}

export interface TableType {
    peopleIds: number[],
    id: string,
    name: string,
    capacity: number,
    reserved?: boolean
}

export interface PersonType {
    room?: RoomType,
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
}