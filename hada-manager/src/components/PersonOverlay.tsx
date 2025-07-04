import { MdPerson } from "react-icons/md";

interface Props {
    name:string;
    tableName:string | undefined
}

export function PersonOverlay({name, tableName} :Props) {
  return (
    <div className="person-container person-overlay">
      <div className="image-container">
        <div>
          <MdPerson className="profile-image" />
        </div>
      </div>
      <div className="person-text-container">
        <div className="one-liner">{name}</div>
        <div className="subtext one-liner">{tableName}</div>
      </div>
    </div>
  );
}
