import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { BarChart, Plus } from "lucide-react";
import AddHabitDrawer from "@/components/drawers/AddHabit";
import SettingsDrawer from "@/components/drawers/Settings";

interface BottomBarProps {
  addHabit: (name: string, emoji: string, goalDays?: number) => void;
  startDay: string;
  setStartDay: (day: string) => void;
}

const DrawerTemplate: React.FC<{
  title: string;
  description: string;
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}> = ({ title, description, children, open, onOpenChange }) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[60vh] max-h-[60vh] min-h-[60vh]">
        <div className="mx-auto w-full max-w-sm justify-center pt-10">
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">{children}</div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const BottomBar: React.FC<BottomBarProps> = ({
  addHabit,
  startDay,
  setStartDay,
}) => {
  const [openDrawer, setOpenDrawer] = useState<
    "settings" | "statistics" | null
  >(null);

  return (
    <div className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t bg-background px-4 pb-7 pt-4">
      <SettingsDrawer startDay={startDay} setStartDay={setStartDay} />
      <div className="relative flex flex-1 justify-center">
        <AddHabitDrawer addHabit={addHabit}>
          <Button className="absolute -top-7 mb-4 h-14 w-14 rounded-xl shadow-lg">
            <Plus className="h-6 w-6" />
          </Button>
        </AddHabitDrawer>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpenDrawer("statistics")}
      >
        <BarChart className="h-6 w-6" />
      </Button>
      <DrawerTemplate
        title="Statistics"
        description="View your habit statistics."
        open={openDrawer === "statistics"}
        onOpenChange={(open) => setOpenDrawer(open ? "statistics" : null)}
      >
        Add your statistics content here
        <div>Statistics content goes here</div>
      </DrawerTemplate>
    </div>
  );
};

export default BottomBar;
