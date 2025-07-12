"use server";

import { z } from "zod";
import { moderateContent } from "@/ai/flows/moderate-content";

const submissionSchema = z.object({
  text: z.string(),
});

export async function submitText(values: z.infer<typeof submissionSchema>) {
  const moderationResult = await moderateContent({ text: values.text });

  if (moderationResult.isOffensive) {
    return {
      success: false,
      message: `Your submission could not be accepted. Reason: ${moderationResult.reason}`,
    };
  }
  
  // In a real application, you would save the data to a database here.
  // For now, we just simulate a successful submission.

  return {
    success: true,
    message: "Your work has passed moderation and has been submitted!",
  };
}
