import { MdClose, MdOutlineCheck, MdPerson } from "react-icons/md";
import { ShortenText } from "../common/textFunctions";
import { useRef, useState } from "react";

interface Props {
  name: string;
}

const warningTime: number = 5;
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

export function Person({ name }: Props) {
  const [foodState, setFoodState] = useState(0);
  const isEating = useRef(false);
  const intervalId = useRef(0);
  const startEatingTime = useRef(DEFAULT_DATE);

  const idk = () => {
    setFoodState((prev) => {
      if (prev < 3) {
        return prev + 1;
      } else {
        clearInterval(intervalId.current);
        isEating.current = false;
        return prev;
      }
    });
  };

  const startEating = () => {
    if (!isEating.current) {
      setFoodState((prev) => prev + 1);
      startEatingTime.current = new Date();
      intervalId.current = setTimeout(idk, 1000);
      isEating.current = true;
    }
  };

  const stopEating = () => {
    if (isEating.current) {
      clearTimeout(intervalId.current);
      isEating.current = false;
    }
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
