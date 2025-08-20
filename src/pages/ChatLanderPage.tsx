import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftIcon, PlusIcon, MicIcon, SettingsIcon } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ChatInterface from '../components/ChatInterface';
import ScenarioCard from '../components/ScenarioCard';
import { mockLanders, mockScenarios, mockUserScenarios } from '../data/mockData';
const ChatLanderPage = () => {
  const {
    id
  } = useParams();
  const lander = mockLanders.find(l => l.id === id) || mockLanders[0];
  const [activeScenario, setActiveScenario] = useState(null);
  const [activeTab, setActiveTab] = useState('featured');
  const chatContainerRef = useRef(null);
  // Handle scenario selection and scrolling
  const handleScenarioSelect = scenario => {
    setActiveScenario(scenario);
    // Use setTimeout to ensure the DOM has updated before scrolling
    setTimeout(() => {
      if (chatContainerRef.current) {
        // For mobile: scroll the chat into view
        chatContainerRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  };
  return <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-gray-300 hover:text-white mb-6">
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to all landers
        </Link>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left sidebar - Voice and scenarios */}
          <div className="lg:w-1/3">
            <div className="bg-gray-800 rounded-xl p-6 mb-6">
              <div className="flex items-center">
                <img src={lander.imageUrl} alt={lander.name} className="w-16 h-16 rounded-full object-cover mr-4" />
                <div>
                  <h1 className="text-2xl font-bold">{lander.name}</h1>
                  <div className="flex items-center text-purple-400 mt-1">
                    <MicIcon className="w-4 h-4 mr-1" />
                    <span>Authentic Voice</span>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-gray-300">{lander.description}</p>
            </div>
            <div className="bg-gray-800 rounded-xl overflow-hidden">
              <div className="flex border-b border-gray-700">
                <button className={`flex-1 py-3 text-center ${activeTab === 'featured' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700/50'}`} onClick={() => setActiveTab('featured')}>
                  Featured Scenarios
                </button>
                <button className={`flex-1 py-3 text-center ${activeTab === 'user' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700/50'}`} onClick={() => setActiveTab('user')}>
                  User Created
                </button>
              </div>
              <div className="p-4 max-h-[500px] overflow-y-auto">
                <div className="grid grid-cols-1 gap-4">
                  {activeTab === 'featured' ? mockScenarios.map(scenario => <ScenarioCard key={scenario.id} scenario={scenario} isActive={activeScenario?.id === scenario.id} onClick={() => handleScenarioSelect(scenario)} />) : <>
                      <button className="flex items-center justify-center p-4 border border-dashed border-gray-600 rounded-lg hover:bg-gray-700/50 transition-colors">
                        <PlusIcon className="w-5 h-5 mr-2 text-purple-400" />
                        <span>Create New Scenario</span>
                      </button>
                      {mockUserScenarios.map(scenario => <ScenarioCard key={scenario.id} scenario={scenario} isActive={activeScenario?.id === scenario.id} onClick={() => handleScenarioSelect(scenario)} isUserCreated />)}
                    </>}
                </div>
              </div>
            </div>
          </div>
          {/* Right side - Chat interface */}
          <div className="lg:w-2/3" ref={chatContainerRef}>
            {activeScenario ? <ChatInterface lander={lander} scenario={activeScenario} /> : <div className="bg-gray-800 rounded-xl p-8 h-[600px] flex flex-col items-center justify-center">
                <img src={lander.imageUrl} alt={lander.name} className="w-24 h-24 rounded-full object-cover mb-6 border-4 border-purple-500" />
                <h2 className="text-2xl font-bold mb-2">
                  Start chatting with {lander.name}
                </h2>
                <p className="text-gray-300 text-center max-w-md mb-8">
                  Select a scenario from the left or create your own custom
                  experience.
                </p>
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105">
                  Select a Scenario
                </button>
              </div>}
          </div>
        </div>
      </main>
      <Footer />
    </div>;
};
export default ChatLanderPage;