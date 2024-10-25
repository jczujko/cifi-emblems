import { format } from "mathjs";

export const formatNumber = (number: number) =>
  format(number, { notation: "exponential", precision: 3 });
