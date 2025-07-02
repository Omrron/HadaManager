export interface RoomType
{
    tables: TableType[],
    peopleIds: number[],
    id: string
    name : string,
    capacity : number
}

export interface TableType
{
    peopleIds: number[],
    id: string,
    name : string,
    capacity : number,
    reserved?: boolean
}

export interface PersonType
{
    room?: RoomType,
    tableName?: string,
    id : string
    name : string,
    eatingState: number,
    idNumber : number,
}

export interface TopLevelProps {
    editMode:boolean;
    SetEditMode:React.Dispatch<React.SetStateAction<boolean>>;
    eatingPeople:Record<string,PersonMD>;
    SetEatingPeople:React.Dispatch<React.SetStateAction<Record<string,PersonMD>>>;
}

export interface PersonMD{
    tableName : string,
    roomName : string
}