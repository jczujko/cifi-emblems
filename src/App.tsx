import { EMBLEMS, HUNTERS, HUNTERS_LOCAL_STORAGE_KEY } from "./contsants";
import { IEmblem, IHunter } from "./types";
import Hunter from "./components/Huner";
import { useMemo, useState } from "react";
import Emblem from "./components/Emblem";
import { calculateEmblemCumulativeCost } from "./utils/emblems";

function App() {
  const [huntersState, setHuntersState] = useState<IHunter[]>((): IHunter[] => {
    const loadedHuntersState = localStorage.getItem(HUNTERS_LOCAL_STORAGE_KEY);
    if (!loadedHuntersState) {
      return HUNTERS;
    }
    const huntersState: IHunter[] = JSON.parse(loadedHuntersState);
    if (huntersState.length < HUNTERS.length) {
      const savedHuntersNames: string[] = huntersState.map(
        (hunter: IHunter) => hunter.name
      );
      const newHunters = HUNTERS.filter(
        (hunter: IHunter) => !savedHuntersNames.includes(hunter.name)
      );
      const newHuntersState: IHunter[] = [...huntersState, ...newHunters];
      localStorage.setItem(
        HUNTERS_LOCAL_STORAGE_KEY,
        JSON.stringify(newHuntersState)
      );
      return newHuntersState;
    }
    return huntersState;
  });

  const [emblemsState, setEmblemsState] = useState<IEmblem[]>(EMBLEMS);

  const sumOfHunterLevels: number = useMemo(
    (): number =>
      huntersState.reduce(
        (acc: number, current: IHunter): number => (acc += current.level),
        0
      ),
    [huntersState]
  );

  const sumOfEmblemsSpent: number = useMemo(
    (): number =>
      emblemsState.reduce(
        (acc: number, current: IEmblem) =>
          acc + calculateEmblemCumulativeCost(current),
        0
      ),
    [emblemsState]
  );

  return (
    <div className="bg-blue-950 h-screen text-blue-50 p-2 overflow-scroll min-w-[400px]">
      <div className="md:grid md:grid-cols-2 md:w-1/2 gap-3 md:m-auto">
        {huntersState.map((hunter: IHunter) => (
          <Hunter
            key={`hunter-${hunter.name}`}
            name={hunter.name}
            level={hunter.level}
            setHuntersState={setHuntersState}
          />
        ))}
      </div>
      <div>
        <div className="grid justify-center">
          <span>{`Hunter levels: ${sumOfHunterLevels}`}</span>
          <span>{`Emblems spent: ${sumOfEmblemsSpent}`}</span>
        </div>
        <div className="md:grid md:grid-cols-5 md:mx-4 gap-3 md:m-auto">
          {emblemsState.map((emblem: IEmblem) => (
            <Emblem
              key={`emblem-${emblem.name}`}
              emblem={emblem}
              setEmblemsState={setEmblemsState}
              sumOfHunterLevels={sumOfHunterLevels}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
