import { MdPerson } from "react-icons/md";

interface Props {
    name:string;
}

export function PersonOverlay({name} :Props) {
  return (
    <div className="person-container person-overlay">
      <div className="image-container">
        <div>
          <MdPerson className="profile-image" />
        </div>
      </div>
      <div className="nowrap">
        <div className="one-liner">{name}</div>
        <div className="subtext">שולחן 2</div>
      </div>
    </div>
  );
}
