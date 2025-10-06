import { GeneratedName } from '@/interfaces';
import { getAbbreviatedName } from '@/utils/generic_name_gen';

const NameCard = ({ name, nationality, secondaryNationality }: GeneratedName) => (
  <div className="bg-white rounded-lg shadow-md p-6 mb-4 flex justify-between items-center">
    <div className="text-xl font-semibold text-gray-800">{name}</div>
    <div className="text-right">
      <div className="text-lg font-medium text-gray-700">{nationality}</div>
      {secondaryNationality && (
        <div className="text-sm text-gray-500 mt-1">{secondaryNationality}</div>
      )}
    </div>
  </div>
);

export default NameCard;