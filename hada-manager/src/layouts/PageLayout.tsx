import { Outlet } from "react-router-dom";
import { PeopleList } from "../components/PeopleList";
import { useRef, useState } from "react";
import { DndContext, DragOverlay, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";
import type { PersonType, TableType } from "../Types";
import { PersonOverlay } from "../components/PersonOverlay";

export function Layout() {
  const [editMode, setEditMode] = useState(false);
  const [people, setPeople] = useState<PersonType[]>([]);
  const [tables, setTables] = useState<TableType[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const activePerson = people.find((p) => p.id === activeId) ?? null;

  const handleDragEnd = (event:DragEndEvent) => {
    setActiveId(null);
    document.body.style.cursor = 'auto';
    let addedTable = tables.find(_ => _.id === event.over?.id);
    addedTable?.peopleIds.push(event.active.id.toString())
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id.toString());
    document.body.style.cursor = 'grabbing';
  };


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
          {activePerson ? <PersonOverlay name={activePerson.name} /> : null}
        </DragOverlay>
        <div className="window-container">
          <Outlet context={{ editMode, setEditMode, people, setPeople, tables, setTables }} />
        </div>
      </div>
    </DndContext>
  );
}
