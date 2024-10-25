import React, { SetStateAction } from "react";

export type IHunter = {
  name: string;
  level: number;
};

export type EmblemName = "Cells" | "MP" | "Shards" | "RP" | "AP";

export type IEmblem = {
  name: EmblemName;
  level: number;
  bonus: number;
  baseCost: number;
  increment: number;
};

export type ReactSetStateAction<T> = React.Dispatch<SetStateAction<T>>;
