import { Room } from "../components/Room"
import { TopButtons } from "../components/TopButons";
import type { TopLevelProps } from "../Types"
import { useOutletContext } from "react-router-dom";
import { useYapperDialog } from "yapperjs";
import { AddRoom } from "../components/AddRoomDialog";
import { v4 as uuidv4 } from "uuid";

export function Rooms() {
    const {editMode, setEditMode, rooms, setRooms, tables} = useOutletContext<TopLevelProps>();
    const yapperApi = useYapperDialog();

    const handleSubmit = async () => {
        const newRoom = await yapperApi.showDialog({content:AddRoom});
        if(!newRoom)
            return;
        
        newRoom.id = uuidv4();
        
        await setRooms(prev => [...prev,newRoom]);
    }

    return (
        <>
            <TopButtons editMode={editMode} setEditMode={setEditMode} handleForm={handleSubmit}/>
            <div className="content-container">
                {rooms.map(_ => <Room key={_.id} id={_.id} name={_.name} tables={tables}/>)}
            </div>
            <yapperApi.renderer/>
        </>
    )
}