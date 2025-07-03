import { useState } from "react";
import type { TableType } from "../Types";
import { useDroppable } from "@dnd-kit/core";

export function Table({
  id,
  name,
  peopleIds,
  capacity,
  reserved = false,
}: TableType) {
  const { setNodeRef } = useDroppable({ id });
  var occupancy = peopleIds.length;
  const isFull = occupancy >= capacity;
  const isNearFull = occupancy / capacity >= 0.8;
  let [isReserved, setReserved] = useState(reserved);

  return (
    <div
      className="component-container outer-component-container"
      ref={setNodeRef}
    >
      <h2 className="center one-liner">
        <abbr title={name}>{name}</abbr>
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
            style={{ width: `${(occupancy / capacity) * 100}%` }}
          />
        </div>
      </div>
      <div className="center">
        <input type="checkbox" onClick={() => setReserved(!isReserved)} />
        <span>תפוס</span>
      </div>
    </div>
  );
}
