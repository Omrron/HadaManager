import { Outlet } from "react-router-dom";
import { PeopleList } from "../components/PeopleList";

export function Layout(){
    return(
        <div className="layout-container">
            <aside className="list-container">
                <PeopleList/>
            </aside>
            <div className="window-container">
                <Outlet/>
            </div>
        </div>
    )
}