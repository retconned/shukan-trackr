import { useState, useEffect } from "react";
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

import { Download } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PWAInstallDrawer: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === "accepted") {
        setDeferredPrompt(null);
      }
    }
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Download />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[60vh] max-h-[60vh]">
        <div className="flex h-full flex-col p-6">
          <DrawerHeader>
            <DrawerTitle>Install PWA App</DrawerTitle>
            <DrawerDescription>
              Follow the instructions below to install the PWA app on your
              device.
            </DrawerDescription>
          </DrawerHeader>
          <Tabs defaultValue="ios" className="flex-grow">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="ios">iOS</TabsTrigger>
              <TabsTrigger value="android">Android</TabsTrigger>
            </TabsList>
            <div className="mt-4 h-[calc(100%-40px)] overflow-y-auto">
              <TabsContent value="ios">
                <div className="space-y-2">
                  <p>1. Open the app in Safari.</p>
                  <p>2. Tap the Share button at the bottom of the screen.</p>
                  <p>3. Scroll down and tap "Add to Home Screen".</p>
                  <p>4. Give the app a name and tap "Add".</p>
                </div>
              </TabsContent>
              <TabsContent value="android">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p>1. Open the app in Chrome.</p>
                    <p>2. Tap the three-dot menu in the top-right corner.</p>
                    <p>3. Tap "Add to Home screen".</p>
                    <p>4. Tap "Add" when prompted.</p>
                  </div>
                  <Button onClick={handleInstallClick} className="w-full">
                    Install Habit Tracker PWA
                  </Button>
                </div>
              </TabsContent>
            </div>
          </Tabs>
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

export default PWAInstallDrawer;
