import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ChallengesPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <Card>
        <CardHeader className="text-center p-8">
          <CardTitle className="text-4xl font-headline tracking-tight">Creative Challenges</CardTitle>
          <CardDescription className="mt-2 text-lg">
            Merge logic and language. Find the poetry in the abstract.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-0 space-y-8">
          <Alert>
            <Info className="h-4 w-4" />
            <AlertTitle className="font-headline">Challenge: The Golden Ratio</AlertTitle>
            <AlertDescription>
              Write a short text or poem inspired by the Golden Ratio (approximately 1.618). Explore its presence in nature, art, or its philosophical implications. How can you embed this mathematical concept into the structure or theme of your writing?
            </AlertDescription>
          </Alert>

          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="challenge-text" className="text-lg">Your Text</Label>
              <Textarea
                id="challenge-text"
                placeholder="Compose your response to the challenge here..."
                rows={10}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mathematical-relationship" className="text-lg">Mathematical Relationship</Label>
              <Textarea
                id="mathematical-relationship"
                placeholder="Explain how your text relates to the mathematical concept..."
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image-upload" className="text-lg">Optional Image</Label>
              <Input id="image-upload" type="file" />
              <p className="text-sm text-muted-foreground">
                You can upload an image that complements your submission.
              </p>
            </div>
            
            <div className="text-center pt-4">
              <Button type="submit" size="lg">Submit to Jury</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
