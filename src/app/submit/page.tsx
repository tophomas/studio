"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { submitText } from "./actions";
import { Loader2 } from "lucide-react";

const submissionSchema = z.object({
  text: z.string().min(20, "Your text must be at least 20 characters long.").max(2000, "Your text cannot exceed 2000 characters."),
  author: z.string().optional(),
  isAnonymous: z.boolean().default(false),
  theme: z.enum(['Nature', 'Urban', 'Science', 'Fantasy', 'Love', 'Sci-Fi'], { required_error: "Please select a theme." }),
  type: z.enum(['Poem', 'Short Story'], { required_error: "Please select a writing type." }),
  tags: z.string().optional(),
}).refine(data => !data.isAnonymous ? !!data.author && data.author.length > 0 : true, {
  message: "Author name is required unless submitting anonymously.",
  path: ["author"],
});

export default function SubmitPage() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof submissionSchema>>({
    resolver: zodResolver(submissionSchema),
    defaultValues: {
      text: "",
      author: "",
      isAnonymous: false,
      tags: "",
    },
  });

  async function onSubmit(values: z.infer<typeof submissionSchema>) {
    startTransition(async () => {
      const result = await submitText(values);
      if (result.success) {
        toast({
          title: "Submission Successful",
          description: result.message,
        });
        form.reset();
      } else {
        toast({
          variant: "destructive",
          title: "Moderation Failed",
          description: result.message,
        });
      }
    });
  }

  const isAnonymous = form.watch("isAnonymous");

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-4xl font-headline tracking-tight">Share Your Work</CardTitle>
          <CardDescription className="mt-2 text-lg">
            Let your creativity flow. Submit your poem or short story to the community.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Your Text</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Once upon a time, in a land of code and coffee..."
                        rows={12}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This is where your masterpiece goes.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isAnonymous"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Submit Anonymously</FormLabel>
                      <FormDescription>
                        If checked, your name will not be displayed with the submission.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {!isAnonymous && (
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Author Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your pen name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="theme"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Theme</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a theme" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Nature">Nature</SelectItem>
                          <SelectItem value="Urban">Urban</SelectItem>
                          <SelectItem value="Science">Science</SelectItem>
                          <SelectItem value="Fantasy">Fantasy</SelectItem>
                          <SelectItem value="Love">Love</SelectItem>
                          <SelectItem value="Sci-Fi">Sci-Fi</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg">Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a writing type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Poem">Poem</SelectItem>
                          <SelectItem value="Short Story">Short Story</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="tags"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Tags (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. surrealism, haiku, existential" {...field} />
                    </FormControl>
                    <FormDescription>
                      Comma-separated tags to help others find your work.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="text-center pt-4">
                <Button type="submit" size="lg" disabled={isPending}>
                  {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Submit for Moderation
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
