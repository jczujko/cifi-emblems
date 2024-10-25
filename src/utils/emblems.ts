import { bignumber, evaluate, floor } from "mathjs";
import { IEmblem } from "../types";

export const calculateEmblemCumulativeCost = (emblem: IEmblem): number => {
  const series = [];
  if (emblem.level === 0) {
    return 0;
  }
  for (let i = 0; i < emblem.level; i++) {
    series.push(floor(evaluate(`${emblem.baseCost}+${emblem.increment}*${i}`)));
  }
  return series.reduce((acc: number, current: number) => (acc += current), 0);
};

export const getEmblemBonus = (emblem: IEmblem, sumOfHuntersLevels: number) =>
  evaluate(
    `(1+${bignumber(emblem.bonus)}*${bignumber(emblem.level)})^${bignumber(
      sumOfHuntersLevels
    )}`
  );
