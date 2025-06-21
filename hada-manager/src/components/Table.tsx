interface Props{
    name : string
    current : number
    capacity : number
}

export function Table({name, current, capacity} : Props)
{
    const isFull = current >= capacity;
    const isNearFull = current/capacity >= 0.8;
    return (
    <div className="component-container room-item-container">
      <h2 className="short-text">
        {name}
      </h2>
      <div>
        <span>נוכחים </span>
        <span>
          {current} / {capacity}
        </span>
        <div className="progress-container">
          <div className={`progress ${isFull ? 'bad' : isNearFull ? 'ok' : 'good'}`}
               style={{width:`${(current/capacity)*100}%`}}/>
        </div>
      </div>
      <div>
        <span>תפוס</span>
        <input type="checkbox"/>
      </div>
    </div>
  );
};