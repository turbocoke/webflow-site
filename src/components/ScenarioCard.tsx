import React from 'react';
import { PenIcon } from 'lucide-react';
const ScenarioCard = ({
  scenario,
  isActive,
  onClick,
  isUserCreated = false
}) => {
  return <div className={`p-3 rounded-lg cursor-pointer transition-all ${isActive ? 'bg-[#65e8a4] bg-opacity-20 border border-[#65e8a4]' : 'bg-gray-700 hover:bg-gray-700/80'}`} onClick={onClick}>
      <div className="flex justify-between items-start mb-2">
        <h3 className={`font-medium ${isActive ? 'text-[#65e8a4]' : 'text-white'}`}>
          {scenario.title}
        </h3>
        {isUserCreated && <div className="flex items-center text-xs text-gray-400">
            <PenIcon className="w-3 h-3 mr-1" />
            <span>Custom</span>
          </div>}
      </div>
      <p className="text-sm text-gray-300">{scenario.description}</p>
    </div>;
};
export default ScenarioCard;