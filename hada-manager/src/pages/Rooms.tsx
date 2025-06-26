import { Person } from "../components/Person"
import type { PersonType } from "../Types"

const people : PersonType[] = [{id:123456789, name:"john"}, {name:"ואsdd asa dasasdd dasdasdארוך", id:789456}]

export function Rooms() {
    return (
        <>
            <h1>Rooms List</h1>
            <div>
                {people.map(_ => <Person key={_.id} name={_.name}/>)}
            </div>
        </>
    )
}