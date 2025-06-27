import { Outlet } from "react-router-dom";
import { PeopleList } from "../components/PeopleList";

export function Layout(){
    return(
        <div className="layout-container">
            <aside className="list-container">
                <PeopleList/>
            </aside>
            <div style={{width:"80vw"}}>
                <div style={{height:"10vh", backgroundColor:"green", display:"flex"}}>

                </div>
                <div className="content-container">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}