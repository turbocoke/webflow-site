import React from 'react';
const OptionSelector = ({
  activeOption,
  setActiveOption
}) => {
  const options = [{
    id: 'streamlined',
    name: 'Streamlined (5 Steps)'
  }, {
    id: 'template',
    name: 'Template-Based'
  }, {
    id: 'preview',
    name: 'Live Preview'
  }, {
    id: 'twoMode',
    name: 'Two-Mode Approach'
  }, {
    id: 'conversational',
    name: 'Conversational'
  }];
  return <div className="bg-gray-900 rounded-xl p-4 mb-6">
      <div className="flex items-center mb-4">
        <div className="w-5 h-5 text-[#65e8a4] mr-2" />
        <h3 className="text-lg font-semibold">Design Options</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        {options.map(option => <button key={option.id} className={`py-2 px-3 rounded-lg text-sm transition-colors ${activeOption === option.id ? 'bg-[#65e8a4] text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`} onClick={() => setActiveOption(option.id)}>
            {option.name}
          </button>)}
      </div>
    </div>;
};
export default OptionSelector;