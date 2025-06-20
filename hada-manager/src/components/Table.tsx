interface Props{
    name : string
    current : number
    capacity : number
}

export function Table({name, current, capacity} : Props)
{
    const isFull = current >= capacity;

    return (
    <div className="component-container room-item-container">
      <h2>
        {name}
      </h2>
      <div>
        <span>People </span>
        <span>
          {current} / {capacity}
        </span>
      </div>
    </div>
  );
};