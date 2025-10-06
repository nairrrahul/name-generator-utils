import { GeneratedName } from "@/interfaces";
import { getAbbreviatedName } from "@/utils/generic_name_gen";
import fCode from '../../data/flag_codes.json'  with { type: 'json' };
import "flag-icons/css/flag-icons.min.css";

const FLAG_CODES = fCode as Record<string, string>;

const FlagNameCard = ({ name, nationality, secondaryNationality }: GeneratedName) => {

  const getFlagCode = (threeLetterCode: string) => {
    return threeLetterCode in FLAG_CODES ? FLAG_CODES[threeLetterCode] : 'xx';
  };

  const primaryCode = getAbbreviatedName(nationality);
  const primaryFlagCode = getFlagCode(primaryCode);
  const secondaryCode = secondaryNationality ? getAbbreviatedName(secondaryNationality) : undefined;
  const secondaryFlagCode = secondaryCode ? getFlagCode(secondaryCode) : undefined;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 flex justify-between items-center gap-5">
      <div className="font-semibold text-gray-800">{name}</div>
      <div className="flex flex-col items-end gap-1">
        <span 
          className={`fi fi-${primaryFlagCode} text-3xl shadow-md `}
          title={nationality}
        >
        </span>
        {secondaryFlagCode && (
          <span 
            className={`fi fi-${secondaryFlagCode} text-xl shadow`}
            title={secondaryNationality}
          >
          </span>
        )}
      </div>
    </div>
  );
};

export default FlagNameCard;