import { useState } from "react";
import { ShortenText } from "../common/textFunctions";

interface Props {
  name: string;
  occupancy: number;
  capacity: number;
  reserved?: boolean;
}

export function Table({ name, occupancy: current, capacity, reserved=false }: Props) {
  const isFull = current >= capacity;
  const isNearFull = current / capacity >= 0.8;
  const shortText = ShortenText(name, 11);
  let [isReserved, setReserved] = useState(reserved);

  return (
    <div className="component-container">
      <h2 className="center">{shortText}</h2>
      <div className="center">
        <span>סועדים </span>
        <span dir="ltr">
          {current} / {capacity}
        </span>
        <div className="progress-container">
          <div
            className={`progress ${
              isFull ? "bad" : isNearFull ? "ok" : "good"
            }`}
            style={{ width: `${(current / capacity) * 100}%` }}
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