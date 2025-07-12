"use client"

import { useTheme } from "next-themes";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Moon, Sun, Palette, Eye } from "lucide-react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Settings</CardTitle>
          <CardDescription>Manage your preferences and personalize your experience.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Appearance
            </h3>
            <RadioGroup value={theme} onValueChange={setTheme} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <RadioGroupItem value="light" id="light" className="peer sr-only" />
                <Label
                  htmlFor="light"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Sun className="mb-3 h-6 w-6" />
                  Light
                </Label>
              </div>
              <div>
                <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
                <Label
                  htmlFor="dark"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Moon className="mb-3 h-6 w-6" />
                  Dark
                </Label>
              </div>
              <div>
                <RadioGroupItem value="system" id="system" className="peer sr-only" />
                <Label
                  htmlFor="system"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                >
                  <Palette className="mb-3 h-6 w-6" />
                  System
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Content Rating
            </h3>
            <RadioGroup defaultValue="show-all" className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="show-all" id="r1" />
                <Label htmlFor="r1">Show all content</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="hide-mature" id="r2" />
                <Label htmlFor="r2">Hide content rated as mature</Label>
              </div>
            </RadioGroup>
             <p className="text-sm text-muted-foreground">
              This setting will be implemented in a future update.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
