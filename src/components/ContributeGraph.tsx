import React from "react";
import { Habit } from "../types";

interface Props {
  habit: Habit;
}

const ContributionGraph: React.FC<Props> = ({ habit }) => {
  const today = new Date();
  const daysInYear = 365;

  const getDayClass = (dateString: string) => {
    const isActive = habit.days[dateString];
    return isActive ? "bg-green-500" : "bg-gray-200";
  };

  return (
    <div className="mt-4 grid grid-cols-7 gap-1">
      {Array.from({ length: daysInYear }).map((_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateString = date.toISOString().split("T")[0];

        return (
          <div
            key={dateString}
            className={`h-4 w-4 ${getDayClass(dateString)}`}
          />
        );
      })}
    </div>
  );
};

export default ContributionGraph;
