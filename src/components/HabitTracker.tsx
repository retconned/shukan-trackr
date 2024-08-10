import React, { useState, useEffect } from "react";
import { Habit } from "../types";
import ContributionGraph from "./ContributeGraph";

const HabitTracker: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const storedHabits = localStorage.getItem("habits");
    return storedHabits ? JSON.parse(storedHabits) : [];
  });
  const [newHabit, setNewHabit] = useState("");

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  const addHabit = () => {
    if (newHabit.trim()) {
      setHabits([...habits, { name: newHabit, streak: 0, days: {} }]);
      setNewHabit("");
    }
  };

  const updateStreak = (index: number) => {
    const today = new Date().toISOString().split("T")[0];
    const updatedHabits = [...habits];
    const habit = updatedHabits[index];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split("T")[0];

    if (!habit.days[today]) {
      // Check if yesterday was completed to maintain the streak
      if (!habit.days[yesterdayString] && habit.streak > 0) {
        habit.streak = 0; // Reset streak if yesterday was missed
      }

      habit.streak += 1;
      habit.days[today] = true;
      setHabits(updatedHabits);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Habit Tracker</h1>
      <div className="mb-4">
        <input
          type="text"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Enter a habit"
          className="border rounded p-2 w-full"
        />
        <button
          onClick={addHabit}
          className="mt-2 bg-blue-500 text-white p-2 rounded w-full"
        >
          Add Habit
        </button>
      </div>
      <ul>
        {habits.map((habit, index) => (
          <li key={index} className="mb-6">
            <div
              className="flex justify-between items-center border-b py-2 cursor-pointer"
              onClick={() => updateStreak(index)}
            >
              <span>{habit.name}</span>
              <span className="flex items-center">
                {habit.streak > 0 && (
                  <span className="mr-2">🔥 {habit.streak}</span>
                )}
              </span>
            </div>
            <ContributionGraph habit={habit} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HabitTracker;
