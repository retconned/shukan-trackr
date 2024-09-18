import { useState } from "react";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/components/theme-provider";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const ThemeDrawer: React.FC = () => {
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const { setTheme, theme } = useTheme();

  return (
    <Drawer open={showSettings} onOpenChange={setShowSettings}>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Settings />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <VisuallyHidden>
          <DrawerTitle>Theme switcher</DrawerTitle>
          <DrawerDescription>Switches themes.</DrawerDescription>
        </VisuallyHidden>

        <div className="mx-auto min-h-[600px] w-full max-w-sm">
          <Card className="m-4">
            <div className="items flex flex-col justify-center gap-2 p-4">
              <p className="text-center">Theme switcher</p>
              {["system", "dark", "light"].map((t) => (
                <Button
                  key={t}
                  disabled={theme === t}
                  variant="outline"
                  onClick={() => setTheme(t as "system" | "dark" | "light")}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </Button>
              ))}
            </div>
          </Card>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button className="static" variant="outline">
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ThemeDrawer;
