import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SendIcon, SparklesIcon, UserIcon, CheckIcon, RefreshCwIcon } from 'lucide-react';
import { mockLanders } from '../../../data/mockData';
import { ageOptions, personalityOptions, relationshipOptions, occupationOptions, locationOptions } from '../../../data/fantasyOptions';
import PostCreationSuccess from '../PostCreationSuccess';
// Conversational Creator with chat-like interface
const ConversationalCreator = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState('voice');
  const [formData, setFormData] = useState({
    star: null,
    age: '',
    personality: '',
    relationship: '',
    occupation: '',
    location: '',
    description: '',
    personaName: '',
    scenarioName: ''
  });
  const [isCreated, setIsCreated] = useState(false);
  const [createdFantasy, setCreatedFantasy] = useState(null);
  const [messages, setMessages] = useState([{
    id: 1,
    sender: 'assistant',
    text: "Hi there! I'll help you create your perfect fantasy. Let's start by choosing a voice. Who would you like to talk with?",
    options: mockLanders.slice(0, 4).map(lander => ({
      value: lander.id,
      label: lander.name,
      image: lander.imageUrl
    }))
  }]);
  // Scroll to bottom of chat on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  }, [messages]);
  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const addMessage = (sender, text, options = null) => {
    setMessages(prev => [...prev, {
      id: prev.length + 1,
      sender,
      text,
      options
    }]);
  };
  const handleOptionSelect = (option, questionType) => {
    switch (questionType) {
      case 'voice':
        const selectedLander = mockLanders.find(l => l.id === option.value);
        updateFormData('star', selectedLander);
        addMessage('user', `I'd like to talk with ${option.label}`);
        setTimeout(() => {
          addMessage('assistant', `Great choice! What name would you like to give ${option.label}'s character in your fantasy?`);
          setCurrentQuestion('name');
        }, 500);
        break;
      case 'name':
        updateFormData('personaName', option.value);
        addMessage('user', option.value);
        setTimeout(() => {
          addMessage('assistant', `Nice to meet you, I'll be ${option.value}! What kind of relationship would you like us to have?`, relationshipOptions.slice(0, 6).map(rel => ({
            value: rel,
            label: rel
          })));
          setCurrentQuestion('relationship');
        }, 500);
        break;
      case 'relationship':
        updateFormData('relationship', option.value);
        addMessage('user', `I'd like you to be my ${option.value.toLowerCase()}`);
        setTimeout(() => {
          addMessage('assistant', `I'd be happy to be your ${option.value.toLowerCase()}! Where would you like this scenario to take place?`, locationOptions.slice(0, 6).map(loc => ({
            value: loc,
            label: loc
          })));
          setCurrentQuestion('location');
        }, 500);
        break;
      case 'location':
        updateFormData('location', option.value);
        addMessage('user', `Let's meet at a ${option.value.toLowerCase()}`);
        setTimeout(() => {
          addMessage('assistant', `A ${option.value.toLowerCase()} sounds perfect! Would you like to add more details or create your fantasy now?`, [{
            value: 'more',
            label: 'Add more details'
          }, {
            value: 'create',
            label: 'Create fantasy now'
          }]);
          setCurrentQuestion('more_or_create');
        }, 500);
        break;
      case 'more_or_create':
        if (option.value === 'create') {
          addMessage('user', "Let's create the fantasy now");
          setTimeout(() => {
            addMessage('assistant', "Perfect! I'm creating your fantasy scenario now...");
            setTimeout(() => {
              addMessage('assistant', 'Your fantasy has been created! You can now start chatting with your character.', [{
                value: 'start',
                label: 'Start Conversation'
              }]);
              setCurrentQuestion('complete');
            }, 1500);
          }, 500);
        } else {
          addMessage('user', "I'd like to add more details");
          setTimeout(() => {
            addMessage('assistant', 'Great! What else would you like to specify?', [{
              value: 'personality',
              label: 'Personality'
            }, {
              value: 'occupation',
              label: 'Occupation'
            }, {
              value: 'age',
              label: 'Age'
            }, {
              value: 'description',
              label: 'Scenario Description'
            }]);
            setCurrentQuestion('additional_details');
          }, 500);
        }
        break;
      case 'additional_details':
        addMessage('user', `I'd like to specify the ${option.value}`);
        switch (option.value) {
          case 'personality':
            setTimeout(() => {
              addMessage('assistant', 'What kind of personality would you like me to have?', personalityOptions.slice(0, 6).map(p => ({
                value: p,
                label: p
              })));
              setCurrentQuestion('personality');
            }, 500);
            break;
          case 'occupation':
            setTimeout(() => {
              addMessage('assistant', 'What occupation would you like me to have?', occupationOptions.slice(0, 6).map(o => ({
                value: o,
                label: o
              })));
              setCurrentQuestion('occupation');
            }, 500);
            break;
          case 'age':
            setTimeout(() => {
              addMessage('assistant', 'What age range would you prefer?', ageOptions.map(a => ({
                value: a,
                label: a
              })));
              setCurrentQuestion('age');
            }, 500);
            break;
          case 'description':
            setTimeout(() => {
              addMessage('assistant', "Please describe the scenario you have in mind. What's the context of our interaction?");
              setCurrentQuestion('description');
            }, 500);
            break;
        }
        break;
      case 'personality':
      case 'occupation':
      case 'age':
        updateFormData(questionType, option.value);
        addMessage('user', `I'd like you to be ${option.value}`);
        setTimeout(() => {
          addMessage('assistant', `Great! I'll be ${option.value}. Would you like to add more details or create your fantasy now?`, [{
            value: 'more',
            label: 'Add more details'
          }, {
            value: 'create',
            label: 'Create fantasy now'
          }]);
          setCurrentQuestion('more_or_create');
        }, 500);
        break;
      case 'complete':
        handleSubmit();
        break;
      default:
        break;
    }
  };
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    switch (currentQuestion) {
      case 'name':
        handleOptionSelect({
          value: inputValue
        }, 'name');
        break;
      case 'description':
        updateFormData('description', inputValue);
        addMessage('user', inputValue);
        setTimeout(() => {
          addMessage('assistant', 'Thank you for the description! Would you like to add more details or create your fantasy now?', [{
            value: 'more',
            label: 'Add more details'
          }, {
            value: 'create',
            label: 'Create fantasy now'
          }]);
          setCurrentQuestion('more_or_create');
        }, 500);
        break;
      default:
        addMessage('user', inputValue);
        setTimeout(() => {
          addMessage('assistant', "I'm not sure how to respond to that. Let's continue with our setup.");
        }, 500);
        break;
    }
    setInputValue('');
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
  const renderMessageContent = message => {
    if (message.sender === 'user') {
      return <div className="bg-purple-600 text-white rounded-lg py-3 px-4 max-w-[80%] ml-auto">
          {message.text}
        </div>;
    }
    return <div className="space-y-4 max-w-[80%]">
        <div className="bg-gray-700 text-white rounded-lg py-3 px-4">
          {message.text}
        </div>
        {message.options && <div className="flex flex-wrap gap-2">
            {message.options.map((option, index) => <button key={index} className="bg-gray-700 hover:bg-gray-600 text-white rounded-lg py-2 px-4 flex items-center transition-colors" onClick={() => handleOptionSelect(option, currentQuestion)}>
                {option.image && <img src={option.image} alt={option.label} className="w-6 h-6 rounded-full mr-2 object-cover" />}
                {option.label}
              </button>)}
          </div>}
      </div>;
  };
  // If fantasy is created, show success screen
  if (isCreated && createdFantasy) {
    return <PostCreationSuccess fantasy={createdFantasy} />;
  }
  return <div className="bg-gray-800 rounded-xl overflow-hidden flex flex-col" style={{
    height: '600px'
  }}>
      {/* Chat header */}
      <div className="bg-gray-900 p-4 flex justify-between items-center border-b border-gray-700">
        <div className="flex items-center">
          <div className="bg-purple-600 bg-opacity-20 rounded-full p-2 mr-3">
            <SparklesIcon className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h3 className="font-bold">Fantasy Creator</h3>
            <p className="text-xs text-gray-400">Conversational Interface</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-700" onClick={() => {
        setMessages([messages[0]]);
        setFormData({
          star: null,
          age: '',
          personality: '',
          relationship: '',
          occupation: '',
          location: '',
          description: '',
          personaName: '',
          scenarioName: ''
        });
        setCurrentQuestion('voice');
      }}>
          <RefreshCwIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map(message => <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.sender === 'assistant' && <div className="bg-purple-600 rounded-full p-2 mr-2 h-min">
                <SparklesIcon className="w-5 h-5 text-white" />
              </div>}
            {renderMessageContent(message)}
            {message.sender === 'user' && <div className="bg-gray-700 rounded-full p-2 ml-2 h-min">
                <UserIcon className="w-5 h-5 text-gray-300" />
              </div>}
          </div>)}
        <div ref={messagesEndRef} />
      </div>

      {/* Progress indicator */}
      {currentQuestion !== 'complete' && <div className="bg-gray-900 px-4 py-2 border-t border-gray-700">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>Creating your fantasy...</span>
            <div className="flex items-center space-x-2">
              <span className={`flex items-center ${formData.star ? 'text-green-400' : 'text-gray-500'}`}>
                {formData.star ? <CheckIcon className="w-3 h-3 mr-1" /> : ''}{' '}
                Voice
              </span>
              <span className={`flex items-center ${formData.personaName ? 'text-green-400' : 'text-gray-500'}`}>
                {formData.personaName ? <CheckIcon className="w-3 h-3 mr-1" /> : ''}{' '}
                Name
              </span>
              <span className={`flex items-center ${formData.relationship ? 'text-green-400' : 'text-gray-500'}`}>
                {formData.relationship ? <CheckIcon className="w-3 h-3 mr-1" /> : ''}{' '}
                Relationship
              </span>
              <span className={`flex items-center ${formData.location ? 'text-green-400' : 'text-gray-500'}`}>
                {formData.location ? <CheckIcon className="w-3 h-3 mr-1" /> : ''}{' '}
                Location
              </span>
            </div>
          </div>
        </div>}

      {/* Chat input */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center bg-gray-700 rounded-lg">
          <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} placeholder={currentQuestion === 'name' ? 'Enter character name...' : currentQuestion === 'description' ? 'Describe your scenario...' : 'Type your message...'} className="flex-1 bg-transparent border-none outline-none p-3 text-white" />
          <button className="p-3 text-purple-400 hover:text-purple-300" onClick={handleSendMessage}>
            <SendIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>;
};
export default ConversationalCreator;