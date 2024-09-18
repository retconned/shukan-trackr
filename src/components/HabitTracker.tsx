import { useState, useEffect } from "react";
import { Habit } from "../types";
import { getRandomEmoji } from "@/lib/utils";
import HabitCard from "@/components/HabitCard";

import PWAInstallDrawer from "@/components/drawers/PWAInstaller";
import BottomBar from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import WeeklyHabitView from "@/components/WeeklyCard";
import { Grip, GripHorizontal } from "lucide-react";

const HabitTracker: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const storedHabits = localStorage.getItem("habits");
    return storedHabits ? JSON.parse(storedHabits) : [];
  });

  const [viewMode, setViewMode] = useState<"list" | "weekly">("list");

  useEffect(() => {
    const storedHabits = localStorage.getItem("habits");
    if (storedHabits) {
      setHabits(JSON.parse(storedHabits));
    }

    const storedViewMode = localStorage.getItem("viewMode");
    if (storedViewMode) {
      setViewMode(storedViewMode as "list" | "weekly");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  const addHabit = (name: string, emoji: string, goalDays?: number) => {
    const startDate = new Date().toISOString().split("T")[0];
    setHabits([
      ...habits,
      {
        name,
        streak: 0,
        days: {},
        emoji: emoji || getRandomEmoji(),
        goalDays,
        startDate,
      },
    ]);

    console.log("Adding habit:", name, emoji, goalDays);
  };

  const updateStreak = (index: number) => {
    const today = new Date().toISOString().split("T")[0];
    const updatedHabits = [...habits];
    const habit = updatedHabits[index];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split("T")[0];

    if (!habit.days[today]) {
      if (!habit.days[yesterdayString] && habit.streak > 0) {
        habit.streak = 0;
      }
      habit.streak += 1;
      habit.days[today] = true;
      setHabits(updatedHabits);
    }
  };

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === "list" ? "weekly" : "list"));
  };

  return (
    <div className="mx-auto max-w-md p-4">
      <Header />

      <div className="flex flex-row items-center justify-start px-2">
        <Button onClick={toggleViewMode} className="mb-4">
          {viewMode === "list" ? <GripHorizontal /> : <Grip />}
        </Button>
      </div>

      <BottomBar addHabit={addHabit} />
      <HabitList
        viewMode={viewMode}
        habits={habits}
        updateStreak={updateStreak}
      />
    </div>
  );
};

const Header: React.FC = () => (
  <div className="flex w-full flex-row items-center justify-between p-2">
    <h1 className="text-2xl font-bold">Habit Tracker</h1>
    <PWAInstallDrawer />
  </div>
);

const HabitList: React.FC<{
  habits: Habit[];
  viewMode: "list" | "weekly";
  updateStreak: (index: number) => void;
}> = ({ habits, updateStreak, viewMode }) => (
  <ul className="flex flex-col gap-4">
    {viewMode === "list" ? (
      habits.map((habit, index) => (
        <li key={index} className="flex flex-col gap-4 p-2">
          <HabitCard habit={habit} updateStreak={() => updateStreak(index)} />
        </li>
      ))
    ) : (
      <div className="flex flex-col gap-4 p-2">
        {habits.map((habit, index) => (
          <WeeklyHabitView
            key={index}
            habit={habit}
            updateStreak={() => updateStreak(index)}
          />
        ))}
      </div>
    )}
  </ul>
);

export default HabitTracker;
