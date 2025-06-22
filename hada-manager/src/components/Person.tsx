import { MdClose, MdOutlineCheck, MdPerson } from "react-icons/md"
import { ShortenText } from "../common/textFunctions"

interface Props{
name:string
}

export function Person({name}:Props){
    return(
        <div className="person-container">
            <div className="image-container">
                <MdPerson className="profile-image"/>
                <button className="delete-button">
                    <MdClose className="centered-icon"/>
                </button>
            </div>
            <div className="nowrap">
                {ShortenText(name,15)}
                <div className="subtext">שולחן 2</div>
            </div>
            <div className="flex-container">
                <button className="enter-button">
                    <MdOutlineCheck className="centered-icon"/>
                </button>
                <button className="depart-button">
                    <MdClose className="centered-icon"/>
                </button>
            </div>
        </div>
    )
}