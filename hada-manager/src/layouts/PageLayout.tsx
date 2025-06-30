import { Outlet } from "react-router-dom";
import { PeopleList } from "../components/PeopleList";
import { useState } from "react";

export function Layout(){
    const [editMode,SetEditMode] = useState(false);

    return(
        <div className="layout-container">
            <aside className="list-container">
                <PeopleList editMode={editMode} SetEditMode={SetEditMode}/>
            </aside>
            <div className="window-container">
                <Outlet context={{editMode, SetEditMode}}/>
            </div>
        </div>
    )
}