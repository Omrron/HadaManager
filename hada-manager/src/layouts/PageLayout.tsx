import { Outlet } from "react-router-dom";
import { PeopleList } from "../components/PeopleList";
import { useState } from "react";
import { DndContext, DragOverlay, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";
import type { PersonType, RoomType, TableType } from "../Types";
import { PersonOverlay } from "../components/PersonOverlay";

export function Layout() {
	const [editMode, setEditMode] = useState(false);
	const [people, setPeople] = useState<PersonType[]>([]);
	const [tables, setTables] = useState<TableType[]>([]);
	const [rooms, setRooms] = useState<RoomType[]>([]);
	const [activeId, setActiveId] = useState<string | null>(null);
	const activePerson = people.find((p) => p.id === activeId) ?? null;
    
	const handleDragEnd = (event:DragEndEvent) => {
		setActiveId(null);
		document.body.style.cursor = 'auto';
		let addedTable = tables.find(_ => _.id === event.over?.id);
		let addedPerson = people.find(_ => _.id === event.active.id);
		
		if(addedTable && addedPerson)
		{
			SeatPerson(addedPerson, addedTable);
		}
	};
			
	const handleDragStart = (event: DragStartEvent) => {
		setActiveId(event.active.id.toString());
		document.body.style.cursor = 'grabbing';
	};
			
	const SeatPerson = (person:PersonType, table:TableType) => {
		let otherContainingTable = tables.find(_ => _.id !== table.id && _.peopleIds.includes(person.id))
		
		if(otherContainingTable)
			otherContainingTable.peopleIds = otherContainingTable.peopleIds.filter(_ => _ !== person.id);

		if(!table.peopleIds.includes(person.id))
		{
			table.peopleIds.push(person.id);
			person.tableName = table.name;
		}
	}

  return (
    <DndContext
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="layout-container">
        <aside className="list-container">
          <PeopleList
            editMode={editMode}
            people={people}
            setPeople={setPeople}
            activeId={activeId}
          />
        </aside>
        <DragOverlay dropAnimation={null}>
          {activePerson ? <PersonOverlay name={activePerson.name} tableName={activePerson.tableName}/> : null}
        </DragOverlay>
        <div className="window-container">
          <Outlet context={{ editMode, setEditMode, people, setPeople, tables, setTables, rooms, setRooms }} />
        </div>
      </div>
    </DndContext>
  );
}
