"use client";

import { useState } from 'react';
import nations from "../data/nations.json";
import TeamGenerator from './components/TeamGenerator';
import RealisticName from './components/RealisticName';
import NameGenerator from './components/NameGenerator';

const nationsData = nations as Record<string, string>;

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<number>(1);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveSection(1)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeSection === 1
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Name Generator (User-Submitted)
            </button>
            <button
              onClick={() => setActiveSection(2)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeSection === 2
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Generate Realistic Name
            </button>
            <button
              onClick={() => setActiveSection(3)}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeSection === 3
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              National Team Generator
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="min-h-[calc(100vh-64px)]">
        {activeSection === 1 && (
          <NameGenerator nationsData={nationsData}/>
        )}

        {activeSection === 2 && (
          <RealisticName nationsData={nationsData}/>
        )}

        {activeSection === 3 && (
          <TeamGenerator nationsData={nationsData}/>
        )}
      </div>
    </div>
  );
}