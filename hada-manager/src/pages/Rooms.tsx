import { Room } from "../components/Room"
import { TopButtons } from "../components/TopButons";
import type { RoomType, TopLevelProps } from "../Types"
import { useOutletContext } from "react-router-dom";

const roomsList : RoomType[] = [{id:"123456", capacity:50, name:"חד\"א קצינים שיש לו עכשיו שם ממש אבל ממש אבל מממממששששששש ארוך",
                                    tables:[],
                                    peopleIds:[]},
                                {id:"123789", capacity:8, name:"חד\"א חפשים",
                                    tables:[],
                                    peopleIds:[]},];

export function Rooms() {
    const {editMode, SetEditMode} = useOutletContext<TopLevelProps>();

    return (
        <div style={{display:"block"}}>
            <TopButtons editMode={editMode} SetEditMode={SetEditMode}/>
            <div className="content-container">
                {roomsList.map(_ => <Room key={_.id} id={_.id} name={_.name} capacity={_.capacity} peopleIds={_.peopleIds} tables={_.tables}/>)}
            </div>
        </div>
    )
}