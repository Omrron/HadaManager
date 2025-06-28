import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Person } from "./Person";
import type { PersonType } from "../Types";
import { FaPlus } from "react-icons/fa";
import { BsSearch } from "react-icons/bs";


export function PeopleList(){
    const [people, SetPeople] = useState<PersonType[]>([]);
    const location = useLocation();
    const [isSearching, SetIsSearching] = useState(false);

    useEffect(() => {
        // fetch('https://localhost:7013/People')
        // .then(response => response.json())
        // .then(data => {
        //     SetPeople(data);
        // })
        SetPeople([{idNumber:123456, name:"עמרי בראון", eatingState:0, id:"123456"}])
    }, [])

    const addPerson = () => {
        let nameElement = (document.getElementById("personNameInput") as HTMLInputElement);
        let idElement = (document.getElementById("personIdInput") as HTMLInputElement);

        if(!nameElement || !idElement) return;

        if (nameElement.value && idElement.value){
            var person: PersonType = {
                name: nameElement.value,
                idNumber: Number(idElement.value)
            }
        }
        else{ return }

        SetPeople(prev => [...prev,person])

        // let personRequest = {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(person)
        // };

        // fetch("https://localhost:7013/People",personRequest)
        // .then(response => response.json())
        // .then(data => console.log(data))
        // .catch(error => console.error('Error:', error)); // Handle errors
    }

    return(
        <div>
            <h2 className="center">אנשים</h2>
            <div style={{position:"relative"}}>
                <BsSearch style={{visibility:`${isSearching ? "hidden" : "visible"}` ,position:"absolute", left:"12%", top:"18%"}}/>
                <input name="peopleSearchBox" className="people-search" type="search" placeholder="חפש אנשים" onFocus={() => SetIsSearching(true)} onBlur={() => SetIsSearching(false)}/>
            </div>
            <div className="create-person">
                <input type="text" id="personNameInput" placeholder="שם האדם" className="create-person-input"/>
                <input type="number" id="personIdInput" placeholder="מספר אישי" className="create-person-input"/>
                <button className="create-person-submit" onClick={addPerson}>
                    <FaPlus/>
                </button>
            </div>
            <div className="people-container">
                {people.map(person=> <Person key={person.id} eatingState={person.eatingState} idNumber={person.idNumber} name={person.name}/>)}
            </div>
        </div>
    );
}