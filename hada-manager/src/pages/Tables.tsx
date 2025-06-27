import { Table } from "../components/Table";
import type { TableType } from "../Types";

const tables : TableType[] = [
    {id:"123", name:"חד\"א קצינים וואי יש לו שם ממש ארוך", peopleIds:[], capacity:10, reserved: false},
    {id:"456", name:"חד\"א שומרים", peopleIds:[], capacity:10, reserved: false},
    {id:"789", name:"חד\"א סדיר", peopleIds:[], capacity:10, reserved: false},
    {id:"159", name:"חד\"א לאלרגיות מוזרות", peopleIds:[], capacity:100, reserved: false},
];

export function Tables() {

    return (
        <div className="flex-container">
            {tables.map((table) => <Table key={table.id} id={table.id} name={table.name} peopleIds={table.peopleIds} capacity={table.capacity} reserved={table.reserved}/>)}
        </div>
    )
}