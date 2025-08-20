import React, { useEffect, useState } from 'react';
import { CheckIcon, SparklesIcon, MicIcon, MapPinIcon, BriefcaseIcon, UserIcon, HeartIcon, ArrowRightIcon, InfoIcon } from 'lucide-react';
import { mockLanders } from '../../../data/mockData';
import { ageOptions, personalityOptions, relationshipOptions, occupationOptions, locationOptions } from '../../../data/fantasyOptions';
import PostCreationSuccess from '../PostCreationSuccess';
// Live Preview Creator with split screen interface
const LivePreviewCreator = () => {
  const [formData, setFormData] = useState({
    star: null,
    age: '',
    personality: '',
    personalityOther: '',
    relationship: '',
    occupation: '',
    location: '',
    description: '',
    personaName: '',
    scenarioName: ''
  });
  const [isReadyToCreate, setIsReadyToCreate] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [createdFantasy, setCreatedFantasy] = useState(null);
  // Check if minimum requirements are met
  useEffect(() => {
    const hasMinimumRequirements = formData.star !== null && formData.relationship !== '' && formData.personaName.length >= 3;
    setIsReadyToCreate(hasMinimumRequirements);
  }, [formData]);
  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
  const getCompletionScore = () => {
    let score = 0;
    if (formData.star) score += 20;
    if (formData.age) score += 10;
    if (formData.personality) score += 10;
    if (formData.relationship) score += 15;
    if (formData.occupation) score += 10;
    if (formData.location) score += 10;
    if (formData.personaName.length >= 3) score += 15;
    if (formData.description.length >= 10) score += 10;
    return Math.min(score, 100);
  };
  // Helper to determine if a field is required
  const isRequiredField = field => {
    return ['star', 'relationship', 'personaName'].includes(field);
  };
  // If fantasy is created, show success screen
  if (isCreated && createdFantasy) {
    return <PostCreationSuccess fantasy={createdFantasy} />;
  }
  return <div className="bg-gray-800 rounded-xl overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Left side - Form fields */}
        <div className="md:w-1/2 bg-gray-800 p-6 overflow-y-auto" style={{
        maxHeight: '700px'
      }}>
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Create Your Fantasy</h2>
            <p className="text-gray-400">
              Fill in the details below and watch your fantasy take shape in
              real-time
            </p>
            <div className="flex items-center mt-4 text-sm">
              <div className="flex items-center mr-4">
                <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                <span className="text-purple-300">Required fields</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-gray-500 mr-2"></div>
                <span className="text-gray-400">Optional fields</span>
              </div>
            </div>
          </div>
          {/* Voice Selection - Required */}
          <div className="mb-6 pb-6 border-b border-gray-700">
            <div className="flex items-center mb-3">
              <h3 className="font-medium text-lg">
                <span className="text-purple-300">•</span> Choose a Voice
              </h3>
              {formData.star && <span className="ml-auto bg-purple-600 bg-opacity-20 text-purple-300 text-xs py-1 px-2 rounded-full flex items-center">
                  <CheckIcon className="w-3 h-3 mr-1" /> Selected
                </span>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              {mockLanders.slice(0, 4).map(lander => <div key={lander.id} className={`bg-gray-700 rounded-lg p-3 cursor-pointer transition-all ${formData.star?.id === lander.id ? 'ring-2 ring-purple-500' : 'hover:bg-gray-600'}`} onClick={() => updateFormData('star', lander)}>
                  <div className="flex items-center">
                    <img src={lander.imageUrl} alt={lander.name} className="w-10 h-10 rounded-full object-cover mr-2" />
                    <div>
                      <h4 className="text-sm font-medium">{lander.name}</h4>
                      <p className="text-xs text-gray-400">{lander.category}</p>
                    </div>
                  </div>
                </div>)}
            </div>
            {!formData.star && <div className="text-xs text-purple-300 mt-2 flex items-center">
                <InfoIcon className="w-3 h-3 mr-1" />
                <span>Please select a voice to continue</span>
              </div>}
          </div>
          {/* Character Details */}
          <div className="mb-6 pb-6 border-b border-gray-700">
            <h3 className="font-medium text-lg mb-3">Character Details</h3>
            <div className="space-y-4">
              {/* Character Name - Required */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  <span className="text-purple-300">•</span> Character Name
                </label>
                <input type="text" className={`w-full bg-gray-700 border ${formData.personaName.length >= 3 ? 'border-purple-500' : 'border-gray-600'} rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500`} placeholder="Enter character name..." value={formData.personaName} onChange={e => updateFormData('personaName', e.target.value)} />
                {formData.personaName.length > 0 && formData.personaName.length < 3 && <p className="text-xs text-yellow-400 mt-1">
                      Name should be at least 3 characters
                    </p>}
              </div>
              {/* Age - Optional */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Age Range
                </label>
                <div className="flex flex-wrap gap-2">
                  {ageOptions.slice(0, 6).map(age => <button key={age} className={`px-3 py-1 rounded-lg text-sm ${formData.age === age ? 'bg-gray-600 ring-1 ring-purple-500' : 'bg-gray-700 hover:bg-gray-600'}`} onClick={() => updateFormData('age', age)}>
                      {age}
                    </button>)}
                </div>
              </div>
              {/* Personality - Optional */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Personality
                </label>
                <div className="flex flex-wrap gap-2">
                  {personalityOptions.slice(0, 6).map(personality => <button key={personality} className={`px-3 py-1 rounded-lg text-sm ${formData.personality === personality ? 'bg-gray-600 ring-1 ring-purple-500' : 'bg-gray-700 hover:bg-gray-600'}`} onClick={() => updateFormData('personality', personality)}>
                      {personality}
                    </button>)}
                </div>
              </div>
              {/* Occupation - Optional */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Occupation
                </label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" value={formData.occupation} onChange={e => updateFormData('occupation', e.target.value)}>
                  <option value="">Select occupation (optional)</option>
                  {occupationOptions.map(occupation => <option key={occupation} value={occupation}>
                      {occupation}
                    </option>)}
                </select>
              </div>
            </div>
          </div>
          {/* Relationship & Setting */}
          <div className="mb-6 pb-6 border-b border-gray-700">
            <h3 className="font-medium text-lg mb-3">Relationship & Setting</h3>
            <div className="space-y-4">
              {/* Relationship - Required */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  <span className="text-purple-300">•</span> Your Relationship
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {relationshipOptions.slice(0, 6).map(relationship => <button key={relationship} className={`py-2 px-3 rounded-lg text-sm ${formData.relationship === relationship ? 'bg-gray-600 ring-1 ring-purple-500' : 'bg-gray-700 hover:bg-gray-600'}`} onClick={() => updateFormData('relationship', relationship)}>
                      {relationship}
                    </button>)}
                </div>
                {!formData.relationship && <div className="text-xs text-purple-300 mt-2 flex items-center">
                    <InfoIcon className="w-3 h-3 mr-1" />
                    <span>Please select a relationship type</span>
                  </div>}
              </div>
              {/* Location - Optional */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Location
                </label>
                <select className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" value={formData.location} onChange={e => updateFormData('location', e.target.value)}>
                  <option value="">Select location (optional)</option>
                  {locationOptions.map(location => <option key={location} value={location}>
                      {location}
                    </option>)}
                </select>
              </div>
            </div>
          </div>
          {/* Scenario Details - Optional */}
          <div>
            <h3 className="font-medium text-lg mb-3">Scenario Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Scenario Title
                </label>
                <input type="text" className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Enter scenario title (optional)" value={formData.scenarioName} onChange={e => updateFormData('scenarioName', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px]" placeholder="Describe your fantasy scenario (optional)" value={formData.description} onChange={e => updateFormData('description', e.target.value)} />
              </div>
            </div>
          </div>
        </div>
        {/* Right side - Live preview */}
        <div className="md:w-1/2 bg-gray-900 p-6 flex flex-col">
          <div className="sticky top-0">
            <h2 className="text-xl font-semibold mb-2">Live Preview</h2>
            <p className="text-sm text-gray-400 mb-6">
              Your fantasy updates in real-time as you make selections
            </p>
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div className="bg-gray-800 rounded-xl p-5 flex-1 overflow-hidden">
              {formData.star ? <div className="h-full flex flex-col">
                  <div className="border-b border-gray-700 pb-4 mb-4">
                    <div className="flex items-center">
                      <img src={formData.star.imageUrl} alt={formData.star.name} className="w-16 h-16 rounded-full object-cover mr-3 border-2 border-purple-500" />
                      <div>
                        <h3 className="text-lg font-medium">
                          {formData.personaName || 'Your Character'}
                        </h3>
                        <div className="flex items-center text-purple-400 mt-1">
                          <MicIcon className="w-4 h-4 mr-1" />
                          <span className="text-sm">
                            {formData.star.name}'s Voice
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {formData.age && <div className="bg-gray-700 rounded-lg p-3 flex items-center">
                          <UserIcon className="w-4 h-4 text-gray-400 mr-2" />
                          <div>
                            <p className="text-xs text-gray-400">Age</p>
                            <p className="text-sm">{formData.age}</p>
                          </div>
                        </div>}
                      {formData.personality && <div className="bg-gray-700 rounded-lg p-3 flex items-center">
                          <SparklesIcon className="w-4 h-4 text-gray-400 mr-2" />
                          <div>
                            <p className="text-xs text-gray-400">Personality</p>
                            <p className="text-sm">{formData.personality}</p>
                          </div>
                        </div>}
                      {formData.occupation && <div className="bg-gray-700 rounded-lg p-3 flex items-center">
                          <BriefcaseIcon className="w-4 h-4 text-gray-400 mr-2" />
                          <div>
                            <p className="text-xs text-gray-400">Occupation</p>
                            <p className="text-sm">{formData.occupation}</p>
                          </div>
                        </div>}
                      {formData.relationship && <div className="bg-gray-700 rounded-lg p-3 flex items-center">
                          <HeartIcon className="w-4 h-4 text-gray-400 mr-2" />
                          <div>
                            <p className="text-xs text-gray-400">
                              Relationship
                            </p>
                            <p className="text-sm">{formData.relationship}</p>
                          </div>
                        </div>}
                      {formData.location && <div className="bg-gray-700 rounded-lg p-3 flex items-center">
                          <MapPinIcon className="w-4 h-4 text-gray-400 mr-2" />
                          <div>
                            <p className="text-xs text-gray-400">Location</p>
                            <p className="text-sm">{formData.location}</p>
                          </div>
                        </div>}
                    </div>
                    {formData.description ? <div className="bg-gray-700 rounded-lg p-4 mt-4">
                        <h4 className="font-medium mb-2">
                          {formData.scenarioName || 'Your Scenario'}
                        </h4>
                        <p className="text-sm text-gray-300">
                          {formData.description}
                        </p>
                      </div> : <div className="bg-gray-700 bg-opacity-50 rounded-lg p-4 mt-4 border border-dashed border-gray-600 text-center">
                        <p className="text-gray-500">
                          Add a description to see your scenario details
                        </p>
                      </div>}
                    {/* Contextual help based on completion */}
                    {formData.star && !formData.personaName && <div className="mt-4 bg-blue-500 bg-opacity-10 rounded-lg p-3 border border-blue-500 border-opacity-20">
                        <div className="flex items-start">
                          <ArrowRightIcon className="w-4 h-4 text-blue-400 mr-2 mt-0.5" />
                          <p className="text-sm text-blue-300">
                            Now add a name for your character to bring them to
                            life
                          </p>
                        </div>
                      </div>}
                    {formData.star && formData.personaName && !formData.relationship && <div className="mt-4 bg-blue-500 bg-opacity-10 rounded-lg p-3 border border-blue-500 border-opacity-20">
                          <div className="flex items-start">
                            <ArrowRightIcon className="w-4 h-4 text-blue-400 mr-2 mt-0.5" />
                            <p className="text-sm text-blue-300">
                              Select a relationship type to define how you'll
                              interact
                            </p>
                          </div>
                        </div>}
                  </div>
                </div> : <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="bg-gray-700 rounded-full p-4 mb-4">
                    <SparklesIcon className="w-10 h-10 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">
                    Your Fantasy Preview
                  </h3>
                  <p className="text-gray-400 max-w-xs">
                    Select a voice on the left to start seeing your fantasy take
                    shape
                  </p>
                  <div className="mt-4 flex items-center text-purple-400">
                    <ArrowRightIcon className="w-4 h-4 mr-2" />
                    <span>Start by choosing a voice</span>
                  </div>
                </div>}
            </div>
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Completion</span>
                <span className="text-sm text-purple-400">
                  {getCompletionScore()}%
                </span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-600 to-blue-600" style={{
                width: `${getCompletionScore()}%`
              }}></div>
              </div>
              <button onClick={handleSubmit} disabled={!isReadyToCreate} className={`w-full mt-4 py-3 rounded-lg flex items-center justify-center ${isReadyToCreate ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' : 'bg-gray-700 opacity-50 cursor-not-allowed'}`}>
                {isReadyToCreate ? 'Create Fantasy' : 'Complete Required Fields'}
                <SparklesIcon className="w-5 h-5 ml-2" />
              </button>
              {!isReadyToCreate && <div className="text-xs text-purple-300 text-center mt-2">
                  <div className="flex items-center justify-center">
                    <InfoIcon className="w-3 h-3 mr-1" />
                    <span>Required fields: </span>
                  </div>
                  <div className="mt-1 flex flex-wrap justify-center gap-x-2">
                    {!formData.star && <span className="text-yellow-300">Voice</span>}
                    {!formData.personaName && <span className="text-yellow-300">Character Name</span>}
                    {!formData.relationship && <span className="text-yellow-300">Relationship</span>}
                  </div>
                </div>}
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default LivePreviewCreator;