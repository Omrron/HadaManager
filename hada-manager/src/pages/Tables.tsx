import { Table } from "../components/Table"
import { TopButtons } from "../components/TopButons"
import type { TopLevelProps } from "../Types"
import { useLocation, useOutletContext } from "react-router-dom"
import { useYapperDialog } from "yapperjs"
import { AddTable } from "../components/AddTableDialog"
import { v4 as uuidv4 } from "uuid"
import { MdClose } from "react-icons/md"

export function Tables() {
  const { editMode, setEditMode, tables, setTables } = useOutletContext<TopLevelProps>()
  const yapperApi = useYapperDialog()
  var potentialRoomId = useLocation().pathname.split("/").pop()
  const roomId = potentialRoomId ? potentialRoomId : ""
  var myCurrentTables = roomId ? tables.filter((table) => table.roomId === roomId) : []

  const handleSubmit = async () => {
    const newTable = await yapperApi.showDialog({ content: AddTable })
    if (!newTable) return
    newTable.id = uuidv4()
    newTable.peopleIds = []
    newTable.roomId = roomId
    await setTables((prev) => [...prev, newTable])
  }

  const setReserved = (id: string, newState: boolean) => {
    tables.filter((_) => _.id === id)
    setTables((prev) => prev.map((_) => (_.id === id ? { ..._, reserved: newState } : _)))
  }

  return (
    <>
      <TopButtons editMode={editMode} setEditMode={setEditMode} handleForm={handleSubmit} />
      <div className="content-container">
        {myCurrentTables.map((table) => (
          <div className="outer-component-container">
            {editMode && (
              <button
                className="delete-button"
                onClick={() => {
                  setTables((prev) => prev.filter((_) => _.id !== table.id))
                }}
              >
                <MdClose className="centered-icon" />
              </button>
            )}
            <Table key={table.id} table={table} setReserved={setReserved} />
          </div>
        ))}
      </div>
      <yapperApi.renderer />
    </>
  )
}
