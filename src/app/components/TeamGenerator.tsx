import { GeneratedName, NationDataProp } from "@/interfaces";
import { realisticNameGenerator } from "@/utils/generic_name_gen";
import { useState } from "react";
import { generateName } from 'fifa-name-generator';
import AutocompleteInput from "./AutoCompleteInput";
import FlagNameCard from "./FlagNameCard";


export default function TeamGenerator({nationsData} : NationDataProp) {
  const [section3PrimaryNation, setSection3PrimaryNation] = useState('');
  const [section3DemographicRealistic, setSection3DemographicRealistic] = useState(false);
  const [section3GeneratedNames, setSection3GeneratedNames] = useState<GeneratedName[]>([]);
  const [section3Error, setSection3Error] = useState<string>('');

  const handleSection3Submit = (e: React.FormEvent) => {
      e.preventDefault();
      setSection3Error('');
      
      try {
        if (!section3PrimaryNation.trim()) {
          setSection3Error('Please select a primary nationality');
          return;
        }
  
        const names: GeneratedName[] = [];
        const nationalityCode = nationsData[section3PrimaryNation] || section3PrimaryNation;
        
        // Generate 11 names for the formation
        for (let i = 0; i < 11; i++) {
          if (section3DemographicRealistic) {
            names.push(realisticNameGenerator(nationalityCode));
          } else {
            const name = generateName(nationalityCode);
            names.push({
              name,
              nationality: section3PrimaryNation
            });
          }
        }
        
        setSection3GeneratedNames(names);
      } catch (err) {
        setSection3Error(err instanceof Error ? err.message : 'An error occurred while generating names');
      }
    };

    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Generate Team</h2>

          {section3Error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-red-800">{section3Error}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSection3Error('')}
                  className="ml-3 flex-shrink-0 text-red-400 hover:text-red-600"
                >
                  <span className="sr-only">Dismiss</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSection3Submit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Nationality
                </label>
                <AutocompleteInput
                  value={section3PrimaryNation}
                  onChange={setSection3PrimaryNation}
                  placeholder="Select nation..."
                />
              </div>

              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={section3DemographicRealistic}
                    onChange={(e) => setSection3DemographicRealistic(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 text-gray-900"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Demographic-Realistic Generation
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Formation Section */}
        {section3GeneratedNames.length > 0 && (
          <div className="bg-gradient-to-b from-green-600 to-green-700 rounded-lg p-8 min-h-[600px] relative">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white"></div>
              <div className="absolute top-0 left-1/2 w-0.5 h-full bg-white"></div>
            </div>
            
            {/* Goalkeeper */}
            <div className="flex justify-center mb-12">
              <div className="w-70">
                <FlagNameCard {...section3GeneratedNames[0]} />
              </div>
            </div>

            {/* Defenders (4) */}
            <div className="flex justify-center gap-4 mb-12">
              {section3GeneratedNames.slice(1, 5).map((nameData, index) => (
                <div key={index} className="w-56">
                  <FlagNameCard {...nameData} />
                </div>
              ))}
            </div>

            {/* Midfielders (3) */}
            <div className="flex justify-center gap-8 mb-12">
              {section3GeneratedNames.slice(5, 8).map((nameData, index) => (
                <div key={index} className="w-56">
                  <FlagNameCard {...nameData} />
                </div>
              ))}
            </div>

            {/* Forwards (3) */}
            <div className="flex justify-center gap-8">
              {section3GeneratedNames.slice(8, 11).map((nameData, index) => (
                <div key={index} className="w-56">
                  <FlagNameCard {...nameData} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
}