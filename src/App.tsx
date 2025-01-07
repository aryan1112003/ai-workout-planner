/**
 * @file App.tsx
 * @copyright Copyright (c) 2025 Aryan Acharya
 * @license MIT
 */

import React, { useState } from 'react';
import { Dumbbell } from 'lucide-react';
import { WorkoutForm } from './components/WorkoutForm';
import { WorkoutPlan } from './components/WorkoutPlan';
import { generateWorkoutPlan } from './lib/gemini';
import { motion } from 'framer-motion';

export default function App() {
  const [workoutPlan, setWorkoutPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: {
    goal: string;
    fitnessLevel: string;
    timeAvailable: string;
    equipment: string[];
    location: string;
  }) => {
    try {
      setIsLoading(true);
      const plan = await generateWorkoutPlan(
        data.goal,
        data.fitnessLevel,
        data.timeAvailable,
        data.equipment,
        data.location
      );
      setWorkoutPlan(plan);
    } catch (error) {
      console.error('Error generating workout plan:', error);
      alert('Failed to generate workout plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Dumbbell className="w-12 h-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">AI Workout Planner</h1>
          </div>
          <p className="text-xl text-gray-600">
            Get personalized workout plans tailored to your goals and equipment
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <WorkoutForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>

            <div className="md:mt-0 mt-8">
              {workoutPlan && <WorkoutPlan plan={workoutPlan} />}
            </div>
          </div>
        </div>

        <footer className="mt-12 text-center text-gray-600 text-sm">
          <p>© 2025 Aryan Acharya. All rights reserved.</p>
          <p className="mt-1">
            <a 
              href="https://github.com/aryan1112003" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              GitHub: @aryan1112003
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}