import React, { useMemo } from "react";
import { Habit } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { isTitleEmpty } from "@/lib/utils";

interface WeeklyHabitViewProps {
  habit: Habit;
  updateStreak: () => void;
  startDay: string;
}

const WeeklyHabitView: React.FC<WeeklyHabitViewProps> = ({
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
    <div className="rounded-xl bg-primary/90 px-4 pt-2">
      <div className="flex flex-row items-center justify-between py-2">
        <div className="flex items-center space-x-2 px-2">
          <h3 className="text-base">{habit.emoji}</h3>
          <h3 className="text-base">
            {isTitleEmpty(isTitleEmpty(habit.name))}
          </h3>
          <Badge variant="default" className="text-xs">
            🔥 {habit.streak} days
          </Badge>
        </div>
        <Button
          onClick={updateStreak}
          variant="outline"
          size="sm"
          className="rounded-full"
        >
          +
        </Button>
      </div>
      <div className="px-2 pb-4 pt-0">
        <div className="flex justify-between">
          {getWeekDays.map((day, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div
                className={`mt-2 h-6 w-6 rounded-full ${isCompleted(day) ? "bg-yellow-300" : "bg-zinc-400"} ${isToday(day) ? "ring-2 ring-white" : ""} `}
              />
              <span className="text-sm">{dayNames[day.getDay()]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyHabitView;
