export interface Room
{
    assignedPeople : PersonType[],
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

export interface PersonType
{
    name : string,
    id : number
}