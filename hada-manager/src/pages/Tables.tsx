import { useState } from "react";
import { Table } from "../components/Table";
import { TopButtons } from "../components/TopButons";
import type { TableType } from "../Types";

const tables : TableType[] = [
    {id:"123", name:"שולחן קצינים וואי יש לו שם ממש ארוך", peopleIds:[], capacity:10, reserved: false},
    {id:"456", name:"שולחן שומרים", peopleIds:[1,2], capacity:2, reserved: false},
    {id:"789", name:"שולחן סדיר", peopleIds:[], capacity:10, reserved: false},
    {id:"159", name:"שולחן לאלרגיות מוזרות", peopleIds:[], capacity:100, reserved: false},
];

export function Tables() {

    const [editMode, SetEditMode] = useState(false);

    return (
        <>
            <TopButtons editMode={editMode} SetEditMode={SetEditMode}/>
            <div className="content-container">
                {tables.map((table) => <Table key={table.id} id={table.id} name={table.name} peopleIds={table.peopleIds} capacity={table.capacity} reserved={table.reserved}/>)}
            </div>
        </>
    )
}