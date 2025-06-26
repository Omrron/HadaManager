import { Table } from "../components/Table";
import type { TableType } from "../Types";

const tables : TableType[] = [
    {id:"123", name:"חד\"א קצינים וואי יש לו שם ממש ארוך", occupancy:5, capacity:10, reserved: false},
    {id:"456", name:"חד\"א שומרים", occupancy:10, capacity:10, reserved: false},
    {id:"789", name:"חד\"א סדיר", occupancy:9, capacity:10, reserved: false},
    {id:"159", name:"חד\"א לאלרגיות מוזרות", occupancy:100, capacity:100, reserved: false},
];

export function Tables() {

    return (
        <div className="flex-container">
            {tables.map((table) => <Table key={table.id} name={table.name} occupancy={table.occupancy} capacity={table.capacity} reserved={table.reserved}/>)}
        </div>
    )
}