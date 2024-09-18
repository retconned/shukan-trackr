import React from "react";
import { Habit } from "../types";

interface ContributionGraphProps {
  habit: Habit;
}

const ContributionGraph: React.FC<ContributionGraphProps> = ({ habit }) => {
  const today = new Date();
  const daysInRow = 64; // Number of days per row (7 for a week)

  // Fill the array with the last 30 days, including today
  const days = Array.from({ length: daysInRow }, (_, i) => {
    const day = new Date(today);
    day.setDate(today.getDate() - i);
    const dayString = day.toISOString().split("T")[0];
    return habit.days[dayString] ? "bg-green-500" : "bg-gray-200";
  });

  return (
    <div className="grid-cols-16 grid gap-1">
      {days.reverse().map((dayClass, index) => (
        <div
          key={index}
          role="gridcell"
          className={`h-4 w-4 ${dayClass}`}
          title={`Day ${index + 1}`}
        >
          {index}
        </div>
      ))}
    </div>
  );
};

export default ContributionGraph;
