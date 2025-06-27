import { useState } from "react";
import { ShortenText } from "../common/textFunctions";
import type { TableType } from "../Types";

export function Table({ name, peopleIds, capacity, reserved=false }: TableType) {
  var occupancy = peopleIds.length;
  const isFull = occupancy >= capacity;
  const isNearFull = occupancy / capacity >= 0.8;
  const shortText = ShortenText(name, 11);
  let [isReserved, setReserved] = useState(reserved);

  return (
    <div className="component-container">
      <h2 className="center"><abbr title={`${shortText!=name ? name : ""}`}>{shortText}</abbr></h2>
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
        <input type="checkbox" onClick={() => setReserved(!isReserved)}/>
        <span>תפוס</span>
      </div>
    </div>
  );
}