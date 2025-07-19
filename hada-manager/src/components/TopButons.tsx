import { FaPlus } from "react-icons/fa"
import { MdOutlineCalendarMonth, MdOutlineEdit, MdOutlineEditOff } from "react-icons/md"
import { ImExit } from "react-icons/im"
import { Link, useLocation } from "react-router-dom"

interface Props {
  editMode: boolean
  setEditMode: React.Dispatch<React.SetStateAction<boolean>>
  handleForm: () => Promise<void>
}

export function TopButtons({ editMode, setEditMode, handleForm }: Props) {
  const location = useLocation()
  const isInRoom = location.pathname.includes("tables")

  return (
    <div className="buttons-container">
      <button
        className="top-button"
        onClick={() => setEditMode((prevCount) => !prevCount)}
        title={editMode ? "כבה מצב עריכה" : "הפעל מצב עריכה"}
      >
        {editMode ? (
          <MdOutlineEditOff className="centered-icon top-icon" />
        ) : (
          <MdOutlineEdit className="centered-icon top-icon" />
        )}
      </button>
      <button
        className="top-button"
        onClick={handleForm}
        title={isInRoom ? "הוסף שולחן" : "הוסף חדר"}
      >
        <FaPlus className="centered-icon top-icon" />
      </button>
      <button className="top-button">
        <MdOutlineCalendarMonth className="centered-icon top-icon" />
      </button>
      {isInRoom && (
        <Link to={"/"} className="leave-button-container">
          <button className="top-button leave-button" title="יציאה מהחדר">
            <ImExit className="centered-icon top-icon" />
          </button>
        </Link>
      )}
    </div>
  )
}
