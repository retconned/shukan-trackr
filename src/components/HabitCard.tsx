import React from "react";
import { Habit } from "@/types";
import { calculateEndDate, calculateRemainingDays } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HabitCardProps {
  habit: Habit;
  updateStreak: () => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, updateStreak }) => {
  const today = new Date();
  const daysInRow = 7; // 7 days per row (1 week)
  const weeksToShow = 18; // Number of weeks to display (18 weeks = 126 days)

  const totalDays = daysInRow * weeksToShow;

  const days = Array.from({ length: totalDays }, (_, i) => {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    const dayString = day.toISOString().split("T")[0];
    return habit.days[dayString] ? "bg-yellow-300" : "bg-zinc-400";
  });

  // Split days into weeks
  const weeks = Array.from({ length: weeksToShow }, (_, i) =>
    days.slice(i * daysInRow, i * daysInRow + daysInRow).reverse(),
  );

  return (
    <Card className="bg-primary/90">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
            {habit.emoji}
          </div>
          <h3 className="text-lg font-semibold">{habit.name}</h3>
        </div>
        <Button
          onClick={updateStreak}
          variant="outline"
          size="icon"
          className="rounded-full"
        >
          +
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-18 gap-0.5">
          {weeks.reverse().map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col-reverse gap-0.5">
              {week.map((dayClass, dayIndex) => (
                <div
                  key={dayIndex}
                  className={`h-2 w-2 rounded-full ${dayClass}`}
                />
              ))}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <DateComponent habit={habit} />
        <Badge variant="default" className="text-xs">
          🔥 {habit.streak} days
        </Badge>
      </CardFooter>
    </Card>
  );
};

const DateComponent = ({ habit }: { habit: Habit }) => {
  const [showEndDate, setShowEndDate] = React.useState(false);

  return (
    <div
      onClick={() => setShowEndDate(!showEndDate)}
      className="cursor-pointer text-xs"
    >
      <motion.span
        key={showEndDate ? "endDate" : "remainingDays"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {habit.goalDays
          ? showEndDate
            ? calculateEndDate(habit)
            : `${calculateRemainingDays(habit)} days left`
          : "No goal set"}
      </motion.span>
    </div>
  );
};

export default HabitCard;
