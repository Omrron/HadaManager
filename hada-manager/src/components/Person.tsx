import { MdClose, MdOutlineCheck, MdPerson } from "react-icons/md";
import { ShortenText } from "../common/textFunctions";
import { useEffect, useRef, useState } from "react";
import { miliToMinutes } from "../common/timeFunctions";
import type { PersonType } from "../Types";

const changeTimes: number[] = [0.1, 0.1];
const DEFAULT_DATE = new Date();

function stateToColor(state: number) {
  switch (state) {
    case 1:
      return "--good-color";
    case 2:
      return "--ok-color";
    case 3:
      return "--bad-color";
    default:
      return "--color";
  }
}

export function Person({ name, eatingState = 0, tableName, room }: PersonType) {
  const [foodState, setFoodState] = useState(eatingState);
  const isEating = useRef(false);
  const timeoutId = useRef<number|null>(null);
  const startEatingTime = useRef(DEFAULT_DATE);

  useEffect(() => {
    if (eatingState > 0) isEating.current = true;
  },[])

  useEffect(() => {
    eatingState = foodState;
    if (!isEating.current) return;

    if (foodState >= 3) {
      isEating.current = false;
      return;
    }

    if (timeoutId.current !== null) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = window.setTimeout(() => {
      setFoodState(prev => prev + 1);
    }, miliToMinutes(changeTimes[foodState-1]));

    return () => {
      if (timeoutId.current !== null) {
        clearTimeout(timeoutId.current);
        timeoutId.current = null;
      }
    };
  }, [foodState]);

  const startEating = () => {
    if (!isEating.current) {
      isEating.current = true;
      startEatingTime.current = new Date();
      setFoodState(1);
    }
  };

  const stopEating = () => {
    if (timeoutId.current !== null) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }
    isEating.current = false;
    setFoodState(0);
  };

  return (
    <div className="person-container">
      <div className="image-container">
        <MdPerson
          className="profile-image"
          style={{ borderColor: `var(${stateToColor(foodState)})` }}
        />
        <button className="delete-button">
          <MdClose className="centered-icon" />
        </button>
      </div>
      <div className="nowrap">
        {ShortenText(name, 15)}
        <div className="subtext">שולחן 2</div>
      </div>
      <div className="flex-container">
        <button className="enter-button" onClick={startEating}>
          <MdOutlineCheck className="centered-icon" />
        </button>
        <button className="depart-button" onClick={stopEating}>
          <MdClose className="centered-icon" />
        </button>
      </div>
    </div>
  );
}
