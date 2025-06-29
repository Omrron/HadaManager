import { useEffect, useId, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Person } from "./Person";
import type { PersonType } from "../Types";
import {
  FaHourglassEnd,
  FaHourglassHalf,
  FaHourglassStart,
  FaPlus,
} from "react-icons/fa";
import { BsSearch } from "react-icons/bs";
import { v4 as uuidv4 } from "uuid";

export function PeopleList() {
  const [allPeople, SetAllPeople] = useState<PersonType[]>([]);
  const [people, SetPeople] = useState<PersonType[]>([]);
  const location = useLocation();
  const [isSearching, SetIsSearching] = useState(false);
  const [filteredState,SetFilteredState] = useState(0);
  const loaded = useRef(false);

  useEffect(() => {
    // fetch('https://localhost:7013/People')
    // .then(response => response.json())
    // .then(data => {
    //     SetPeople(data);
    // })
    if (loaded.current) return;

    SetAllPeople(prev => [...prev, {idNumber: 123456, name: "עמרי בראון", eatingState: 0, id: "123456" }]);
    loaded.current = true;
  }, []);

  useEffect(() => {

    if (filteredState == 0)
    {
        SetPeople(allPeople)

        return;
    }

    console.log(filteredState)
    console.log(allPeople)

    SetPeople(allPeople.filter(_ => _.eatingState === filteredState))

  },[allPeople, filteredState])

  const addPerson = () => {
    let nameElement = document.getElementById(
      "personNameInput"
    ) as HTMLInputElement;
    let idElement = document.getElementById(
      "personIdInput"
    ) as HTMLInputElement;

    if (!nameElement || !idElement) return;

    if (nameElement.value && idElement.value) {
      var person: PersonType = {
        id: uuidv4(),
        name: nameElement.value,
        eatingState: 0,
        idNumber: Number(idElement.value),
      };
    } else {
      return;
    }

    SetAllPeople(prev => [...prev, person]);
    // let personRequest = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(person)
    // };

    // fetch("https://localhost:7013/People",personRequest)
    // .then(response => response.json())
    // .then(data => console.log(data))
    // .catch(error => console.error('Error:', error)); // Handle errors
  };

  const UpdateList = (id: string, state: number) => {
    console.log(state)
    console.log(id)
    SetAllPeople(prev => prev.map(person => person.id === id ? {...person, eatingState:state} : person));
  };

 const updateFilteredState = (newState:number) => {
    SetFilteredState(prev => prev === newState ? 0 : newState);
 }

  return (
    <div>
      <h2 className="center">אנשים</h2>
      <div className="relative">
        {!isSearching && <BsSearch className="people-search-icon" />}
        <input
          name="peopleSearchBox"
          className="people-search"
          type="search"
          placeholder="חפש אנשים"
          onFocus={() => SetIsSearching(true)}
          onBlur={() => SetIsSearching(false)}
        />
      </div>
      <div className="even-flex">
        <button
          className="people-eating-filter-button"
          onClick={() => (updateFilteredState(1))}
        >
          <FaHourglassStart />
        </button>
        <button
          className="people-eating-filter-button"
          onClick={() => (updateFilteredState(2))}
        >
          <FaHourglassHalf />
        </button>
        <button
          className="people-eating-filter-button"
          onClick={() => (updateFilteredState(3))}
        >
          <FaHourglassEnd />
        </button>
      </div>
      <div className="create-person">
        <input
          type="text"
          id="personNameInput"
          placeholder="שם האדם"
          className="create-person-input"
        />
        <input
          type="number"
          id="personIdInput"
          placeholder="מספר אישי"
          className="create-person-input"
        />
        <button className="create-person-submit" onClick={addPerson}>
          <FaPlus />
        </button>
      </div>
      <div className="people-container">
        {people.map((_) => (
            <Person key={_.id} person={_} UpdateList={UpdateList} />
          ))}
      </div>
    </div>
  );
}