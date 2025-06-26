import { Room } from "../components/Room"
import type { RoomType } from "../Types"

const roomsList : RoomType[] = [{id:"123456", capacity:50, name:"חד\"א קצינים", occupancy:20}, {id:"456789", capacity:50, name:"חד\"א חפשנים", occupancy:45}]

export function Rooms() {
    return (
        <>
            <div>
                {roomsList.map(_ => <Room key={_.id} id={_.id} name={_.name} capacity={_.capacity} occupancy={_.occupancy}/>)}
            </div>
        </>
    )
}