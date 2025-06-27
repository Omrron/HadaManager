import { Outlet } from "react-router-dom";

export function Layout(){
    return(
        <div className="list-container">
            <aside>
                <PeopleList/>
            </aside>
            <div className="layout-container">
                <Outlet/>
            </div>
        </div>
    )
}