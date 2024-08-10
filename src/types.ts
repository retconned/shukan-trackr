export interface Habit {
  name: string;
  streak: number;
  days: Record<string, boolean>;
}
