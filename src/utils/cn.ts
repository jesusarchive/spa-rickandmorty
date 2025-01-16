import { ClassArray, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...args: ClassArray): string {
  return twMerge(clsx(args));
}
