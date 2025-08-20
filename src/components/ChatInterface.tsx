import React, { useState } from 'react';
import { SendIcon, SettingsIcon, MicIcon, PauseIcon } from 'lucide-react';
const ChatInterface = ({
  lander,
  scenario
}) => {
  const [messages, setMessages] = useState([{
    id: 1,
    sender: 'ai',
    text: scenario.initialMessage || `Hey there! I'm ${lander.name}. ${scenario.description}`,
    timestamp: new Date().toISOString()
  }]);
  const [inputValue, setInputValue] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      text: inputValue,
      timestamp: new Date().toISOString()
    };
    setMessages([...messages, userMessage]);
    setInputValue('');
    // Simulate AI response
    setTimeout(() => {
      const aiMessage = {
        id: messages.length + 2,
        sender: 'ai',
        text: `This is a simulated response from ${lander.name} in the "${scenario.title}" scenario.`,
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };
  return <div className="bg-gray-800 rounded-xl overflow-hidden flex flex-col h-[600px]">
      {/* Chat header */}
      <div className="bg-gray-900 p-4 flex justify-between items-center border-b border-gray-700">
        <div className="flex items-center">
          <img src={lander.imageUrl} alt={lander.name} className="w-10 h-10 rounded-full object-cover mr-3" />
          <div>
            <h3 className="font-bold">{lander.name}</h3>
            <p className="text-xs text-gray-400">{scenario.title}</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white">
          <SettingsIcon className="w-5 h-5" />
        </button>
      </div>
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-lg p-3 ${message.sender === 'user' ? 'bg-[#65e8a4] text-black' : 'bg-gray-700 text-white'}`}>
              {message.sender === 'ai' && <div className="flex items-center mb-1">
                  <img src={lander.imageUrl} alt={lander.name} className="w-6 h-6 rounded-full object-cover mr-2" />
                  <span className="text-xs font-semibold">{lander.name}</span>
                  <button className="ml-2 text-gray-400 hover:text-white" onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <PauseIcon className="w-3 h-3" /> : <MicIcon className="w-3 h-3" />}
                  </button>
                </div>}
              <p>{message.text}</p>
              <div className="text-right mt-1">
                <span className="text-xs text-gray-400">
                  {new Date(message.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
                </span>
              </div>
            </div>
          </div>)}
      </div>
      {/* Chat input */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center bg-gray-700 rounded-lg">
          <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} onKeyPress={e => e.key === 'Enter' && handleSendMessage()} placeholder="Type your message..." className="flex-1 bg-transparent border-none outline-none p-3 text-white" />
          <button className="p-3 text-[#65e8a4] hover:text-[#41966a]" onClick={handleSendMessage}>
            <SendIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>;
};
export default ChatInterface;