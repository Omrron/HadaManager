export interface Room
{
    name : string,
    capacity : number,
    occupancy : number
}

export interface TableType
{
    name : string,
    capacity : number,
    occupancy : number,
    reserved: boolean
}

export interface Person
{
    name : string,
    id : number
}