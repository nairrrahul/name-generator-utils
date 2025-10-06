import { GeneratedName, NationDataProp } from "@/interfaces";
import { getFullName } from "@/utils/generic_name_gen";
import { useState } from "react";
import { generateName, generateNamesFromList } from 'fifa-name-generator';
import AutocompleteInput from "./AutoCompleteInput";
import NameCard from "./NameCard";

export default function NameGenerator({nationsData} : NationDataProp) {

  const [isBatchMode, setIsBatchMode] = useState(false);
  const [primaryNation, setPrimaryNation] = useState('');
  const [secondaryNation, setSecondaryNation] = useState('');
  const [secondaryEnabled, setSecondaryEnabled] = useState(false);
  const [batchInput, setBatchInput] = useState('');
  const [generatedNames, setGeneratedNames] = useState<GeneratedName[]>([]);
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isBatchMode) {
        const names = batchInput.split("\n");
        const batchFinalInput = names.map(item => item.includes(' ') ? item.split(' ') : item);
        const batchForUI = names.map((item) => {
          return item.includes(' ') ? {
            primary: getFullName(item.split(' ')[0]),
            secondary: getFullName(item.split(' ')[1])
          } : {
            primary: getFullName(item)
          };
        });
        const results = generateNamesFromList(batchFinalInput) as string[];
        setGeneratedNames(results.map((element, index) => {
          const hasSecNat = batchForUI[index].secondary != undefined;
          return {
            name: element,
            nationality: batchForUI[index].primary,
            secondaryNationality: hasSecNat ? batchForUI[index].secondary : undefined
          };
        }));
      } else {
        if (!primaryNation.trim()) return;
        
        const name = generateName(
          nationsData[primaryNation] || primaryNation,
          secondaryEnabled && secondaryNation ? nationsData[secondaryNation] || secondaryNation : undefined
        );
        
        setGeneratedNames([{
          name,
          nationality: primaryNation,
          secondaryNationality: secondaryEnabled && secondaryNation ? secondaryNation : undefined
        }]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while generating names');
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Generate Name</h2>
            <button
              onClick={() => setIsBatchMode(!isBatchMode)}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
            >
              {isBatchMode ? 'INDIVIDUAL SUBMIT' : 'BATCH SUBMIT'}
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setError('')}
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

          {!isBatchMode ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Nationality
                </label>
                <AutocompleteInput
                  value={primaryNation}
                  onChange={setPrimaryNation}
                  placeholder="Select nation..."
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    checked={secondaryEnabled}
                    onChange={(e) => setSecondaryEnabled(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    Enable Secondary Nationality
                  </span>
                </label>
                <AutocompleteInput
                  value={secondaryNation}
                  onChange={setSecondaryNation}
                  placeholder="Select secondary nation..."
                  disabled={!secondaryEnabled}
                />
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Batch Input (one entry per line)
              </label>
              <textarea
                value={batchInput}
                onChange={(e) => setBatchInput(e.target.value)}
                placeholder="Enter nations (e.g., 'Germany, France')"
                rows={10}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
          )}

          <button
            onClick={handleSubmit}
            className="mt-6 w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
          >
            Submit
          </button>
        </div>

        {/* Results Section */}
        <div className="bg-gray-100 rounded-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Generated Names</h3>
          <div className="space-y-2">
            {generatedNames.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No names generated yet</p>
            ) : (
              generatedNames.map((nameData, index) => (
                <NameCard key={index} {...nameData} />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}