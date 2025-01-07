/**
 * @file WorkoutForm.tsx
 * @copyright Copyright (c) 2025 Aryan Acharya
 * @license MIT
 */

import React, { useState } from 'react';
import { Dumbbell, Clock, Target, Package, MapPin } from 'lucide-react';

interface WorkoutFormProps {
  onSubmit: (data: {
    goal: string;
    fitnessLevel: string;
    timeAvailable: string;
    equipment: string[];
    location: string;
  }) => void;
  isLoading: boolean;
}

export function WorkoutForm({ onSubmit, isLoading }: WorkoutFormProps) {
  const [goal, setGoal] = useState('');
  const [fitnessLevel, setFitnessLevel] = useState('');
  const [timeAvailable, setTimeAvailable] = useState('');
  const [equipment, setEquipment] = useState<string[]>([]);
  const [location, setLocation] = useState('');

  const equipmentOptions = [
    'Dumbbells',
    'Barbell',
    'Resistance Bands',
    'Pull-up Bar',
    'Bench',
    'None (Bodyweight only)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ goal, fitnessLevel, timeAvailable, equipment, location });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      <div>
        <label className="flex items-center gap-2 text-lg font-medium mb-2">
          <Target className="w-5 h-5" />
          Fitness Goal
        </label>
        <select
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          required
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select a goal</option>
          <option value="Weight Loss">Weight Loss</option>
          <option value="Muscle Gain">Muscle Gain</option>
          <option value="Strength">Strength</option>
          <option value="Endurance">Endurance</option>
        </select>
      </div>

      <div>
        <label className="flex items-center gap-2 text-lg font-medium mb-2">
          <MapPin className="w-5 h-5" />
          Workout Location
        </label>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select location</option>
          <option value="Gym">Gym</option>
          <option value="Home">Home</option>
        </select>
      </div>

      <div>
        <label className="flex items-center gap-2 text-lg font-medium mb-2">
          <Dumbbell className="w-5 h-5" />
          Fitness Level
        </label>
        <select
          value={fitnessLevel}
          onChange={(e) => setFitnessLevel(e.target.value)}
          required
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select your level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      <div>
        <label className="flex items-center gap-2 text-lg font-medium mb-2">
          <Clock className="w-5 h-5" />
          Time Available
        </label>
        <select
          value={timeAvailable}
          onChange={(e) => setTimeAvailable(e.target.value)}
          required
          className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select time</option>
          <option value="15 minutes">15 minutes</option>
          <option value="30 minutes">30 minutes</option>
          <option value="45 minutes">45 minutes</option>
          <option value="60 minutes">60 minutes</option>
          <option value="90 minutes">90 minutes</option>
        </select>
      </div>

      <div>
        <label className="flex items-center gap-2 text-lg font-medium mb-2">
          <Package className="w-5 h-5" />
          Available Equipment
        </label>
        <div className="grid grid-cols-2 gap-2">
          {equipmentOptions.map((item) => (
            <label key={item} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={equipment.includes(item)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setEquipment([...equipment, item]);
                  } else {
                    setEquipment(equipment.filter((eq) => eq !== item));
                  }
                }}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-blue-400"
      >
        {isLoading ? 'Generating Plan...' : 'Generate Workout Plan'}
      </button>
    </form>
  );
}