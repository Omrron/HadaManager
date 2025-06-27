import { Room } from "../components/Room"
import type { RoomType } from "../Types"

const roomsList : RoomType[] = [{id:"123456", capacity:50, name:"חד\"א קצינים שיש לו עכשיו שם ממש אבל ממש אבל מממממששששששש ארוך",
                                    tables:[{name:"שולחן בנים", capacity:50, peopleIds:[], id:"123456"}],
                                    people:[{id:867445, name:"omar", tableId:"123456"}]}];

export function Rooms() {
    return (
        <>
            <div>
                {roomsList.map(_ => <Room key={_.id} id={_.id} name={_.name} capacity={_.capacity} people={_.people} tables={_.tables}/>)}
            </div>
        </>
    )
}