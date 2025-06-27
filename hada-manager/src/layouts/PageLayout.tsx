import { Outlet } from "react-router-dom";
import { PeopleList } from "../components/PeopleList";

export function Layout(){
    return(
        <div className="layout-container">
            <aside className="list-container">
                <PeopleList/>
            </aside>
            <div className="other-side-container">
                <div className="buttons-container">

                </div>
                <div className="content-container">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}