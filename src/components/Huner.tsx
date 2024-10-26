import { HUNTERS_LOCAL_STORAGE_KEY } from "../contsants";
import { IHunter, ReactSetStateAction } from "../types";
import Button from "../ui/button";

type Props = {
  name: string;
  level: number;
  setHuntersState: ReactSetStateAction<IHunter[]>;
};

function Hunter({ name, level, setHuntersState }: Props) {
  const changeHunterLevel = (value: number) => {
    setHuntersState((prevState: IHunter[]) => {
      const newState = [...prevState];
      const item = newState.find((hunter: IHunter) => hunter.name === name);
      if (!item) {
        return prevState;
      }
      item.level += value;
      if (item.level < 0) {
        item.level = 0;
      }
      localStorage.setItem(HUNTERS_LOCAL_STORAGE_KEY, JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <div className="border-2 border-blue-800 bg-blue-900 rounded-md mb-1 grid grid-cols-2 md:grid-rows-2 md:grid-cols-1 select-none">
      <div className="px-2 py-1 grid grid-rows-5">
        <div className="font-bold">{name}</div>
        <div>{`Lv ${level}`}</div>
      </div>
      <div className="grid grid-cols-2 grid-rows-2 font-bold">
        <Button text={"+1"} onClick={() => changeHunterLevel(1)} />
        <Button text={"+10"} onClick={() => changeHunterLevel(10)} />
        <Button text={"-1"} onClick={() => changeHunterLevel(-1)} />
        <Button text={"-10"} onClick={() => changeHunterLevel(-10)} />
      </div>
    </div>
  );
}

export default Hunter;
