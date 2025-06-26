import { ShortenText } from "../common/textFunctions";
import { Link } from "react-router-dom";

interface Props {
  id:string;
  name: string;
  occupancy: number;
  capacity: number;
}

export function Room({id, name, occupancy, capacity}: Props) {
  const isFull = occupancy >= capacity;
  const isNearFull = occupancy / capacity >= 0.8;
  const shortText = ShortenText(name, 11);

  return (
    <Link key={id} to={`/tables/${id}`}>
      <button className="component-container">
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
      </button>
    </Link>
  );
}
