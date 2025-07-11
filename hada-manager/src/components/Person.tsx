import { MdClose, MdPerson } from "react-icons/md";
import type { PersonType } from "../Types";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

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
  StopEating(id: string): void;
  Delete(id: string): void;
  editMode: boolean;
  person: PersonType;
  hidden:boolean;
};

export function Person({
  person,
  editMode,
  StopEating,
  Delete,
  hidden
}: Props) {
  let { name, eatingState = 0, id, tableName, roomName } = person;
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform } =
    useDraggable({ id: person.id });

  return (
    <div
      ref={setNodeRef}
      className={`person-container ${hidden ? 'hidden' : ''}`}
      style={{
        transform: CSS.Translate.toString(transform),
        cursor: "grab",
      }}
    >
      <div className="image-container">
        <div ref={setActivatorNodeRef} {...listeners} {...attributes}>
          <MdPerson
            className="profile-image"
            style={{ borderColor: `var(${stateToColor(eatingState)})` }}
          />
        </div>
        {editMode && (
          <button className="delete-button" onClick={() => Delete(id)}>
            <MdClose className="centered-icon" />
          </button>
        )}
      </div>
      <div
        className="person-text-container one-liner"
        ref={setActivatorNodeRef}
        {...listeners}
        {...attributes}
      >
        {name}
        <div className="subtext one-liner">{tableName}{roomName}</div>
      </div>
        <button className="depart-button" onClick={() => StopEating(id)}>
          <MdClose className="centered-icon" />
        </button>
    </div>
  );
}
