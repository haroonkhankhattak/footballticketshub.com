import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | number | Date): string {
  const timestamp =
    typeof date === "string"
      ? parseInt(date)
      : typeof date === "number"
      ? date
      : date.getTime();

  const formattedDate = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return formattedDate.toLocaleDateString("en-US", options);
}
