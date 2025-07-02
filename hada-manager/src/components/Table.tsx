import { useEffect, useState } from "react";
import type { PersonType, TableType } from "../Types";

export function Table({
  name,
  peopleIds,
  capacity,
  reserved = false,
}: TableType) {
  const [people, setPeople] = useState<PersonType[]>([]);
  var occupancy = people.length;
  const isFull = occupancy >= capacity;
  const isNearFull = occupancy / capacity >= 0.8;
  let [isReserved, setReserved] = useState(reserved);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Allow drop
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("application/json");
    if (data) {
      const person: PersonType = JSON.parse(data);
      if (people.find(_ => _.idNumber == person.idNumber)) return;
      setPeople(prev => [...prev,person]);
    }
  };

  // useEffect(() => {
  //   let people = fetch(Config.ApiBaseUrl)
  //   .then(response => response.json<>())
    
  //   setPeople(prev => [...prev,])
  // },[])

  return (
    <div className="component-container outer-component-container" onDragOver={handleDragOver} onDrop={handleDrop}>
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
