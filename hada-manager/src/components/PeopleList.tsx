import { useEffect, useRef, useState } from "react"
import { Person } from "./Person"
import type { PersonType, TableType } from "../Types"
import { FaHourglassEnd, FaHourglassHalf, FaHourglassStart, FaPlus } from "react-icons/fa"
import { BsSearch } from "react-icons/bs"
import { v4 as uuidv4 } from "uuid"
import { minutesToMili } from "../common/timeFunctions"
import { ConvertHebrewAndEnglish } from "../common/textFunctions"

const changeTimes: number[] = [0.1, 0.1]

interface Props {
  activeId: string | number | null
  editMode: boolean
  people: PersonType[]
  setPeople: React.Dispatch<React.SetStateAction<PersonType[]>>
  tables: TableType[]
  setTables: React.Dispatch<React.SetStateAction<TableType[]>>
  UpdateList(id: string, state: number): void
}

export function PeopleList({
  editMode,
  people,
  setPeople,
  activeId,
  tables,
  setTables,
  UpdateList,
}: Props) {
  const eatingStateTimers: Record<string, number> = {}
  const [filteredPeople, setFilteredPeople] = useState<PersonType[]>([])
  const [searchValue, SetSearchValue] = useState("")
  const [isSearching, SetIsSearching] = useState(false)
  const [filteredState, SetFilteredState] = useState(0)
  const loaded = useRef(false)

  //#region Logic
  useEffect(() => {
    // fetch('https://localhost:7013/People')
    // .then(response => response.json())
    // .then(data => {
    //     SetPeople(data);
    // })
    if (loaded.current) return

    setPeople((prev) => [
      ...prev,
      { idNumber: 123456, name: "עמרי בראון", eatingState: 0, id: "123456" },
    ])
    loaded.current = true
  }, [])

  //filters the list of people shown
  useEffect(() => {
    let isNumericSearch = Number(searchValue)

    if (filteredState == 0) {
      setFilteredPeople(
        people.filter((_) =>
          isNumericSearch
            ? _.idNumber.toString().includes(searchValue)
            : _.name.includes(searchValue) || _.name.includes(ConvertHebrewAndEnglish(searchValue))
        )
      )

      return
    }

    setFilteredPeople(
      people.filter((_) => _.eatingState === filteredState && _.name.includes(searchValue))
    )
  }, [people, filteredState, searchValue])

  //updates people eating state
  useEffect(() => {
    people.forEach((person) => {
      if (person.eatingState > 0 && person.eatingState < 3) {
        const delay = minutesToMili(changeTimes[person.eatingState - 1])
        eatingStateTimers[person.id] = setTimeout(() => {
          setPeople((prev) =>
            prev.map((_) => (_.id === person.id ? { ..._, eatingState: _.eatingState + 1 } : _))
          )
        }, delay)
      }
    })

    return () => {
      Object.values(eatingStateTimers).forEach(clearTimeout)
    }
  }, [people])

  //search person by name or id
  const SearchPerson = (input: string) => {
    SetSearchValue(input)
  }

  const addPerson = () => {
    let nameElement = document.getElementById("personNameInput") as HTMLInputElement
    let idElement = document.getElementById("personIdInput") as HTMLInputElement

    if (!nameElement || !idElement) return

    if (nameElement.value && idElement.value) {
      var person: PersonType = {
        id: uuidv4(),
        name: nameElement.value,
        eatingState: 0,
        idNumber: Number(idElement.value),
      }
    } else {
      return
    }

    setPeople((prev) => [...prev, person])
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

  const unseatPerson = (id: string) => {
    let table = tables.find((_) => _.peopleIds.includes(id))
    let person = people.find((_) => _.id === id)

    if (table) {
      setTables((prevTables) =>
        prevTables.map((table) =>
          table.peopleIds.includes(id)
            ? { ...table, peopleIds: table.peopleIds.filter((pid) => pid !== id) }
            : table
        )
      )
    }
    if (person) {
      setPeople((prev) =>
        prev.map((person) =>
          person.id === id ? { ...person, tableName: "", roomName: "" } : person
        )
      )
    }
  }

  const removePerson = (id: string) => {
    unseatPerson(id)
    setPeople((prev) => prev.filter((_) => _.id !== id))
  }

  const stopEating = (id: string) => {
    unseatPerson(id)
    UpdateList(id, 0)
  }

  const updateFilteredState = (newState: number) => {
    SetFilteredState((prev) => (prev === newState ? 0 : newState))
  }
  //#endregion

  return (
    <div className="people-list-divider">
      <div className="people-list-search-wrapper">
        <h2 className="center">אנשים</h2>
        <div id="Title and Serch bar" className="relative">
          {!isSearching && <BsSearch className="people-search-icon" />}
          <input
            name="peopleSearchBox"
            className="people-search"
            type="search"
            placeholder="חפש אנשים"
            value={searchValue}
            onFocus={() => SetIsSearching(true)}
            onBlur={() => SetIsSearching(false)}
            onChange={(e) => SearchPerson(e.target.value)}
          />
        </div>
        <div id="Time Filter Buttons" className="even-flex">
          <abbr title="סנן התחילו לאכול">
            <button
              className={`people-eating-filter-button ${filteredState == 1 ? "selected-people-filter-button" : ""}`}
              onClick={() => updateFilteredState(1)}
            >
              <FaHourglassStart />
            </button>
          </abbr>
          <abbr title="סנן לקראת סיום">
            <button
              className={`people-eating-filter-button ${filteredState == 2 ? "selected-people-filter-button" : ""}`}
              onClick={() => updateFilteredState(2)}
            >
              <FaHourglassHalf />
            </button>
          </abbr>
          <abbr title="סנן סיימו לאכול">
            <button
              className={`people-eating-filter-button ${filteredState == 3 ? "selected-people-filter-button" : ""}`}
              onClick={() => updateFilteredState(3)}
            >
              <FaHourglassEnd />
            </button>
          </abbr>
        </div>
        {editMode && (
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
        )}
      </div>
      <div className="people-list-content-wrapper">
        {filteredPeople.map((_) => (
          <Person
            key={_.id}
            person={_}
            editMode={editMode}
            StopEating={() => stopEating(_.id)}
            Delete={() => removePerson(_.id)}
            hidden={activeId === _.id}
          />
        ))}
      </div>
    </div>
  )
}
