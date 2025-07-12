import { Link } from "react-router-dom";
import type { RoomType, TableType } from "../Types";

type Props = RoomType & {tables: TableType[]}

export function Room({
  id,
  name,
  tables,
}: Props) {
  const myTables = tables.filter(table => table.roomId === id);
  var occupancy = myTables.reduce(
    (accumulator: number, currentValue: TableType) =>
      accumulator + currentValue.peopleIds.length,
    0
  );
  var capacity = myTables.reduce((accumulator: number ,current:TableType) => accumulator + current.capacity, 0);
  const isFull = occupancy >= capacity;
  const isNearFull = occupancy / capacity >= 0.8;

  return (
    <Link key={id} to={`/tables/${id}`} title={name}>
      <button id="container" className="component-container">
        <h2 className="center one-liner"> {name}</h2>
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
