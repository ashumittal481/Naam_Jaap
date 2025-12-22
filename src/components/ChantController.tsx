
"use client";

import { Hand, Pause, Play, Podcast } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import type { AudioSource } from "@/app/page";
import ChantAnimator from "./ChantAnimator";
import { cn } from "@/lib/utils";


interface ChantControllerProps {
  count: number;
  malas: number;
  isCelebrating: boolean;
  chantAnimationKey: number;
  mode: "manual" | "auto";
  setMode: (mode: "manual" | "auto") => void;
  onManualTap: () => void;
  onAutoToggle: () => void;
  isAutoChanting: boolean;
  chantText: string;
  setChantText: (text: string) => void;
  chantSpeed: number;
  setChantSpeed: (speed: number) => void;
  audioSource: AudioSource;
}

const ChantController = ({
  count,
  malas,
  isCelebrating,
  chantAnimationKey,
  mode,
  setMode,
  onManualTap,
  onAutoToggle,
  isAutoChanting,
  chantText,
  setChantText,
  chantSpeed,
  setChantSpeed,
  audioSource
}: ChantControllerProps) => {
  const isCustomAudio = audioSource === 'custom';

  return (
    <Card className="w-full shadow-md overflow-hidden">
      {/* Counter Display Section */}
      <div className="relative bg-card border-b border-border">
          {isCelebrating && (
            <div
              className="pointer-events-none absolute inset-0 z-10 origin-center animate-ripple-glow rounded-lg"
              style={{
                background:
                  "radial-gradient(circle, hsl(var(--accent) / 0.5) 0%, hsl(var(--accent) / 0) 70%)",
              }}
            />
          )}
          <div className="relative z-0 p-6 flex flex-col items-center justify-center">
            <div className="grid grid-cols-2 gap-4 w-full text-center mb-4">
                <div>
                    <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                        Malas
                    </p>
                    <p className="font-headline text-4xl font-bold text-accent">
                        {malas}
                    </p>
                </div>
                <div>
                    <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                        Total
                    </p>
                    <p className="font-headline text-4xl font-bold text-accent">
                        {108*malas + count}
                    </p>
                </div>
            </div>

            <div className="w-full h-32 bg-background/50 rounded-lg shadow-inner flex items-center justify-center overflow-hidden border border-primary/10 relative">
              <div
                key={count}
                className="animate-count-up font-mono text-8xl font-bold text-foreground"
              >
                {String(count).padStart(3, "0")}
              </div>
              <ChantAnimator text={chantText} animationKey={chantAnimationKey} />
            </div>
          </div>
      </div>
      
      {/* Controls Section */}
      <CardContent className="p-6">
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
              <p className="text-center text-sm text-muted-foreground">
                Tap the button to count your chant.
              </p>
              <Button
                onClick={onManualTap}
                className="w-40 h-40 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl transition-transform duration-200 active:scale-95"
                aria-label="Manual Chant Tap"
              >
                <Hand className="h-20 w-20" />
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="auto" className="mt-6 space-y-6">
             <div className="flex flex-col items-center justify-center space-y-4">
                <Button
                    onClick={onAutoToggle}
                    className="w-40 h-40 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl transition-transform duration-200 active:scale-95"
                    aria-label={isAutoChanting ? "Pause Auto Chant" : "Start Auto Chant"}
                >
                    {isAutoChanting ? (
                    <Pause className="h-20 w-20" />
                    ) : (
                    <Play className="h-20 w-20" />
                    )}
                </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="chant-text">Chant Text</Label>
              <Input
                id="chant-text"
                value={chantText}
                onChange={(e) => setChantText(e.target.value)}
                disabled={isAutoChanting || isCustomAudio}
                placeholder={isCustomAudio ? "Plays uploaded/recorded audio" : "e.g. Om"}
              />
               {isCustomAudio && <p className="text-xs text-muted-foreground">Chant text is disabled when using a custom audio source.</p>}
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
