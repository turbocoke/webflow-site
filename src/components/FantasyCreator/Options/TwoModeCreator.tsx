import React, { useState, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon, SparklesIcon, ZapIcon, ClipboardListIcon, ClockIcon } from 'lucide-react';
import { mockLanders } from '../../../data/mockData';
import { relationshipOptions, locationOptions } from '../../../data/fantasyOptions';
import PostCreationSuccess from '../PostCreationSuccess';
// Two-Mode Creator with Express and Detailed options
const TwoModeCreator = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState(null); // 'express' or 'detailed'
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    star: null,
    relationship: '',
    location: '',
    description: '',
    personaName: '',
    scenarioName: '',
    // Additional fields for detailed mode
    age: '',
    personality: '',
    occupation: '',
    hobbies: []
  });
  const [isCreated, setIsCreated] = useState(false);
  const [createdFantasy, setCreatedFantasy] = useState(null);
  // Different total steps based on mode
  const totalSteps = mode === 'express' ? 3 : 8;
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
    } else if (mode) {
      // Go back to mode selection
      setMode(null);
    }
  };
  const handleSubmit = () => {
    // Simulate API call to create fantasy
    const fantasy = {
      id: `fantasy-${Date.now()}`,
      ...formData,
      creationMode: mode,
      createdAt: new Date().toISOString()
    };
    setCreatedFantasy(fantasy);
    setIsCreated(true);
  };
  const isStepComplete = () => {
    if (!mode) return false;
    if (mode === 'express') {
      switch (currentStep) {
        case 1:
          // Voice
          return formData.star !== null;
        case 2:
          // Relationship
          return formData.relationship !== '';
        case 3:
          // Basic Details
          return formData.personaName.length >= 3;
        default:
          return false;
      }
    } else {
      // detailed mode
      switch (currentStep) {
        case 1:
          // Voice
          return formData.star !== null;
        case 2:
          // Character Basics
          return formData.personaName.length >= 3;
        case 3:
          // Personality
          return true;
        // Optional
        case 4:
          // Relationship
          return formData.relationship !== '';
        case 5:
          // Setting
          return formData.location !== '';
        case 6:
          // Scenario Details
          return true;
        // Optional
        case 7:
          // Review
          return true;
        default:
          return false;
      }
    }
  };
  const getFantasyScore = () => {
    if (mode !== 'detailed') return 0;
    let score = 0;
    if (formData.star) score += 10;
    if (formData.personaName.length >= 3) score += 10;
    if (formData.age) score += 10;
    if (formData.personality) score += 10;
    if (formData.occupation) score += 10;
    if (formData.relationship) score += 10;
    if (formData.location) score += 10;
    if (formData.hobbies.length > 0) score += 10;
    if (formData.description.length >= 10) score += 10;
    if (formData.scenarioName.length >= 3) score += 10;
    return score;
  };
  // Mode selection screen
  if (!mode) {
    return <div className="bg-gray-800 rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-center mb-2">
          Choose Your Creation Mode
        </h2>
        <p className="text-gray-300 text-center mb-8">
          Select how you want to create your fantasy
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-700 rounded-xl p-6 cursor-pointer hover:bg-gray-600 transition-colors border-2 border-transparent hover:border-purple-500" onClick={() => {
          setMode('express');
          setCurrentStep(1);
        }}>
            <div className="flex items-center mb-4">
              <div className="bg-blue-500 bg-opacity-20 rounded-full p-3 mr-3">
                <ZapIcon className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-medium">Express Mode</h3>
                <div className="flex items-center mt-1 text-sm text-gray-400">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  <span>Under 1 minute</span>
                </div>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Create a basic fantasy with just 3 quick steps. Perfect for
              getting started fast.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <CheckIcon className="w-4 h-4 text-green-400 mr-2" />
                <span>Choose a voice</span>
              </li>
              <li className="flex items-center">
                <CheckIcon className="w-4 h-4 text-green-400 mr-2" />
                <span>Select relationship type</span>
              </li>
              <li className="flex items-center">
                <CheckIcon className="w-4 h-4 text-green-400 mr-2" />
                <span>Name your character</span>
              </li>
            </ul>
          </div>
          <div className="bg-gray-700 rounded-xl p-6 cursor-pointer hover:bg-gray-600 transition-colors border-2 border-transparent hover:border-purple-500" onClick={() => {
          setMode('detailed');
          setCurrentStep(1);
        }}>
            <div className="flex items-center mb-4">
              <div className="bg-purple-500 bg-opacity-20 rounded-full p-3 mr-3">
                <ClipboardListIcon className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-medium">Detailed Mode</h3>
                <div className="flex items-center mt-1 text-sm text-gray-400">
                  <ClockIcon className="w-4 h-4 mr-1" />
                  <span>2-3 minutes</span>
                </div>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Customize every aspect of your fantasy for a more personalized
              experience.
            </p>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <CheckIcon className="w-4 h-4 text-green-400 mr-2" />
                <span>Full character customization</span>
              </li>
              <li className="flex items-center">
                <CheckIcon className="w-4 h-4 text-green-400 mr-2" />
                <span>Detailed scenario building</span>
              </li>
              <li className="flex items-center">
                <CheckIcon className="w-4 h-4 text-green-400 mr-2" />
                <span>Higher quality experience</span>
              </li>
            </ul>
          </div>
        </div>
      </div>;
  }
  // Express Mode Content
  const renderExpressContent = () => {
    switch (currentStep) {
      case 1:
        // Voice selection
        return <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Choose a Voice</h2>
              <div className="bg-blue-500 bg-opacity-20 rounded-full px-3 py-1 text-blue-300 text-xs font-medium">
                Express Mode
              </div>
            </div>
            <p className="text-gray-300">
              Select whose voice you want to interact with
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {mockLanders.slice(0, 6).map(lander => <div key={lander.id} className={`bg-gray-700 rounded-xl p-4 cursor-pointer transition-all ${formData.star?.id === lander.id ? 'ring-2 ring-blue-500 bg-gray-600' : 'hover:bg-gray-600'}`} onClick={() => updateFormData('star', lander)}>
                  <div className="flex items-center">
                    <img src={lander.imageUrl} alt={lander.name} className="w-14 h-14 rounded-full object-cover mr-3" />
                    <div>
                      <h3 className="font-medium">{lander.name}</h3>
                      <p className="text-sm text-gray-400">{lander.category}</p>
                    </div>
                  </div>
                </div>)}
            </div>
          </div>;
      case 2:
        // Relationship
        return <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">
                Choose Your Relationship
              </h2>
              <div className="bg-blue-500 bg-opacity-20 rounded-full px-3 py-1 text-blue-300 text-xs font-medium">
                Express Mode
              </div>
            </div>
            <p className="text-gray-300">
              How do you want to relate to {formData.star?.name}?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {relationshipOptions.slice(0, 8).map(relationship => <div key={relationship} className={`bg-gray-700 rounded-lg p-4 cursor-pointer transition-all text-center ${formData.relationship === relationship ? 'ring-2 ring-blue-500 bg-gray-600' : 'hover:bg-gray-600'}`} onClick={() => updateFormData('relationship', relationship)}>
                  <div className="font-medium">{relationship}</div>
                </div>)}
            </div>
          </div>;
      case 3:
        // Basic Details
        return <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Name Your Character</h2>
              <div className="bg-blue-500 bg-opacity-20 rounded-full px-3 py-1 text-blue-300 text-xs font-medium">
                Express Mode
              </div>
            </div>
            <p className="text-gray-300">
              What would you like to call {formData.star?.name} in your
              scenario?
            </p>
            <div className="bg-gray-700 rounded-xl p-5 mt-4">
              <div className="flex items-center mb-6">
                {formData.star && <img src={formData.star.imageUrl} alt={formData.star.name} className="w-16 h-16 rounded-full object-cover mr-3" />}
                <div>
                  <div className="text-sm text-gray-400">
                    {formData.star?.name}'s character:
                  </div>
                  <input type="text" className="bg-transparent border-b border-gray-500 focus:border-blue-400 px-0 py-1 text-xl font-medium w-full focus:outline-none" placeholder="Enter name here..." value={formData.personaName} onChange={e => updateFormData('personaName', e.target.value)} />
                </div>
              </div>
              <div className="text-sm text-gray-400 mb-2">
                Your relationship:
              </div>
              <div className="bg-gray-600 rounded-lg py-2 px-4 inline-block">
                {formData.relationship || 'No relationship selected'}
              </div>
            </div>
            <div className="bg-blue-500 bg-opacity-10 rounded-lg p-4 mt-4 border border-blue-500 border-opacity-30">
              <div className="flex items-start">
                <ZapIcon className="w-5 h-5 text-blue-400 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-300">
                    Express Mode creates a basic scenario with minimal details.
                    You can enhance your fantasy later.
                  </p>
                </div>
              </div>
            </div>
          </div>;
      default:
        return null;
    }
  };
  // Detailed Mode Content
  const renderDetailedContent = () => {
    switch (currentStep) {
      case 1:
        // Voice selection (same as express)
        return <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Choose a Voice</h2>
              <div className="bg-purple-500 bg-opacity-20 rounded-full px-3 py-1 text-purple-300 text-xs font-medium">
                Detailed Mode
              </div>
            </div>
            <p className="text-gray-300">
              Select whose voice you want to interact with
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {mockLanders.slice(0, 6).map(lander => <div key={lander.id} className={`bg-gray-700 rounded-xl p-4 cursor-pointer transition-all ${formData.star?.id === lander.id ? 'ring-2 ring-purple-500 bg-gray-600' : 'hover:bg-gray-600'}`} onClick={() => updateFormData('star', lander)}>
                  <div className="flex items-center">
                    <img src={lander.imageUrl} alt={lander.name} className="w-14 h-14 rounded-full object-cover mr-3" />
                    <div>
                      <h3 className="font-medium">{lander.name}</h3>
                      <p className="text-sm text-gray-400">{lander.category}</p>
                    </div>
                  </div>
                </div>)}
            </div>
          </div>;
      // Additional detailed steps would be implemented here
      case 2:
        // Character Basics
        return <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Character Basics</h2>
              <div className="flex items-center">
                <div className="bg-purple-500 bg-opacity-20 rounded-full px-3 py-1 text-purple-300 text-xs font-medium mr-2">
                  Detailed Mode
                </div>
                <div className="bg-gray-700 rounded-full px-2 py-1 text-xs">
                  Fantasy Score: {getFantasyScore()}/100
                </div>
              </div>
            </div>
            <p className="text-gray-300">
              Define the basic details of your character
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Character Name
                </label>
                <input type="text" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter character name..." value={formData.personaName} onChange={e => updateFormData('personaName', e.target.value)} />
                <p className="text-xs text-gray-500 mt-1">
                  What would you like to call {formData.star?.name} in this
                  scenario?
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Scenario Title
                </label>
                <input type="text" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter scenario title..." value={formData.scenarioName} onChange={e => updateFormData('scenarioName', e.target.value)} />
                <p className="text-xs text-gray-500 mt-1">
                  Give your fantasy experience a memorable title
                </p>
              </div>
            </div>
            <div className="bg-purple-500 bg-opacity-10 rounded-lg p-4 mt-6 border border-purple-500 border-opacity-30">
              <div className="flex items-start">
                <SparklesIcon className="w-5 h-5 text-purple-400 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium text-purple-300 mb-1">
                    Enhance Your Fantasy
                  </p>
                  <p className="text-sm text-gray-300">
                    Adding more details in the following steps will increase
                    your Fantasy Score and create a more immersive experience.
                  </p>
                </div>
              </div>
            </div>
          </div>;
      // More detailed steps would be implemented here
      case 7:
        // Review (final step for detailed)
        return <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Review Your Fantasy</h2>
              <div className="flex items-center">
                <div className="bg-purple-500 bg-opacity-20 rounded-full px-3 py-1 text-purple-300 text-xs font-medium mr-2">
                  Detailed Mode
                </div>
                <div className={`rounded-full px-2 py-1 text-xs ${getFantasyScore() >= 70 ? 'bg-green-500 bg-opacity-20 text-green-300' : 'bg-yellow-500 bg-opacity-20 text-yellow-300'}`}>
                  Fantasy Score: {getFantasyScore()}/100
                </div>
              </div>
            </div>
            <p className="text-gray-300">
              Review and confirm your fantasy details
            </p>
            <div className="bg-gray-700 rounded-xl p-6 mt-4">
              <h3 className="text-xl font-medium mb-4">
                {formData.scenarioName || 'Untitled Scenario'}
              </h3>
              <div className="flex items-center mb-6">
                {formData.star && <img src={formData.star.imageUrl} alt={formData.star.name} className="w-16 h-16 rounded-full object-cover mr-3 border-2 border-purple-500" />}
                <div>
                  <p className="font-medium text-lg">
                    {formData.personaName || 'Unnamed Character'}
                  </p>
                  <p className="text-sm text-gray-400">
                    {formData.star?.name}'s Voice
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-600 rounded-lg p-3">
                  <p className="text-sm text-gray-400 mb-1">Relationship</p>
                  <p>{formData.relationship || 'Not specified'}</p>
                </div>
                <div className="bg-gray-600 rounded-lg p-3">
                  <p className="text-sm text-gray-400 mb-1">Location</p>
                  <p>{formData.location || 'Not specified'}</p>
                </div>
              </div>
              <div className="bg-gray-600 rounded-lg p-4">
                <p className="text-sm text-gray-400 mb-2">
                  Scenario Description
                </p>
                <p className="text-gray-200">
                  {formData.description || 'No description provided.'}
                </p>
              </div>
            </div>
            {getFantasyScore() < 70 && <div className="bg-yellow-500 bg-opacity-10 rounded-lg p-4 border border-yellow-500 border-opacity-30">
                <div className="flex items-start">
                  <SparklesIcon className="w-5 h-5 text-yellow-400 mr-2 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-300 mb-1">
                      Enhance Your Fantasy
                    </p>
                    <p className="text-sm text-gray-300">
                      Your fantasy score is {getFantasyScore()}/100. Adding more
                      details will create a more immersive experience.
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button className="text-xs bg-gray-700 hover:bg-gray-600 rounded-full px-3 py-1">
                        Add personality
                      </button>
                      <button className="text-xs bg-gray-700 hover:bg-gray-600 rounded-full px-3 py-1">
                        Add hobbies
                      </button>
                      <button className="text-xs bg-gray-700 hover:bg-gray-600 rounded-full px-3 py-1">
                        Improve description
                      </button>
                    </div>
                  </div>
                </div>
              </div>}
          </div>;
      default:
        return <div className="text-center p-8">
            <h3 className="text-xl font-medium mb-4">Step {currentStep}</h3>
            <p className="text-gray-300">
              This is a placeholder for detailed mode step {currentStep}. In a
              full implementation, this would contain the appropriate form
              fields.
            </p>
          </div>;
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
        }} className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${mode === 'express' ? 'bg-gradient-to-r from-blue-600 to-cyan-600' : 'bg-gradient-to-r from-purple-600 to-blue-600'}`}></div>
        </div>
        <div className="text-sm text-gray-400 text-right">
          Step {currentStep} of {totalSteps}
        </div>
      </div>
      <div className="mt-8">
        {mode === 'express' ? renderExpressContent() : renderDetailedContent()}
      </div>
      <div className="mt-8 flex justify-between">
        <button onClick={handleBack} className="flex items-center px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
          <ChevronLeftIcon className="w-5 h-5 mr-2" />
          Back
        </button>
        {currentStep < totalSteps ? <button onClick={handleNext} disabled={!isStepComplete()} className={`flex items-center px-6 py-2 rounded-lg transition-colors ${isStepComplete() ? mode === 'express' ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700' : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' : 'bg-gray-700 opacity-50 cursor-not-allowed'}`}>
            Next
            <ChevronRightIcon className="w-5 h-5 ml-2" />
          </button> : <button onClick={handleSubmit} className={`flex items-center px-6 py-2 rounded-lg transition-colors ${mode === 'express' ? 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700' : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'}`}>
            Create Fantasy
            <SparklesIcon className="w-5 h-5 ml-2" />
          </button>}
      </div>
    </div>;
};
export default TwoModeCreator;