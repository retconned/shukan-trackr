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
    <div className="grid grid-cols-7 gap-1 mt-4">
      {Array.from({ length: daysInYear }).map((_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateString = date.toISOString().split("T")[0];

        return (
          <div
            key={dateString}
            className={`w-4 h-4 ${getDayClass(dateString)}`}
          />
        );
      })}
    </div>
  );
};

export default ContributionGraph;
