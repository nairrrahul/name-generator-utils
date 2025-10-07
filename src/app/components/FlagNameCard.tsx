import { GeneratedName } from "@/interfaces";
import { getAbbreviatedName } from "@/utils/generic_name_gen";
import fCode from '../../data/flag_codes.json'  with { type: 'json' };
import "flag-icons/css/flag-icons.min.css";

const FLAG_CODES = fCode as Record<string, string>;
const basePath = process.env.NODE_ENV === 'production' ? '/name-generator-utils' : '';

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
        {['bq', 'gf', 'gp', 'zb', 're'].includes(primaryFlagCode) ? (
        <img
          src={`${basePath}/images/${primaryFlagCode}.svg`}
          alt={nationality}
          title={nationality}
          className="w-12 h-8 object-cover shadow-md"
        />
      ) : (
        <span
          className={`fi fi-${primaryFlagCode} text-3xl shadow-md`}
          title={nationality}
        >
        </span>
      )}
      {secondaryFlagCode && (
        ['bq', 'gf', 'gp', 'zb', 're'].includes(secondaryFlagCode) ? (
          <img
            src={`${basePath}/images/${secondaryFlagCode}.svg`}
            alt={secondaryNationality}
            title={secondaryNationality}
            className="w-7 h-5.25 object-cover shadow"
          />
        ) : (
          <span
            className={`fi fi-${secondaryFlagCode} text-xl shadow`}
            title={secondaryNationality}
          >
          </span>
        )
      )}
      </div>
    </div>
  );
};

export default FlagNameCard;