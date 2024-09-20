import { useState, useEffect } from "react";
import { Habit, HabitTrackerViewMode } from "../types";
import { getRandomEmoji } from "@/lib/utils";
import HabitCard from "@/components/HabitCard";

import PWAInstallDrawer from "@/components/drawers/PWAInstaller";
import BottomBar from "@/components/BottomNav";
import WeeklyHabitView from "@/components/WeeklyCard";
import { Ellipsis, Grip, GripHorizontal } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MinimalCard from "@/components/MinimalCard";

const HabitTracker: React.FC = () => {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const storedHabits = localStorage.getItem("habits");
    return storedHabits ? JSON.parse(storedHabits) : [];
  });

  const [viewMode, setViewMode] = useState<string>(() => {
    const storedViewMode = localStorage.getItem("viewMode");
    return storedViewMode ? storedViewMode : "list";
  });

  const [startDay, setStartDay] = useState<string>(() => {
    const storedStartDay = localStorage.getItem("startDay");
    return storedStartDay || "sunday";
  });

  useEffect(() => {
    const storedHabits = localStorage.getItem("habits");
    if (storedHabits) {
      setHabits(JSON.parse(storedHabits));
    }

    const storedViewMode = localStorage.getItem("viewMode");
    if (storedViewMode) {
      setViewMode(storedViewMode as HabitTrackerViewMode);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  useEffect(() => {
    localStorage.setItem("startDay", startDay);
  }, [startDay]);

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

  return (
    <div className="mx-auto max-w-md p-4 md:max-w-xl">
      <Header />
      <Tabs
        defaultValue={viewMode}
        value={viewMode}
        onValueChange={(value) => setViewMode(value as HabitTrackerViewMode)}
        className="mb-4 w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="list">
            <Grip className="mr-2 h-4 w-4" />
            Default
          </TabsTrigger>
          <TabsTrigger value="weekly">
            <GripHorizontal className="mr-2 h-4 w-4" />
            Weekly
          </TabsTrigger>
          <TabsTrigger value="minimal">
            <Ellipsis className="mr-2 h-4 w-4" />
            Minimal
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <BottomBar
        addHabit={addHabit}
        startDay={startDay}
        setStartDay={setStartDay}
      />
      <HabitList
        viewMode={viewMode}
        habits={habits}
        updateStreak={updateStreak}
        startDay={startDay}
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
  viewMode: string;
  updateStreak: (index: number) => void;
  startDay: string;
}> = ({ habits, updateStreak, viewMode, startDay }) => {
  if (viewMode === "minimal") {
    return (
      <div className="flex flex-col space-y-2">
        {habits.map((habit, index) => (
          <MinimalCard
            key={index}
            habit={habit}
            startDay={startDay}
            updateStreak={() => updateStreak(index)}
          />
        ))}
      </div>
    );
  }

  return (
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
              startDay={startDay}
            />
          ))}
        </div>
      )}
    </ul>
  );
};

export default HabitTracker;
