import { Outlet } from "react-router-dom";
import { PeopleList } from "../components/PeopleList";
import { useState } from "react";
import type { PersonMD } from "../Types";
import { DndContext } from "@dnd-kit/core";

export function Layout(){
    const [editMode,SetEditMode] = useState(false);
    const [eatingPeople, SetEatingPeople] = useState<Record<string, PersonMD>>({});

    const handleDragEnd = () => {
        console.log("dropped");
    };

    return(
        <DndContext onDragEnd={handleDragEnd}>
            <div className="layout-container">
                <aside className="list-container">
                    <PeopleList editMode={editMode} SetEditMode={SetEditMode} eatingPeople={eatingPeople} SetEatingPeople={SetEatingPeople}/>
                </aside>
                <div className="window-container">
                    <Outlet context={{editMode, SetEditMode, eatingPeople, SetEatingPeople}}/>
                </div>
            </div>
        </DndContext>
    )
}