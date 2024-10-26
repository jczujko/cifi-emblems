import { EMBLEMS_LOCAL_STORAGE_KEY } from "../contsants";
import { IEmblem, ReactSetStateAction } from "../types";
import Button from "../ui/button";
import {
  calculateEmblemCumulativeCost,
  getEmblemBonus,
  getNextLevelCost,
} from "../utils/emblems";
import { formatNumber } from "../utils/numbers";

type Props = {
  emblem: IEmblem;
  setEmblemsState: ReactSetStateAction<IEmblem[]>;
  sumOfHunterLevels: number;
};

export default function Emblem({
  emblem,
  setEmblemsState,
  sumOfHunterLevels,
}: Props) {
  const updateEmblemLevel = (emblem: IEmblem, value: number) =>
    setEmblemsState((prevState: IEmblem[]) => {
      const newState = [...prevState];
      const emblemToUpdate = newState.find(
        (element: IEmblem) => element.name === emblem.name
      );
      if (!emblemToUpdate) {
        return newState;
      }
      if (emblemToUpdate.level + value < 0) {
        emblemToUpdate.level = 0;
      } else {
        emblemToUpdate.level += value;
      }
      localStorage.setItem(EMBLEMS_LOCAL_STORAGE_KEY, JSON.stringify(newState));
      return newState;
    });

  return (
    <div className="border-2 border-blue-800 bg-blue-900 gap-2 rounded-md mb-1 grid grid-cols-2 md:grid-rows-9 grid-rows-4 select-none mt-2">
      <div className="grid md:col-span-2 col-start-1 justify-center font-bold md:border-b-4 border-blue-800">
        {emblem.name}
      </div>
      <div className="grid md:col-span-2 col-start-1 font-bold justify-center ">
        {`Level: ${emblem.level}`}
      </div>
      <div className="grid font-bold justify-center md:col-span-2">
        {`Next level cost: ${getNextLevelCost(emblem)}`}
      </div>
      <div className="grid md:col-span-2 col-start-1 font-bold justify-center">
        {`Emblems spent: ${calculateEmblemCumulativeCost(emblem)}`}
      </div>
      <div className="grid md:col-span-2 col-start-1 justify-center font-bold">
        {`Bonus: x${formatNumber(getEmblemBonus(emblem, sumOfHunterLevels))}`}
      </div>
      <div className="grid md:col-span-2 md:row-span-4 grid-cols-2 grid-rows-2 row-start-1 col-start-2 row-span-5">
        <Button
          text={"+1"}
          onClick={(): void => updateEmblemLevel(emblem, 1)}
        />
        <Button
          text={"+5"}
          onClick={(): void => updateEmblemLevel(emblem, 5)}
        />
        <Button
          text={"-1"}
          onClick={(): void => updateEmblemLevel(emblem, -1)}
        />
        <Button
          text={"-5"}
          onClick={(): void => updateEmblemLevel(emblem, -5)}
        />
      </div>
    </div>
  );
}
