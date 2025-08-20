import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartIcon, BriefcaseIcon, BookOpenIcon, GraduationCapIcon, MicIcon, SparklesIcon, ChevronLeftIcon, ChevronRightIcon, CheckIcon } from 'lucide-react';
import { mockLanders } from '../../../data/mockData';
import PostCreationSuccess from '../PostCreationSuccess';
// Template-based creator with pre-built scenarios
const TemplateBasedCreator = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [customizations, setCustomizations] = useState({
    personaName: '',
    relationship: '',
    location: ''
  });
  const [isCreated, setIsCreated] = useState(false);
  const [createdFantasy, setCreatedFantasy] = useState(null);
  // Pre-defined templates
  const templates = [{
    id: 'romance',
    title: 'Romantic Encounter',
    description: 'A passionate conversation with someone who is interested in you',
    icon: <HeartIcon className="w-8 h-8 text-red-400" />,
    defaults: {
      relationship: 'Romantic Interest',
      personality: 'Flirty',
      location: 'Beach House',
      scenario: 'A sunset walk turns into a deep conversation about life and love'
    }
  }, {
    id: 'mentor',
    title: 'Life Mentor',
    description: 'Get advice and wisdom from someone who believes in you',
    icon: <GraduationCapIcon className="w-8 h-8 text-blue-400" />,
    defaults: {
      relationship: 'Mentor',
      personality: 'Intellectual',
      location: 'Coffee Shop',
      scenario: 'A chance meeting with someone who sees your potential and wants to help'
    }
  }, {
    id: 'professional',
    title: 'Career Conversation',
    description: 'Discuss your career aspirations with an industry leader',
    icon: <BriefcaseIcon className="w-8 h-8 text-green-400" />,
    defaults: {
      relationship: 'Professional',
      personality: 'Serious',
      location: 'Office',
      scenario: 'A private meeting with someone who can open doors in your industry'
    }
  }, {
    id: 'story',
    title: 'Storytelling',
    description: 'Listen to captivating stories and engage in the narrative',
    icon: <BookOpenIcon className="w-8 h-8 text-yellow-400" />,
    defaults: {
      relationship: 'Friend',
      personality: 'Adventurous',
      location: 'Mountain Cabin',
      scenario: 'A cozy evening by the fireplace, sharing tales of adventure and mystery'
    }
  }];
  const totalSteps = 3; // Template selection, Voice selection, Customization
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  const handleSubmit = () => {
    // Create a fantasy object from the template and customizations
    const fantasy = {
      id: `fantasy-${Date.now()}`,
      star: selectedVoice,
      personaName: customizations.personaName,
      relationship: customizations.relationship || selectedTemplate.defaults.relationship,
      location: customizations.location || selectedTemplate.defaults.location,
      personality: selectedTemplate.defaults.personality,
      description: selectedTemplate.defaults.scenario,
      scenarioName: selectedTemplate.title,
      createdAt: new Date().toISOString()
    };
    setCreatedFantasy(fantasy);
    setIsCreated(true);
  };
  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        // Template selection
        return selectedTemplate !== null;
      case 2:
        // Voice selection
        return selectedVoice !== null;
      case 3:
        // Customization
        return customizations.personaName.length >= 3;
      default:
        return false;
    }
  };
  const updateCustomization = (field, value) => {
    setCustomizations(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        // Template selection
        return <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold">Choose a Template</h2>
              <p className="text-gray-300">
                Start with a pre-built scenario and customize it
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map(template => <div key={template.id} className={`bg-gray-800 rounded-xl p-5 cursor-pointer transition-all ${selectedTemplate?.id === template.id ? 'ring-2 ring-purple-500 bg-gray-700' : 'hover:bg-gray-700'}`} onClick={() => setSelectedTemplate(template)}>
                  <div className="flex items-start">
                    <div className="bg-gray-700 rounded-full p-3 mr-4">
                      {template.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium">{template.title}</h3>
                      <p className="text-gray-400 text-sm mt-1">
                        {template.description}
                      </p>
                      <div className="mt-3 text-xs text-gray-500">
                        <p>Relationship: {template.defaults.relationship}</p>
                        <p>Personality: {template.defaults.personality}</p>
                        <p>Location: {template.defaults.location}</p>
                      </div>
                    </div>
                    {selectedTemplate?.id === template.id && <CheckIcon className="w-5 h-5 text-purple-500 ml-2" />}
                  </div>
                </div>)}
            </div>
            <div className="text-center mt-4">
              <button className="text-purple-400 hover:text-purple-300 text-sm underline">
                Start from scratch instead
              </button>
            </div>
          </div>;
      case 2:
        // Voice selection
        return <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold">Choose a Voice</h2>
              <p className="text-gray-300">
                Who would you like to interact with in your{' '}
                {selectedTemplate?.title.toLowerCase()}?
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockLanders.map(lander => <div key={lander.id} className={`bg-gray-800 rounded-xl p-4 cursor-pointer transition-all ${selectedVoice?.id === lander.id ? 'ring-2 ring-purple-500 bg-gray-700' : 'hover:bg-gray-700'}`} onClick={() => setSelectedVoice(lander)}>
                  <div className="flex items-center">
                    <img src={lander.imageUrl} alt={lander.name} className="w-16 h-16 rounded-full object-cover mr-3" />
                    <div>
                      <h3 className="font-medium text-lg">{lander.name}</h3>
                      <div className="flex items-center text-purple-400 mt-1">
                        <MicIcon className="w-4 h-4 mr-1" />
                        <span className="text-sm">Authentic Voice</span>
                      </div>
                    </div>
                    {selectedVoice?.id === lander.id && <CheckIcon className="w-5 h-5 text-purple-500 ml-auto" />}
                  </div>
                </div>)}
            </div>
          </div>;
      case 3:
        // Customization
        return <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold">Customize Your Fantasy</h2>
              <p className="text-gray-300">
                Make a few key adjustments to personalize your experience
              </p>
            </div>
            {selectedTemplate && selectedVoice && <div className="bg-gray-700 rounded-xl p-5 mb-6">
                <div className="flex items-center mb-4">
                  <div className="bg-gray-800 rounded-full p-2 mr-3">
                    {selectedTemplate.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{selectedTemplate.title}</h3>
                    <p className="text-sm text-gray-400">
                      with {selectedVoice.name}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-300">
                  {selectedTemplate.defaults.scenario}
                </p>
              </div>}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Character Name
                </label>
                <input type="text" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter character name..." value={customizations.personaName} onChange={e => updateCustomization('personaName', e.target.value)} />
                <p className="text-xs text-gray-500 mt-1">
                  What would you like to call {selectedVoice?.name} in this
                  scenario?
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Relationship (Optional)
                </label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" value={customizations.relationship} onChange={e => updateCustomization('relationship', e.target.value)}>
                  <option value="">
                    {selectedTemplate?.defaults.relationship} (Default)
                  </option>
                  <option value="Friend">Friend</option>
                  <option value="Romantic Interest">Romantic Interest</option>
                  <option value="Mentor">Mentor</option>
                  <option value="Professional">Professional</option>
                  <option value="Stranger">Stranger</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Location (Optional)
                </label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" value={customizations.location} onChange={e => updateCustomization('location', e.target.value)}>
                  <option value="">
                    {selectedTemplate?.defaults.location} (Default)
                  </option>
                  <option value="Beach House">Beach House</option>
                  <option value="City Apartment">City Apartment</option>
                  <option value="Coffee Shop">Coffee Shop</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Park">Park</option>
                </select>
              </div>
            </div>
            <div className="text-center mt-4">
              <button className="text-purple-400 hover:text-purple-300 text-sm underline">
                Advanced customization options
              </button>
            </div>
          </div>;
      default:
        return null;
    }
  };
  // If fantasy is created, show success screen
  if (isCreated && createdFantasy) {
    return <PostCreationSuccess fantasy={createdFantasy} />;
  }
  return <div className="bg-gray-800 rounded-xl p-6">
      {/* Progress bar */}
      <div className="relative">
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-700">
          <div style={{
          width: `${currentStep / totalSteps * 100}%`
        }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-purple-600 to-blue-600"></div>
        </div>
      </div>
      <div className="mt-8">{renderStepContent()}</div>
      <div className="mt-8 flex justify-between">
        {currentStep > 1 ? <button onClick={handleBack} className="flex items-center px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
              <ChevronLeftIcon className="w-5 h-5 mr-2" />
              Back
            </button> : <div></div> // Empty div to maintain layout
      }
        {currentStep < totalSteps ? <button onClick={handleNext} disabled={!isStepComplete()} className={`flex items-center px-6 py-2 rounded-lg transition-colors ${isStepComplete() ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' : 'bg-gray-700 opacity-50 cursor-not-allowed'}`}>
            Next
            <ChevronRightIcon className="w-5 h-5 ml-2" />
          </button> : <button onClick={handleSubmit} disabled={!isStepComplete()} className={`flex items-center px-6 py-2 rounded-lg transition-colors ${isStepComplete() ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' : 'bg-gray-700 opacity-50 cursor-not-allowed'}`}>
            Create Fantasy
            <SparklesIcon className="w-5 h-5 ml-2" />
          </button>}
      </div>
    </div>;
};
export default TemplateBasedCreator;