import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, SparklesIcon } from 'lucide-react';
import { mockLanders } from '../../../data/mockData';
import { ageOptions, personalityOptions, relationshipOptions, occupationOptions, hobbyOptions, locationOptions } from '../../../data/fantasyOptions';
import PostCreationSuccess from '../PostCreationSuccess';
// Streamlined Creator with just 5 essential steps
const StreamlinedCreator = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    star: null,
    age: '',
    personality: '',
    personalityOther: '',
    occupation: '',
    relationship: '',
    location: '',
    hobbies: [],
    hobbyOther: '',
    description: '',
    personaName: '',
    scenarioName: ''
  });
  const [isCreated, setIsCreated] = useState(false);
  const [createdFantasy, setCreatedFantasy] = useState(null);
  const totalSteps = 5; // Reduced from 11 to 5
  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
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
    // Simulate API call to create fantasy
    const fantasy = {
      id: `fantasy-${Date.now()}`,
      ...formData,
      createdAt: new Date().toISOString()
    };
    setCreatedFantasy(fantasy);
    setIsCreated(true);
  };
  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        // Voice selection
        return formData.star !== null;
      case 2:
        // Character traits (combined)
        return formData.age !== '' && (formData.personality !== '' || formData.personalityOther !== '') && formData.occupation !== '';
      case 3:
        // Relationship & setting
        return formData.relationship !== '' && formData.location !== '';
      case 4:
        // Scenario details
        return formData.description.length >= 10 && formData.personaName.length >= 3 && formData.scenarioName.length >= 3;
      case 5:
        // Review
        return true;
      default:
        return false;
    }
  };
  const handleHobbyToggle = hobby => {
    if (formData.hobbies.includes(hobby)) {
      setFormData(prev => ({
        ...prev,
        hobbies: prev.hobbies.filter(h => h !== hobby)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        hobbies: [...prev.hobbies, hobby]
      }));
    }
  };
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        // Voice selection
        return <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Select a Voice</h2>
                <p className="text-gray-300">
                  Choose whose voice you want to interact with
                </p>
              </div>
              <div className="bg-purple-600 bg-opacity-20 text-purple-300 text-xs py-1 px-3 rounded-full">
                Step 1 of 5
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {mockLanders.map(lander => <div key={lander.id} className={`bg-gray-800 rounded-xl p-4 cursor-pointer transition-all ${formData.star?.id === lander.id ? 'ring-2 ring-purple-500 bg-gray-700' : 'hover:bg-gray-700'}`} onClick={() => updateFormData('star', lander)}>
                  <div className="flex items-center">
                    <img src={lander.imageUrl} alt={lander.name} className="w-16 h-16 rounded-full object-cover mr-3" />
                    <div>
                      <h3 className="font-medium text-lg">{lander.name}</h3>
                      <p className="text-sm text-gray-400">{lander.category}</p>
                    </div>
                    {formData.star?.id === lander.id && <CheckIcon className="w-5 h-5 text-purple-500 ml-auto" />}
                  </div>
                </div>)}
            </div>
          </div>;
      case 2:
        // Character traits (combined age, personality, occupation)
        return <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Character Traits</h2>
                <p className="text-gray-300">Define who your character is</p>
              </div>
              <div className="bg-purple-600 bg-opacity-20 text-purple-300 text-xs py-1 px-3 rounded-full">
                Step 2 of 5
              </div>
            </div>
            {/* Age selection */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Age Range</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
                {ageOptions.map(age => <div key={age} className={`bg-gray-800 rounded-lg p-2 cursor-pointer transition-all text-center ${formData.age === age ? 'ring-2 ring-purple-500 bg-gray-700' : 'hover:bg-gray-700'}`} onClick={() => updateFormData('age', age)}>
                    {age}
                    {formData.age === age && <CheckIcon className="w-4 h-4 text-purple-500 inline ml-2" />}
                  </div>)}
              </div>
            </div>
            {/* Personality selection */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Personality</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                {personalityOptions.slice(0, 9).map(personality => <div key={personality} className={`bg-gray-800 rounded-lg p-2 cursor-pointer transition-all text-center ${formData.personality === personality ? 'ring-2 ring-purple-500 bg-gray-700' : 'hover:bg-gray-700'}`} onClick={() => {
                updateFormData('personality', personality);
                updateFormData('personalityOther', '');
              }}>
                    {personality}
                  </div>)}
                <div className={`bg-gray-800 rounded-lg p-2 cursor-pointer transition-all text-center ${formData.personality === 'Other' ? 'ring-2 ring-purple-500 bg-gray-700' : 'hover:bg-gray-700'}`} onClick={() => updateFormData('personality', 'Other')}>
                  Other
                </div>
              </div>
              {formData.personality === 'Other' && <input type="text" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 mt-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter personality trait..." value={formData.personalityOther} onChange={e => updateFormData('personalityOther', e.target.value)} />}
            </div>
            {/* Occupation selection */}
            <div>
              <h3 className="text-lg font-medium mb-2">Occupation</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {occupationOptions.slice(0, 8).map(occupation => <div key={occupation} className={`bg-gray-800 rounded-lg p-2 cursor-pointer transition-all text-center ${formData.occupation === occupation ? 'ring-2 ring-purple-500 bg-gray-700' : 'hover:bg-gray-700'}`} onClick={() => updateFormData('occupation', occupation)}>
                    {occupation}
                  </div>)}
              </div>
            </div>
          </div>;
      case 3:
        // Relationship & setting
        return <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">
                  Relationship & Setting
                </h2>
                <p className="text-gray-300">
                  Define how you'll interact and where
                </p>
              </div>
              <div className="bg-purple-600 bg-opacity-20 text-purple-300 text-xs py-1 px-3 rounded-full">
                Step 3 of 5
              </div>
            </div>
            {/* Relationship selection */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Your Relationship</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {relationshipOptions.map(relationship => <div key={relationship} className={`bg-gray-800 rounded-lg p-3 cursor-pointer transition-all text-center ${formData.relationship === relationship ? 'ring-2 ring-purple-500 bg-gray-700' : 'hover:bg-gray-700'}`} onClick={() => updateFormData('relationship', relationship)}>
                    {relationship}
                  </div>)}
              </div>
            </div>
            {/* Location selection */}
            <div>
              <h3 className="text-lg font-medium mb-2">Location</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {locationOptions.slice(0, 6).map(location => <div key={location} className={`bg-gray-800 rounded-lg p-3 cursor-pointer transition-all text-center ${formData.location === location ? 'ring-2 ring-purple-500 bg-gray-700' : 'hover:bg-gray-700'}`} onClick={() => updateFormData('location', location)}>
                    {location}
                  </div>)}
              </div>
            </div>
          </div>;
      case 4:
        // Scenario details (names and description)
        return <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Scenario Details</h2>
                <p className="text-gray-300">Name and describe your fantasy</p>
              </div>
              <div className="bg-purple-600 bg-opacity-20 text-purple-300 text-xs py-1 px-3 rounded-full">
                Step 4 of 5
              </div>
            </div>
            {/* Names */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Character Name
                </label>
                <input type="text" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter character name..." value={formData.personaName} onChange={e => updateFormData('personaName', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Scenario Title
                </label>
                <input type="text" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter scenario title..." value={formData.scenarioName} onChange={e => updateFormData('scenarioName', e.target.value)} />
              </div>
            </div>
            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Scenario Description
              </label>
              <textarea className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[150px]" placeholder="Describe your fantasy scenario..." value={formData.description} onChange={e => updateFormData('description', e.target.value)} />
              <div className="text-sm text-gray-400 mt-2">
                {formData.description.length} characters (minimum 10)
              </div>
            </div>
          </div>;
      case 5:
        // Review
        return <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Review Your Fantasy</h2>
                <p className="text-gray-300">
                  Make sure everything looks right
                </p>
              </div>
              <div className="bg-purple-600 bg-opacity-20 text-purple-300 text-xs py-1 px-3 rounded-full">
                Step 5 of 5
              </div>
            </div>
            <div className="bg-gray-800 rounded-xl p-6 max-w-2xl mx-auto">
              <h3 className="text-xl font-medium mb-4">
                {formData.scenarioName || 'Untitled Scenario'}
              </h3>
              <div className="flex items-center mb-4">
                {formData.star && <img src={formData.star.imageUrl} alt={formData.star.name} className="w-12 h-12 rounded-full object-cover mr-3" />}
                <div>
                  <p className="font-medium">
                    {formData.personaName || 'Unnamed Character'}
                  </p>
                  <p className="text-sm text-gray-400">
                    {formData.star?.name || 'No voice selected'}
                  </p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-300">
                <p>
                  <span className="text-gray-400">Age:</span> {formData.age}
                </p>
                <p>
                  <span className="text-gray-400">Personality:</span>{' '}
                  {formData.personality === 'Other' ? formData.personalityOther : formData.personality}
                </p>
                <p>
                  <span className="text-gray-400">Occupation:</span>{' '}
                  {formData.occupation}
                </p>
                <p>
                  <span className="text-gray-400">Relationship:</span>{' '}
                  {formData.relationship}
                </p>
                <p>
                  <span className="text-gray-400">Location:</span>{' '}
                  {formData.location}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-700">
                <p className="text-gray-300">{formData.description}</p>
              </div>
            </div>
            <div className="text-center mt-6">
              <p className="text-gray-400 mb-2">Want to make changes?</p>
              <div className="flex justify-center space-x-4">
                <button onClick={() => setCurrentStep(1)} className="text-sm text-purple-400 hover:text-purple-300">
                  Voice
                </button>
                <button onClick={() => setCurrentStep(2)} className="text-sm text-purple-400 hover:text-purple-300">
                  Character
                </button>
                <button onClick={() => setCurrentStep(3)} className="text-sm text-purple-400 hover:text-purple-300">
                  Relationship
                </button>
                <button onClick={() => setCurrentStep(4)} className="text-sm text-purple-400 hover:text-purple-300">
                  Details
                </button>
              </div>
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
        }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-[#65e8a4] to-[#41966a]"></div>
        </div>
        <div className="text-xs font-medium text-[#65e8a4] text-right">
          80% faster than before
        </div>
      </div>
      <div className="mt-8">{renderStepContent()}</div>
      <div className="mt-8 flex justify-between">
        {currentStep > 1 ? <button onClick={handleBack} className="flex items-center px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
              <ChevronLeftIcon className="w-5 h-5 mr-2" />
              Back
            </button> : <div></div> // Empty div to maintain layout
      }
        {currentStep < totalSteps ? <button onClick={handleNext} disabled={!isStepComplete()} className={`flex items-center px-6 py-2 rounded-lg transition-colors ${isStepComplete() ? 'bg-gradient-to-r from-[#65e8a4] to-[#41966a] hover:from-[#41966a] hover:to-[#41966a]' : 'bg-gray-700 opacity-50 cursor-not-allowed'}`}>
            Next
            <ChevronRightIcon className="w-5 h-5 ml-2" />
          </button> : <button onClick={handleSubmit} className="flex items-center px-6 py-2 bg-gradient-to-r from-[#65e8a4] to-[#41966a] hover:from-[#41966a] hover:to-[#41966a] rounded-lg transition-colors">
            Create Fantasy
            <SparklesIcon className="w-5 h-5 ml-2" />
          </button>}
      </div>
    </div>;
};
export default StreamlinedCreator;