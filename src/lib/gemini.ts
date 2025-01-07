/**
 * @file gemini.ts
 * @copyright Copyright (c) 2024 Aryan Acharya
 * @license MIT
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function generateWorkoutPlan(
  goal: string,
  fitnessLevel: string,
  timeAvailable: string,
  equipment: string[],
  location: string
): Promise<string> {
  const prompt = `Create a detailed workout plan with the following parameters:
    Goal: ${goal}
    Location: ${location}
    Fitness Level: ${fitnessLevel}
    Time Available: ${timeAvailable}
    Equipment Available: ${equipment.join(', ')}

    Please provide a structured response with:
    1. Warm-up (2-3 exercises)
    2. Main workout:
       - List each exercise
       - Include sets and reps
       - Rest periods between sets
       - Use normal text without asterisks or special formatting
    3. Cool-down (2-3 stretches)
    4. Total workout duration
    5. Notes on proper form and technique

    Important: 
    - Provide the response in plain text without any asterisks or markdown formatting
    - If location is 'Gym', include machine exercises where appropriate
    - Keep exercise descriptions clear and concise`;

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}