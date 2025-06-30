import { MdOutlineEdit, MdOutlineEditOff } from "react-icons/md";

interface Props{
    editMode:boolean;
    SetEditMode:React.Dispatch<React.SetStateAction<boolean>>;
}

export function TopButtons({editMode, SetEditMode: setEditMode}:Props){

    const handleClick = () => {
        // You can use the setState function directly
        setEditMode(prevCount => !prevCount); // Using the updater function is generally preferred
        // Or, if the new state doesn't depend on the previous state:
        // setCount(currentCount + 1);
    };

    return(
        <div className="buttons-container">
            <button className="top-button"  onClick={handleClick}>
                {editMode ? <MdOutlineEditOff className="centered-icon top-icon" /> : <MdOutlineEdit className="centered-icon top-icon" />}
            </button>
            <button className="top-button"/>
            <button className="top-button"/>
            <button style={{position:"absolute", left:"0.5rem", top:"25%", background:"red", height:"50%", border:"0" ,width:"20px"}}/>
        </div>
    );
}