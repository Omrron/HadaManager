import { useEffect } from "react";
import { Table } from "../components/Table";
import { TopButtons } from "../components/TopButons";
import type { TableType, TopLevelProps } from "../Types";
import { useOutletContext } from "react-router-dom";
import { useYapperDialog } from "yapperjs";
import { AddTable } from "../components/AddTableDialog";
import { v4 as uuidv4 } from "uuid";

const template : TableType[] = [
    {id:"123", name:"שולחן קצינים וואי יש לו שם ממש ארוך", peopleIds:[], capacity:10, reserved: false},
    {id:"456", name:"שולחן שומרים", peopleIds:["12","2"], capacity:2, reserved: false},
    {id:"789", name:"שולחן סדיר", peopleIds:[], capacity:10, reserved: false},
    {id:"159", name:"שולחן לאלרגיות מוזרות", peopleIds:[], capacity:100, reserved: false},
];

export function Tables() {
    const {editMode, setEditMode, tables, setTables} = useOutletContext<TopLevelProps>();
    const yapperApi = useYapperDialog();
        
    useEffect(() => {setTables(template)},[])

    const handleSubmit = async () => {
    const newTable = await yapperApi.showDialog({content:AddTable});
        if(!newTable) return;
        newTable.id = uuidv4();
        newTable.peopleIds=[];
        await setTables(prev => [...prev, newTable]);
    }

      const setReserved = (id:string, newState:boolean) => {
        tables.filter(_ => _.id === id)
        setTables(prev => prev.map(_ => _.id === id ? {..._, reserved:newState} : _));
      }

    return (
        <>
            <TopButtons editMode={editMode} setEditMode={setEditMode} handleForm={handleSubmit} />
            <div className="content-container">
                {tables.map((table) => <Table key={table.id} table={table} setReserved={setReserved}/>)}
            </div>
            <yapperApi.renderer/>
        </>
    )
}