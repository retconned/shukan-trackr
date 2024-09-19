import React, { useMemo } from "react";
import { Habit } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface MinimalViewProps {
  habit: Habit;
  updateStreak: () => void;
  startDay: string;
}

const MinimalCard: React.FC<MinimalViewProps> = ({
  habit,
  updateStreak,
  startDay,
}) => {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getWeekDays = useMemo(() => {
    const today = new Date();
    const startDayIndex = dayNames.findIndex(
      (day) => day.toLowerCase() === startDay.slice(0, 3).toLowerCase(),
    );

    const result = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      const diff = date.getDay() - startDayIndex - i;
      date.setDate(date.getDate() - diff);
      result.push(date);
    }
    return result;
  }, [startDay]);

  const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  const isToday = (date: Date): boolean => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isCompleted = (date: Date): boolean => {
    return habit.days[formatDate(date)] || false;
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex w-full items-center justify-between space-x-2 rounded-t-lg bg-foreground/10 p-2">
          <div className="flex flex-row items-center justify-center space-x-2">
            <p className="flex h-8 w-8 items-center justify-center text-lg">
              {habit.emoji}
            </p>
            <p className="text-sm">{habit.name}</p>
          </div>
          <Badge variant="secondary" className="text-xs">
            🔥 {habit.streak}
          </Badge>
        </div>
      </div>
      <div className="flex flex-col justify-center space-y-2">
        <div className="flex flex-row justify-between rounded-b-lg bg-primary/80 p-2">
          <div className="flex w-full flex-row items-center justify-evenly">
            {getWeekDays.map((day, index) => (
              <div key={index} className="flex flex-col items-center space-y-1">
                <div
                  className={`mt-2 h-6 w-6 rounded-full ${isCompleted(day) ? "bg-yellow-300" : "bg-zinc-400"} ${isToday(day) ? "ring-2 ring-white" : ""} `}
                />
                <span className="text-sm">
                  {dayNames[day.getDay()].slice(0, 1)}
                </span>
              </div>
            ))}
          </div>
          <div className="mr-4 flex flex-row items-center justify-center space-x-4">
            <Separator orientation="vertical" />
            <Button
              onClick={updateStreak}
              variant="outline"
              size="sm"
              className="h-8 w-8 rounded-full"
            >
              +
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinimalCard;
