export interface RoomType
{
    id: string
    name : string,
    capacity : number,
    occupancy : number
}

export interface TableType
{
    id: string,
    name : string,
    capacity : number,
    occupancy : number,
    reserved?: boolean
}

export interface PersonType
{
    name : string,
    id : number
}