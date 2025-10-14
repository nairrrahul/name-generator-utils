import { GeneratedName, NationDataProp } from "@/interfaces";
import { useState } from "react";
import { realisticNameGenerator } from "@/utils/generic_name_gen";
import NameCard from "./NameCard";
import AutocompleteInput from "./AutoCompleteInput";


export default function RealisticName({nationsData} : NationDataProp) {
  const [section2PrimaryNation, setSection2PrimaryNation] = useState('');
  const [section2NumNames, setSection2NumNames] = useState(1);
  const [section2GeneratedNames, setSection2GeneratedNames] = useState<GeneratedName[]>([]);
  const [section2Error, setSection2Error] = useState<string>('');

  const handleSection2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSection2Error('');
    
    try {
      if (!section2PrimaryNation.trim()) {
        setSection2Error('Please select a primary nationality');
        return;
      }

      const names: GeneratedName[] = [];
      const nationalityCode = nationsData[section2PrimaryNation] || section2PrimaryNation;
      
      for (let i = 0; i < section2NumNames; i++) {
        names.push(realisticNameGenerator(nationalityCode));
      }
      
      setSection2GeneratedNames(names);
    } catch (err) {
      setSection2Error(err instanceof Error ? err.message : 'An error occurred while generating names');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Generate Realistic Name</h2>
            <div className="relative group">
              <svg 
                className="w-5 h-5 text-gray-400 cursor-help" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              <div className="absolute right-0 top-full mt-2 w-100 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 z-50 pointer-events-none">
                Name generation for a country using immigration statistics
                <br />
                and common dual nationalities found in youth and senior
                <br />
                team male footballers
              </div>
            </div>
          </div>

          {section2Error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-red-800">{section2Error}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setSection2Error('')}
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

          <form onSubmit={handleSection2Submit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Nationality
                </label>
                <AutocompleteInput
                  value={section2PrimaryNation}
                  onChange={setSection2PrimaryNation}
                  placeholder="Select nation..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Names to Generate
                </label>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={section2NumNames}
                  onChange={(e) => setSection2NumNames(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
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

        {/* Results Section */}
        <div className="bg-gray-100 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Generated Names</h3>
          <div className="space-y-2">
            {section2GeneratedNames.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No names generated yet</p>
            ) : (
              section2GeneratedNames.map((nameData, index) => (
                <NameCard key={index} {...nameData} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}