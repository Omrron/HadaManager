import { MdClose, MdOutlineCheck, MdPerson } from "react-icons/md";
import { ShortenText } from "../common/textFunctions";
import type { PersonType } from "../Types";
import { useRef, type DragEvent } from "react";
import { useLocation } from "react-router-dom";

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

function CreateElementClone(element :HTMLDivElement) :HTMLElement
{     
    let clone = element.cloneNode(true) as HTMLElement
    clone.style.position = "absolute";
    clone.style.top = "-9999px";
    clone.style.left = "-9999px";
    clone.style.opacity = "1";
    clone.style.width = "300px";
    clone.style.pointerEvents = "none";

    return clone;
}

export function Person({
  person,
  editMode,
  StartEating,
  StopEating,
  Delete,
}: Props) {
  let { name, eatingState = 0, id, tableName, room } = person;
  const itemRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    person: PersonType
  ) => {
    e.dataTransfer.setData("application/json", JSON.stringify(person));
    e.dataTransfer.effectAllowed = "move";

    if (itemRef.current) {
      const clone = CreateElementClone(itemRef.current);
      document.body.appendChild(clone);

      const width = clone.offsetWidth;
      const height = clone.offsetHeight;
      e.dataTransfer.setDragImage(clone, width / 2, height / 2);

      setTimeout(() => {
        document.body.removeChild(clone);
        if (itemRef.current) {
          itemRef.current.style.opacity = "0.001";
        }
      }, 0);
    }
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    // Reset the opacity of the original element when the drag ends
    if (itemRef.current) {
      itemRef.current.style.opacity = "1";
    }
  };

  function handleDrop(e: DragEvent<HTMLDivElement>): void {
     e.preventDefault();

    console.log(e.currentTarget)
  }

  return (
    <div
      ref={itemRef}
      className="person-container"
      draggable={`${useLocation().pathname.includes("table")}`}
      onDragStart={(e) => handleDragStart(e, person)}
      onDragEnd={(e) => handleDragEnd(e)}
    >
      <div className="image-container">
        <MdPerson
          className="profile-image"
          style={{ borderColor: `var(${stateToColor(eatingState)})` }}
        />
        {editMode && (
          <button className="delete-button" onClick={() => Delete(id)}>
            <MdClose className="centered-icon" />
          </button>
        )}
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
