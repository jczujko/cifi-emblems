import { IEmblem, IHunter } from "./types";

export const HUNTERS_LOCAL_STORAGE_KEY = "huntersData";

export const HUNTERS: IHunter[] = [
  {
    name: "Borge",
    level: 1,
  },
  {
    name: "Ozzy",
    level: 1,
  },
];

export const EMBLEMS: IEmblem[] = [
  {
    name: "Cells",
    level: 0,
    baseCost: 1,
    increment: 0.2,
    bonus: 0.05,
  },
  {
    name: "MP",
    level: 0,
    baseCost: 2,
    increment: 0.3,
    bonus: 0.01,
  },
  {
    name: "Shards",
    level: 0,
    baseCost: 3,
    increment: 0.4,
    bonus: 0.01,
  },
  {
    name: "RP",
    level: 0,
    baseCost: 4,
    increment: 0.5,
    bonus: 0.01,
  },
  {
    name: "AP",
    level: 0,
    baseCost: 5,
    increment: 0.6,
    bonus: 0.006,
  },
];
