import React from "react";
import { Habit } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface WeeklyHabitViewProps {
  habit: Habit;
  updateStreak: () => void;
}

const WeeklyHabitView: React.FC<WeeklyHabitViewProps> = ({
  habit,
  updateStreak,
}) => {
  const today = new Date();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(today);
    day.setDate(today.getDate() - today.getDay() + i);
    return day;
  });

  return (
    <Card className="bg-primary/90">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold">{habit.name}</h3>
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
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          {weekDays.map((day, index) => {
            const dayString = day.toISOString().split("T")[0];
            const isCompleted = habit.days[dayString];
            const isToday = day.toDateString() === today.toDateString();

            return (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div
                  className={`mt-2 h-6 w-6 rounded-full ${
                    isCompleted ? "bg-yellow-300" : "bg-zinc-400"
                  } ${isToday ? "ring-2 ring-white" : ""}`}
                />
                <span className="text-sm">{dayNames[day.getDay()]}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeeklyHabitView;
