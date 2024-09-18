import React from "react";
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
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Switch } from "@/components/ui/switch";

const SettingsDrawer: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-6 w-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[60vh] max-h-[60vh] min-h-[60vh]">
        <DrawerHeader>
          <DrawerTitle>Settings</DrawerTitle>
          <DrawerDescription>Customize your app experience</DrawerDescription>
        </DrawerHeader>
        <div className="space-y-6 p-4">
          <div className="flex w-full flex-col items-center justify-around space-y-4">
            <div className="flex w-full flex-row items-center justify-between space-x-2">
              <div className="flex flex-row items-center space-x-2">
                <span>Dark Mode</span>
              </div>
              <Switch
                checked={theme === "dark"}
                onCheckedChange={(checked) =>
                  setTheme(checked ? "dark" : "light")
                }
              />
            </div>
            {/* <div className="flex w-full flex-row items-center justify-between">
              <span>Notifications</span>
              <Switch />
            </div>
            <div className="flex w-full flex-row items-center justify-between">
              <span>Sound Effects</span>
              <Switch />
            </div>
            <div className="flex w-full flex-row items-center justify-between">
              <span>Weekly Summary</span>
              <Switch />
            </div> */}
          </div>

          {/* Mock content for other settings */}
          <div className="space-y-4"></div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SettingsDrawer;
