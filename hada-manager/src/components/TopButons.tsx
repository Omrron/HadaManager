import { MdOutlineEdit, MdOutlineEditOff } from "react-icons/md";

interface Props{
    editMode:boolean;
    SetEditMode:React.Dispatch<React.SetStateAction<boolean>>;
}

export function TopButtons({editMode, SetEditMode: setEditMode}:Props){

    return(
        <div className="buttons-container">
            <button className="top-button"  onClick={() => setEditMode(prevCount => !prevCount)}>
                {editMode ? <MdOutlineEditOff className="centered-icon top-icon" /> : <MdOutlineEdit className="centered-icon top-icon" />}
            </button>
            <button className="top-button"/>
            <button className="top-button"/>
            <button style={{position:"absolute", left:"0.5rem", top:"25%", background:"red", height:"50%", border:"0" ,width:"20px"}}/>
        </div>
    );
}