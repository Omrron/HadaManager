import { Outlet } from "react-router-dom";
import { PeopleList } from "../components/PeopleList";
import { useState } from "react";
import { DndContext, DragOverlay, type DragStartEvent } from "@dnd-kit/core";
import type { PersonType } from "../Types";
import { PersonOverlay } from "../components/PersonOverlay";

export function Layout() {
  const [editMode, setEditMode] = useState(false);
  const [people, setPeople] = useState<PersonType[]>([]);
  const [activeId, setActiveId] = useState<string | number | null>(null);
  const activePerson = people.find((p) => p.id === activeId) ?? null;

  const handleDragEnd = () => {
    setActiveId(null);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
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
            setEditMode={setEditMode}
            people={people}
            setPeople={setPeople}
            activeId={activeId}
          />
        </aside>
        <DragOverlay dropAnimation={null}>
          {activePerson ? <PersonOverlay name={activePerson.name} /> : null}
        </DragOverlay>
        <div className="window-container">
          <Outlet context={{ editMode, setEditMode, people, setPeople }} />
        </div>
      </div>
    </DndContext>
  );
}
