"use client";

import { Hand, Pause, Play, Podcast } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

interface ChantControllerProps {
  mode: "manual" | "auto";
  setMode: (mode: "manual" | "auto") => void;
  onManualTap: () => void;
  onAutoToggle: () => void;
  isAutoChanting: boolean;
  chantText: string;
  setChantText: (text: string) => void;
  chantSpeed: number;
  setChantSpeed: (speed: number) => void;
}

const ChantController = ({
  mode,
  setMode,
  onManualTap,
  onAutoToggle,
  isAutoChanting,
  chantText,
  setChantText,
  chantSpeed,
  setChantSpeed,
}: ChantControllerProps) => {
  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="text-center font-headline text-2xl">Chant Control</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs
          value={mode}
          onValueChange={(value) => setMode(value as "manual" | "auto")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="manual"><Hand className="mr-2 h-4 w-4"/>Manual</TabsTrigger>
            <TabsTrigger value="auto"><Podcast className="mr-2 h-4 w-4"/>Auto</TabsTrigger>
          </TabsList>
          <TabsContent value="manual" className="mt-6">
            <div className="flex flex-col items-center justify-center space-y-4">
              <p className="text-center text-muted-foreground">
                Tap the button to count your chant.
              </p>
              <Button
                onClick={onManualTap}
                className="w-48 h-48 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl transition-transform duration-200 active:scale-95"
                aria-label="Manual Chant Tap"
              >
                <Hand className="h-24 w-24" />
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="auto" className="mt-6 space-y-6">
             <div className="flex flex-col items-center justify-center space-y-4">
                <Button
                    onClick={onAutoToggle}
                    className="w-48 h-48 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl transition-transform duration-200 active:scale-95"
                    aria-label={isAutoChanting ? "Pause Auto Chant" : "Start Auto Chant"}
                >
                    {isAutoChanting ? (
                    <Pause className="h-24 w-24" />
                    ) : (
                    <Play className="h-24 w-24" />
                    )}
                </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="chant-text">Chant Text</Label>
              <Input
                id="chant-text"
                value={chantText}
                onChange={(e) => setChantText(e.target.value)}
                disabled={isAutoChanting}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="chant-speed">Chant Speed</Label>
              <Slider
                id="chant-speed"
                min={0}
                max={100}
                step={1}
                value={[chantSpeed]}
                onValueChange={(value) => setChantSpeed(value[0])}
                disabled={isAutoChanting}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Slower</span>
                <span>Faster</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ChantController;
