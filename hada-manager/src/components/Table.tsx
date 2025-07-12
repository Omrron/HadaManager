import type { TableType } from "../Types";
import { useDroppable } from "@dnd-kit/core";

interface Props{
  table:TableType;
  setReserved(id:string, newState:boolean):void
}

export function Table({
  table,
  setReserved
}: Props) {
  let {id, name, peopleIds, capacity, reserved = false} =table;
  const { setNodeRef, isOver } = useDroppable({ id });
  var occupancy = peopleIds.length;
  const isFull = occupancy >= capacity || reserved;
  const isNearFull = occupancy / capacity >= 0.8;

  return (
    <div
      className="component-container"
      ref={setNodeRef}
      style={isOver ? {outline:"1px solid var(--pop-color)", filter:"brightness(1.1)"} : {}}
      title={name}
    >
      <h2 className="center one-liner">
          {name}
      </h2>
      <div className="center">
        <span>סועדים </span>
        <span dir="ltr">
          {occupancy} / {capacity}
        </span>
        <div className="progress-container">
          <div
            className={`progress ${
              isFull ? "bad" : isNearFull ? "ok" : "good"
            }`}
            style={{ width: `${reserved ? 100 : (occupancy / capacity) * 100}%` }}
          />
        </div>
      </div>
      <div className="center">
        <input type="checkbox" onClick={() => setReserved(id, !reserved)} />
        <span>תפוס</span>
      </div>
    </div>
  );
}
