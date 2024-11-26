import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCoinsFromAmount = (amount: number) => {
  switch (amount) {
    case 500:
      return 100;
    case 2500:
      return 520;
    case 5000:
      return 1050;
    default:
      return 0;
  }
};
