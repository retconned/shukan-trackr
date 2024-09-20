import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import HabitInput from "@/components/HabitInput";
import EmojiSelect from "@/components/EmojiSelect";

interface AddHabitDrawerProps {
  addHabit: (name: string, emoji: string, goalDays?: number) => void;
}

const AddHabitDrawer: React.FC<
  AddHabitDrawerProps & { children?: React.ReactNode }
> = ({ addHabit, children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [newHabit, setNewHabit] = useState("");
  const [selectedEmoji, setSelectedEmoji] = useState<string>("");
  const [goalDays, setGoalDays] = useState<number | undefined>(undefined);

  const handleAddHabit = () => {
    if (newHabit.trim()) {
      addHabit(newHabit, selectedEmoji, goalDays);
      setNewHabit("");
      setSelectedEmoji("");
      setGoalDays(undefined);
      setOpen(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {children || <Button variant="outline">Add habit</Button>}
      </DrawerTrigger>
      <DrawerContent className="h-[520px] max-h-[80vh]">
        <div className="mx-auto w-full max-w-sm justify-center pt-10">
          <DrawerHeader>
            <DrawerTitle>Add New Habit</DrawerTitle>
            <DrawerDescription>Create a new habit to track.</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex flex-col space-y-4">
              <HabitInput
                label="Habit Name"
                id="habit-name"
                value={newHabit}
                onChange={(e) => setNewHabit(e.target.value)}
                placeholder="Enter a habit"
              />
              <HabitInput
                label="Goal (days)"
                id="goal-days"
                type="number"
                value={goalDays?.toString() || ""}
                onChange={(e) => setGoalDays(Number(e.target.value))}
                placeholder="Set a day goal (optional)"
              />
              <EmojiSelect
                value={selectedEmoji}
                onValueChange={setSelectedEmoji}
              />
            </div>
          </div>
          <DrawerFooter>
            <Button onClick={handleAddHabit}>Add Habit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default AddHabitDrawer;
