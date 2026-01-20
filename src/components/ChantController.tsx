
"use client";

import { Hand, Pause, Play, Podcast } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ChantControllerProps {
  mode: "manual" | "auto";
  setMode: (mode: "manual" | "auto") => void;
  onManualTap: any;
  onAutoToggle: () => void;
  isAutoChanting: boolean;
}

const ChantController = ({
  mode,
  setMode,
  onManualTap,
  onAutoToggle,
  isAutoChanting,
}: ChantControllerProps) => {

  return (
    <div className="w-full flex flex-col items-center gap-4 mt-4">
        <Tabs
            value={mode}
            onValueChange={(value) => setMode(value as "manual" | "auto")}
            className="w-full max-w-xs"
        >
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="manual"><Hand className="mr-2 h-4 w-4"/>Manual</TabsTrigger>
                <TabsTrigger value="auto"><Podcast className="mr-2 h-4 w-4"/>Auto</TabsTrigger>
            </TabsList>
        </Tabs>

        {mode === "manual" ? (
            <Button
                onClick={onManualTap}
                className="w-24 h-24 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-transform duration-200 active:scale-95"
                aria-label="Manual Chant Tap"
            >
                <Hand className="h-10 w-10" />
            </Button>
        ) : (
             <Button
                onClick={onAutoToggle}
                className="w-24 h-24 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-transform duration-200 active:scale-95"
                aria-label={isAutoChanting ? "Pause Auto Chant" : "Start Auto Chant"}
            >
                {isAutoChanting ? (
                <Pause className="h-10 w-10" />
                ) : (
                <Play className="h-10 w-10" />
                )}
            </Button>
        )}
    </div>
  );
};

export default ChantController;

    