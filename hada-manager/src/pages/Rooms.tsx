import { useState } from "react";
import { Room } from "../components/Room"
import { TopButtons } from "../components/TopButons";
import type { RoomType, TopLevelProps } from "../Types"
import { useOutletContext } from "react-router-dom";
import { useYapperDialog } from "yapperjs";
import { AddRoom } from "../components/AddRoomDialog";
import { v4 as uuidv4 } from "uuid";

const template : RoomType[] = [{id:"123456", capacity:50, name:"חד\"א קצינים שיש לו עכשיו שם ממש אבל ממש אבל מממממששששששש ארוך",
                                    tables:[],
                                    peopleIds:[]},
                                {id:"123789", capacity:8, name:"חד\"א חפשים",
                                    tables:[],
                                    peopleIds:[]},];

export function Rooms() {
    const {editMode, SetEditMode} = useOutletContext<TopLevelProps>();
    const [roomsList, SetRoomsList] = useState<RoomType[]>(template);
    const yapperApi = useYapperDialog();
    
    const handleSubmit = async () => {
        const newRoom = await yapperApi.showDialog({content:AddRoom});
        if(!newRoom)
            return;
        
        newRoom.id = uuidv4();
        newRoom.peopleIds = [];
        newRoom.tables=[];
        
        await SetRoomsList(prev => [...prev,newRoom]);
    }

    return (
        <div style={{display:"block"}}>
            <TopButtons editMode={editMode} SetEditMode={SetEditMode} handleForm={handleSubmit}/>
            <div className="content-container">
                {roomsList.map(_ => <Room key={_.id} id={_.id} name={_.name} capacity={_.capacity} peopleIds={_.peopleIds} tables={_.tables}/>)}
            </div>
            <yapperApi.renderer/>
        </div>
    )
}