import { useEffect, useRef, useState } from "react";
import nations from "../../data/nations.json";

const nationsData = nations as Record<string, string>;

const AutocompleteInput = ({ 
  value, 
  onChange, 
  placeholder,
  disabled = false 
}: { 
  value: string; 
  onChange: (val: string) => void;
  placeholder: string;
  disabled?: boolean;
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const selectingRef = useRef(false);

  useEffect(() => {

    if (selectingRef.current) {
      selectingRef.current = false;
      return;
    }

    if (value.trim()) {
      const filtered = Object.keys(nationsData).filter(nation =>
        nation.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [value]);

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900"
      />
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
          {suggestions.map((nation) => (
            <div
              key={nation}
              onClick={() => {
                selectingRef.current = true;
                onChange(nation);
                setShowSuggestions(false);
              }}
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-900"
            >
              {nation}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AutocompleteInput;