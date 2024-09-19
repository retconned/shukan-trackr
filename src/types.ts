export interface Habit {
  name: string;
  streak: number;
  days: Record<string, boolean>;
  emoji: string; // Add this line
  goalDays?: number; // Optional field to store the goal in days, no need for null here
  startDate: string; // The date when the habit was created
}

export type HabitTrackerViewMode = "list" | "weekly" | "minimal";
