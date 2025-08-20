import React, { useState } from 'react';
import OptionSelector from './OptionSelector';
import StreamlinedCreator from './Options/StreamlinedCreator';
import TemplateBasedCreator from './Options/TemplateBasedCreator';
import LivePreviewCreator from './Options/LivePreviewCreator';
import TwoModeCreator from './Options/TwoModeCreator';
import ConversationalCreator from './Options/ConversationalCreator';
const FantasyCreator = () => {
  const [activeOption, setActiveOption] = useState('streamlined');
  // Render the selected creator option
  const renderCreator = () => {
    switch (activeOption) {
      case 'streamlined':
        return <StreamlinedCreator />;
      case 'template':
        return <TemplateBasedCreator />;
      case 'preview':
        return <LivePreviewCreator />;
      case 'twoMode':
        return <TwoModeCreator />;
      case 'conversational':
        return <ConversationalCreator />;
      default:
        return <StreamlinedCreator />;
    }
  };
  return <div className="mb-10">
      <OptionSelector activeOption={activeOption} setActiveOption={setActiveOption} />
      {renderCreator()}
    </div>;
};
export default FantasyCreator;