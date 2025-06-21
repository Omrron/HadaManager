import { ShortenText } from "../common/textFunctions";

interface Props {
  name: string;
  current: number;
  capacity: number;
}

export function Table({ name, current, capacity }: Props) {
  const isFull = current >= capacity;
  const isNearFull = current / capacity >= 0.8;
  const shortText = ShortenText(name, 11);

  return (
    <div className="component-container room-item-container">
      <h2 className="center">{shortText}</h2>
      <div className="center">
        <span>נוכחים </span>
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
        <input type="checkbox" />
        <span>תפוס</span>
      </div>
    </div>
  );
}
