import { MdClose, MdOutlineCheck, MdPerson } from "react-icons/md";
import { ShortenText } from "../common/textFunctions";
import type { PersonType } from "../Types";

function stateToColor(state: number) {
  switch (state) {
    case 1:
      return "--good-color";
    case 2:
      return "--ok-color";
    case 3:
      return "--bad-color";
    default:
      return "--bright-color";
  }
}

type Props = {
  StartEating(id:string):void,
  StopEating(id:string):void,
  Delete(id:string):void,
  editMode:boolean,
  person: PersonType
}


export function Person({person, editMode, StartEating, StopEating, Delete}: Props) {
  let {name, eatingState = 0, id, tableName, room} = person;

  return (
    <div className="person-container">
      <div className="image-container">
        <MdPerson
          className="profile-image"
          style={{ borderColor: `var(${stateToColor(eatingState)})` }}
        />
        {editMode && <button className="delete-button" onClick={() => Delete(id)}>
          <MdClose className="centered-icon" />
        </button>}
      </div>
      <div className="nowrap">
        {ShortenText(name, 15)}
        <div className="subtext">שולחן 2</div>
      </div>
      <div className="flex-container">
        <button className="enter-button" onClick={() => StartEating(id)}>
          <MdOutlineCheck className="centered-icon" />
        </button>
        <button className="depart-button" onClick={() => StopEating(id)}>
          <MdClose className="centered-icon" />
        </button>
      </div>
    </div>
  );
}
