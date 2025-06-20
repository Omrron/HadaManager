import { Table } from "../components/Table";
import type { TableType } from "../Types";

const tables : TableType[] = [
    {name:"חד\"א קצינים וואי יש לו שם ממש ארוך", occupancy:5, capacity:10, reserved: false},
    {name:"חד\"א שומרים", occupancy:5, capacity:10, reserved: false},
    {name:"חד\"א סדיר", occupancy:5, capacity:10, reserved: false},
    {name:"חד\"א לאלרגיות מוזרות", occupancy:5, capacity:10, reserved: false},
];

export function Tables() {

    return (
        <div className="flex-container">
            {tables.map(table => <Table name={table.name} current={table.occupancy} capacity={table.capacity}/>)}
        </div>
    )
}