import { MdPerson } from "react-icons/md"

interface Props {
  name: string
  tableName: string | undefined
  roomName: string | undefined
}

export function PersonOverlay({ name, tableName, roomName }: Props) {
  return (
    <div className="person-container person-overlay">
      <div className="image-container">
        <div>
          <MdPerson className="profile-image" />
        </div>
      </div>
      <div className="person-text-container">
        <div className="one-liner">{name}</div>
        {tableName && (
          <div className="person-location-container">
            <div className="subtext half-size one-liner" title={tableName}>
              {tableName}
            </div>
            <div className="text-divider">|</div>
            <div className="subtext half-size one-liner" title={roomName}>
              {roomName}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
