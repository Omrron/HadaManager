import { Room } from "../components/Room"
import type { RoomType } from "../Types"

const roomsList : RoomType[] = [{id:"123456", capacity:50, name:"חד\"א קצינים שיש לו עכשיו שם ממש אבל ממש אבל מממממששששששש ארוך",
                                    tables:[],
                                    peopleIds:[]},
                                {id:"123789", capacity:8, name:"חד\"א חפשים",
                                    tables:[],
                                    peopleIds:[]},];

export function Rooms() {
    return (
        <>
            {roomsList.map(_ => <Room key={_.id} id={_.id} name={_.name} capacity={_.capacity} peopleIds={_.peopleIds} tables={_.tables}/>)}
        </>
    )
}