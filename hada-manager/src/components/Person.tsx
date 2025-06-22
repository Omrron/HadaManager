import { MdClose, MdOutlineCheck, MdPerson } from "react-icons/md"
import { ShortenText } from "../common/textFunctions"

interface Props{
name:string
}

export function Person({name}:Props){
    return(
        <div className="person-container">
            <div className="relative">
                <MdPerson className="profile-image"/>
                <button className="delete-button">
                    <MdClose className="centered-icon"/>
                </button>
            </div>
            <div>
                <p className="short">{ShortenText(name,15)}</p>
                <p>שולחן 2</p>
            </div>
            <span>
                <button className="enter-button">
                    <MdOutlineCheck />
                </button>
                <button className="depart-button">
                    <MdClose />
                </button>
            </span>
        </div>
    )
}