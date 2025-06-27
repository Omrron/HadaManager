export interface RoomType
{
    tables: TableType[],
    people: PersonType[],
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
    tableId: string | undefined,
    name : string,
    id : number
}