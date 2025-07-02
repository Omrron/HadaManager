import { MdClose, MdOutlineCheck, MdPerson } from "react-icons/md";
import { ShortenText } from "../common/textFunctions";
import type { PersonType } from "../Types";
import { useRef, type DragEvent } from "react";
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
  StartEating(id: string): void;
  StopEating(id: string): void;
  Delete(id: string): void;
  editMode: boolean;
  person: PersonType;
};

export function Person({
  person,
  editMode,
  StartEating,
  StopEating,
  Delete,
}: Props) {
  let { name, eatingState = 0, id, tableName, room } = person;
  const itemRef = useRef<HTMLDivElement>(null);
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform } =
    useDraggable({ id: person.id });

  return (
    <div
      ref={setNodeRef}
      className="person-container"
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
        className="nowrap"
        ref={setActivatorNodeRef}
        {...listeners}
        {...attributes}
      >
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
