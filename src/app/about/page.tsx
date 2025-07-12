import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <Card className="overflow-hidden">
        <CardHeader className="text-center p-8">
          <CardTitle className="text-4xl font-headline tracking-tight">About PoéticaMente</CardTitle>
          <p className="text-muted-foreground mt-2">The intersection of art, mathematics, and expression.</p>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <div className="relative w-full h-64 rounded-lg overflow-hidden mb-8">
            <Image 
              src="https://placehold.co/800x400.png"
              alt="Abstract art representing creativity"
              layout="fill"
              objectFit="cover"
              data-ai-hint="creativity abstract"
            />
          </div>
          <div className="space-y-6 text-lg text-foreground/80">
            <p>
              PoéticaMente was born from a desire to create a unique space where the rigid logic of mathematics and the fluid world of poetry can coexist and inspire one another. We believe that creativity is not confined to a single discipline, but thrives at the crossroads of different fields of knowledge.
            </p>
            <p>
              Our project aims to provide a platform for writers, poets, thinkers, and creators to share their work, find inspiration in unexpected places, and connect with a community that values both intellectual and artistic pursuits.
            </p>
            <h3 className="text-2xl font-headline font-semibold text-foreground pt-4">Our Objectives</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>To foster a community of creative individuals who appreciate the beauty in both art and science.</li>
              <li>To provide a safe and moderated platform for sharing short texts and poems.</li>
              <li>To challenge our users to think differently and find the poetry in numbers and the structure in verse.</li>
              <li>To champion the idea that all forms of human creativity are interconnected and valuable.</li>
            </ul>
            <p>
              Whether you are a seasoned poet, a curious mathematician, or simply someone who loves to explore new ideas, we welcome you to PoéticaMente. Share your voice, take on a challenge, and discover the art that lies in the heart of the mind.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
