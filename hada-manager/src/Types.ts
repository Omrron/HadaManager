export interface Room
{
    assignedPeople : Person[],
    tables : TableType[],
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