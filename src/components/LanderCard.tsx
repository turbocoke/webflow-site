import React from 'react';
import { MicIcon, MessageSquareIcon } from 'lucide-react';
const LanderCard = ({
  lander
}) => {
  return <div className="bg-gray-800 rounded-xl overflow-hidden hover:shadow-lg hover:shadow-[#65e8a4]/20 transition-all transform hover:scale-[1.02] cursor-pointer">
      <div className="relative h-48">
        <img src={lander.imageUrl} alt={lander.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white">{lander.name}</h3>
          <div className="flex items-center text-[#65e8a4] mt-1">
            <MicIcon className="w-4 h-4 mr-1" />
            <span>Authentic Voice</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-300 text-sm mb-4">{lander.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-gray-400 text-sm">
            <MessageSquareIcon className="w-4 h-4 mr-1" />
            <span>{lander.scenarioCount} scenarios</span>
          </div>
          <span className="bg-[#65e8a4] bg-opacity-20 text-[#65e8a4] text-xs py-1 px-2 rounded-full">
            {lander.category}
          </span>
        </div>
      </div>
    </div>;
};
export default LanderCard;