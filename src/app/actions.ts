"use server";

import {
  customizeChantAudioStyle,
  CustomizeChantAudioStyleInput,
} from "@/ai/flows/customize-chant-audio-style";

export async function getCustomVoice(input: CustomizeChantAudioStyleInput) {
  try {
    const result = await customizeChantAudioStyle(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error in getCustomVoice server action:", error);
    
    let errorMessage = "An unknown error occurred.";
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    
    return { success: false, error: `Failed to generate voice style: ${errorMessage}` };
  }
}
