import { Habit } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const emojiList = [
  "🌟",
  "💪",
  "📚",
  "🍀",
  "🌞",
  "🏋️‍♂️",
  "🎯",
  "🚀",
  "🧠",
  "🎨",
  "🔥",
  "🌿",
  "🏆",
];

export const getRandomEmoji = () => {
  const randomIndex = Math.floor(Math.random() * emojiList.length);
  return emojiList[randomIndex];
};

export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "2-digit",
  };
  return date.toLocaleDateString("en-GB", options).replace(/ /g, " ");
};

export const calculateEndDate = (habit: Habit) => {
  if (!habit.goalDays) return null;

  const startDate = new Date(habit.startDate);
  const targetDate = new Date(startDate);
  targetDate.setDate(startDate.getDate() + habit.goalDays);

  return formatDate(targetDate);
};

export const calculateRemainingDays = (habit: Habit) => {
  if (!habit.goalDays) return null;

  const startDate = new Date(habit.startDate);
  const targetDate = new Date(startDate);
  targetDate.setDate(startDate.getDate() + habit.goalDays);

  const remainingTime = targetDate.getTime() - new Date().getTime();
  const remainingDays = Math.ceil(remainingTime / (1000 * 3600 * 24));

  return remainingDays > 0 ? remainingDays : 0;
};
