import { Outlet } from "react-router-dom"
import { PeopleList } from "../components/PeopleList"
import { useEffect, useState } from "react"
import { DndContext, DragOverlay, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core"
import type { PersonType, RoomType, TableType } from "../Types"
import { PersonOverlay } from "../components/PersonOverlay"

export function Layout() {
  const [editMode, setEditMode] = useState(false)
  const [people, setPeople] = useState<PersonType[]>([])
  const [tables, setTables] = useState<TableType[]>([])
  const [rooms, setRooms] = useState<RoomType[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const activePerson = people.find((p) => p.id === activeId) ?? null

  useEffect(() => {
    setRooms([
      { id: "123456", name: 'חד"א קצינים שיש לו עכשיו שם ממש אבל ממש אבל מממממששששששש ארוך' },
      { id: "123789", name: 'חד"א חפשים' },
    ])

    setTables([
      {
        id: "123",
        name: "שולחן קצינים וואי יש לו שם ממש ארוך",
        peopleIds: [],
        roomId: "123456",
        capacity: 10,
        reserved: false,
      },
      {
        id: "456",
        name: "שולחן שומרים",
        peopleIds: [],
        roomId: "123456",
        capacity: 2,
        reserved: false,
      },
      {
        id: "789",
        name: "שולחן סדיר",
        peopleIds: [],
        roomId: "123789",
        capacity: 10,
        reserved: false,
      },
      {
        id: "159",
        name: "שולחן לאלרגיות מוזרות",
        peopleIds: [],
        roomId: "123789",
        capacity: 100,
        reserved: false,
      },
    ])

    setPeople([{ idNumber: 123456, name: "עמרי בראון", eatingState: 0, id: "123456" }])
  }, [])

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null)
    document.body.style.cursor = "auto"
    let addedTable = tables.find((_) => _.id === event.over?.id)
    let addedPerson = people.find((_) => _.id === event.active.id)

    if (addedTable && addedPerson) {
      SeatPerson(addedPerson, addedTable)
    }
  }

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id.toString())
    document.body.style.cursor = "grabbing"
  }

  const SeatPerson = (person: PersonType, table: TableType) => {
    if (table.reserved) return

    let otherContainingTable = tables.find(
      (_) => _.id !== table.id && _.peopleIds.includes(person.id)
    )

    if (otherContainingTable)
      setTables((prev) =>
        prev.map((_) =>
          _.id === otherContainingTable.id
            ? { ..._, peopleIds: _.peopleIds.filter((pid) => pid !== person.id) }
            : _
        )
      )

    if (!table.peopleIds.includes(person.id)) {
      setTables((prev) =>
        prev.map((_) => (_.id === table.id ? { ..._, peopleIds: [..._.peopleIds, person.id] } : _))
      )
      setPeople((prev) =>
        prev.map((_) =>
          _.id === person.id
            ? {
                ..._,
                tableName: table.name,
                roomName: rooms.find((_) => _.id === table.roomId)?.name,
              }
            : _
        )
      )
      if (person.eatingState === 0) UpdateList(person.id, 1)
    }
  }

  const UpdateList = (id: string, state: number) => {
    setPeople((prev) =>
      prev.map((person) => (person.id === id ? { ...person, eatingState: state } : person))
    )
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="layout-container">
        <aside className="list-container">
          <PeopleList
            editMode={editMode}
            people={people}
            setPeople={setPeople}
            activeId={activeId}
            tables={tables}
            setTables={setTables}
            UpdateList={UpdateList}
          />
        </aside>
        <DragOverlay dropAnimation={null}>
          {activePerson ? (
            <PersonOverlay
              name={activePerson.name}
              tableName={activePerson.tableName}
              roomName={activePerson.roomName}
            />
          ) : null}
        </DragOverlay>
        <div className="window-container">
          <Outlet
            context={{
              editMode,
              setEditMode,
              people,
              setPeople,
              tables,
              setTables,
              rooms,
              setRooms,
            }}
          />
        </div>
      </div>
    </DndContext>
  )
}
