import { Link } from "react-router-dom";
import type { RoomType, TableType } from "../Types";

export function Room({ capacity, id, name, peopleIds, tables: tableIds }: RoomType) {
  var occupancy = tableIds.reduce(
    (accumulator : number, currentValue : TableType) => accumulator + currentValue.peopleIds.length,
    0
  );
  const isFull = occupancy >= capacity;
  const isNearFull = occupancy / capacity >= 0.8;

  return (
    <Link key={id} to={`/tables/${id}`} className="link-component-container">
      <button id="container" className="component-container">
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
      </button>
    </Link>
  );
}
