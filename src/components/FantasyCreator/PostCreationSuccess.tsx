import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquareIcon, SendIcon, CreditCardIcon, PlayIcon, ArrowRightIcon, HeartIcon, CheckIcon, StarIcon, EditIcon, XIcon, DollarSignIcon } from 'lucide-react';
const PostCreationSuccess = ({
  fantasy
}) => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  const [tipAmount, setTipAmount] = useState(0);
  const [isCustomTip, setIsCustomTip] = useState(false);
  const [customTipAmount, setCustomTipAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showTipInfo, setShowTipInfo] = useState(false);
  // Pre-written message templates
  const messageTemplates = ['Hey, check out this fantasy I created with your voice! What do you think?', 'I made this scenario featuring you. Would love your feedback!', 'Created this fantasy with you in mind. Hope you like it!', 'This is how I imagine our conversation would go. Thoughts?'];
  // Effect to track when custom tip is entered
  useEffect(() => {
    if (isCustomTip && customTipAmount) {
      const numericValue = parseFloat(customTipAmount);
      if (!isNaN(numericValue) && numericValue > 0) {
        setTipAmount(numericValue);
      }
    }
  }, [customTipAmount, isCustomTip]);
  const handleStartChat = () => {
    // Navigate to chat interface with the created fantasy
    navigate(`/chat/${fantasy.id}`);
  };
  const handleSendDM = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Redirect after success message
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }, 1500);
  };
  const handleSelectTemplate = template => {
    setMessage(template);
  };
  const handleCustomTipChange = e => {
    // Only allow numbers and decimals
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setCustomTipAmount(value);
  };
  const handleTipSelect = amount => {
    if (amount === 'custom') {
      setIsCustomTip(true);
      setCustomTipAmount('');
    } else {
      setIsCustomTip(false);
      setTipAmount(amount);
    }
  };
  const confirmCustomTip = () => {
    const numericValue = parseFloat(customTipAmount);
    if (!isNaN(numericValue) && numericValue > 0) {
      setTipAmount(numericValue);
      setIsCustomTip(false);
    }
  };
  if (isSuccess) {
    return <div className="bg-gray-800 rounded-xl p-6 text-center">
        <div className="bg-[#65e8a4] bg-opacity-20 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <CheckIcon className="w-8 h-8 text-[#65e8a4]" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Successfully Sent!</h2>
        <p className="text-gray-300 mb-4">
          Your fantasy has been sent to {fantasy?.star?.name}. You'll receive a
          notification when they respond.
        </p>
        {tipAmount > 0 && <div className="mb-6 bg-[#65e8a4] bg-opacity-10 rounded-lg p-3 border border-[#65e8a4] border-opacity-20 inline-block">
            <div className="flex items-center">
              <StarIcon className="w-5 h-5 text-yellow-400 mr-2" />
              <span className="text-[#65e8a4]">
                Thank you for your ${tipAmount.toFixed(2)} tip!
              </span>
            </div>
          </div>}
        <div className="mt-4 text-sm text-gray-400">Redirecting to home...</div>
      </div>;
  }
  return <div className="bg-[#141414] rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-[#65e8a4] to-[#41966a] p-6 text-center">
        <div className="bg-white bg-opacity-20 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <HeartIcon className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Fantasy Created!</h2>
        <p className="text-white text-opacity-90">
          Your fantasy with {fantasy?.star?.name} as {fantasy?.personaName} is
          ready.
        </p>
      </div>

      {!selectedOption ? <div className="p-6">
          <h3 className="text-xl font-medium mb-4 text-center">
            What would you like to do next?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-800 hover:bg-gray-700 rounded-xl p-5 cursor-pointer transition-all border-2 border-transparent hover:border-[#65e8a4] h-full flex flex-col" onClick={() => setSelectedOption('chat')}>
              <div className="flex items-center mb-3">
                <div className="bg-[#65e8a4] bg-opacity-20 rounded-full p-3 mr-3">
                  <PlayIcon className="w-6 h-6 text-[#65e8a4]" />
                </div>
                <h4 className="text-lg font-medium">Start Chatting</h4>
              </div>
              <p className="text-gray-300 text-sm flex-grow">
                Begin your conversation with {fantasy?.personaName} right away
                and explore your fantasy in a private chat.
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs bg-[#65e8a4] bg-opacity-20 text-[#65e8a4] py-1 px-2 rounded-full">
                  Instant Access
                </span>
                <ArrowRightIcon className="w-5 h-5 text-[#65e8a4]" />
              </div>
            </div>
            <div className="bg-gray-800 hover:bg-gray-700 rounded-xl p-5 cursor-pointer transition-all border-2 border-transparent hover:border-[#65e8a4] h-full flex flex-col" onClick={() => setSelectedOption('dm')}>
              <div className="flex items-center mb-3">
                <div className="bg-[#65e8a4] bg-opacity-20 rounded-full p-3 mr-3">
                  <SendIcon className="w-6 h-6 text-[#65e8a4]" />
                </div>
                <h4 className="text-lg font-medium">
                  Send to {fantasy?.star?.name}
                </h4>
              </div>
              <p className="text-gray-300 text-sm flex-grow">
                Share your creation directly with {fantasy?.star?.name} and get
                a personalized response from them.
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xs bg-[#65e8a4] bg-opacity-20 text-[#65e8a4] py-1 px-2 rounded-full">
                  Personal Response
                </span>
                <ArrowRightIcon className="w-5 h-5 text-[#65e8a4]" />
              </div>
            </div>
          </div>
          <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 text-center">
            <p className="text-sm text-gray-400">
              You can always find your creations in your profile to access them
              later.
            </p>
          </div>
        </div> : selectedOption === 'chat' ? <div className="p-6">
          <button onClick={() => setSelectedOption(null)} className="text-gray-400 hover:text-white mb-4 flex items-center text-sm">
            <ArrowRightIcon className="w-4 h-4 mr-1 transform rotate-180" />
            Back to options
          </button>
          <div className="bg-gray-800 rounded-xl p-5 mb-6">
            <div className="flex items-center">
              {fantasy?.star && <img src={fantasy.star.imageUrl} alt={fantasy.star.name} className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-[#65e8a4]" />}
              <div>
                <h4 className="font-medium text-lg">
                  {fantasy?.personaName || 'Your Character'}
                </h4>
                <p className="text-gray-400 text-sm">
                  {fantasy?.relationship || 'Relationship'} •{' '}
                  {fantasy?.location || 'Location'}
                </p>
              </div>
            </div>
            {fantasy?.description && <div className="mt-4 text-sm text-gray-300 bg-gray-700 bg-opacity-50 p-3 rounded-lg">
                {fantasy.description}
              </div>}
          </div>
          <div className="text-center">
            <div className="bg-gray-800 rounded-lg p-4 mb-6 text-left">
              <h4 className="text-sm font-medium mb-2 text-gray-300">
                What to expect:
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start">
                  <CheckIcon className="w-4 h-4 text-[#65e8a4] mr-2 mt-0.5" />
                  <span>Private conversation with {fantasy?.personaName}</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="w-4 h-4 text-[#65e8a4] mr-2 mt-0.5" />
                  <span>
                    Authentic voice responses using {fantasy?.star?.name}'s
                    voice
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="w-4 h-4 text-[#65e8a4] mr-2 mt-0.5" />
                  <span>
                    Continue your fantasy scenario exactly as you created it
                  </span>
                </li>
              </ul>
            </div>
            <button onClick={handleStartChat} className="bg-[#65e8a4] hover:bg-[#41966a] text-black font-medium py-3 px-8 rounded-lg transition-all inline-flex items-center">
              <MessageSquareIcon className="w-5 h-5 mr-2" />
              Start Conversation
            </button>
            <p className="mt-4 text-sm text-gray-400">
              Begin your immersive chat experience with {fantasy?.personaName}
            </p>
          </div>
        </div> : <div className="p-6">
          <button onClick={() => setSelectedOption(null)} className="text-gray-400 hover:text-white mb-4 flex items-center text-sm">
            <ArrowRightIcon className="w-4 h-4 mr-1 transform rotate-180" />
            Back to options
          </button>
          <h3 className="text-lg font-medium mb-4">
            Send to {fantasy?.star?.name}
          </h3>
          <div className="bg-gray-800 rounded-xl p-5 mb-6">
            <div className="flex items-center mb-4">
              {fantasy?.star && <img src={fantasy.star.imageUrl} alt={fantasy.star.name} className="w-12 h-12 rounded-full object-cover mr-3" />}
              <div>
                <h4 className="font-medium">{fantasy?.star?.name}</h4>
                <p className="text-xs text-[#65e8a4]">
                  Will receive your fantasy
                </p>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Message (Optional)
              </label>
              <textarea className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#65e8a4] min-h-[100px]" placeholder="Add a personal message..." value={message} onChange={e => setMessage(e.target.value)} />
              <div className="mt-2">
                <p className="text-xs text-gray-400 mb-2">Quick templates:</p>
                <div className="flex flex-wrap gap-2">
                  {messageTemplates.map((template, index) => <button key={index} className="text-xs bg-gray-700 hover:bg-gray-600 rounded-full px-3 py-1 transition-colors" onClick={() => handleSelectTemplate(template)}>
                      {template.length > 30 ? template.substring(0, 30) + '...' : template}
                    </button>)}
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-4 pt-4">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  Add a Tip (Optional)
                </label>
                <button className="text-xs text-[#65e8a4] hover:text-[#41966a] flex items-center" onClick={() => setShowTipInfo(!showTipInfo)}>
                  {showTipInfo ? 'Hide info' : 'Why tip?'}
                </button>
              </div>
              {showTipInfo && <div className="bg-[#65e8a4] bg-opacity-10 rounded-lg p-3 border border-[#65e8a4] border-opacity-20 mb-3">
                  <div className="text-sm text-[#65e8a4]">
                    <p className="mb-2">Tipping helps you:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Support {fantasy?.star?.name} directly</li>
                      <li>Get prioritized in their response queue</li>
                      <li>
                        Increase chances of a detailed, personalized response
                      </li>
                    </ul>
                  </div>
                </div>}
              {isCustomTip ? <div className="mb-4">
                  <div className="flex items-center bg-gray-700 rounded-lg border border-[#65e8a4] overflow-hidden">
                    <div className="bg-gray-800 px-3 py-2">
                      <DollarSignIcon className="w-5 h-5 text-gray-300" />
                    </div>
                    <input type="text" className="flex-1 bg-transparent border-none outline-none px-3 py-2 text-white" placeholder="Enter amount" value={customTipAmount} onChange={handleCustomTipChange} autoFocus />
                    <div className="flex">
                      <button onClick={() => setIsCustomTip(false)} className="bg-gray-800 px-3 py-2 text-gray-400 hover:text-white">
                        <XIcon className="w-5 h-5" />
                      </button>
                      <button onClick={confirmCustomTip} className="bg-[#65e8a4] px-3 py-2 text-black" disabled={!customTipAmount || isNaN(parseFloat(customTipAmount)) || parseFloat(customTipAmount) <= 0}>
                        <CheckIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div> : <div className="grid grid-cols-5 gap-2 mb-4">
                  {[0, 5, 10, 20, 50].map(amount => <button key={amount} className={`py-2 rounded-lg transition-colors ${tipAmount === amount ? 'bg-[#65e8a4] text-black' : 'bg-gray-700 hover:bg-gray-600 text-gray-200'}`} onClick={() => handleTipSelect(amount)}>
                      {amount === 0 ? 'No tip' : `$${amount}`}
                    </button>)}
                  <button className={`py-2 rounded-lg transition-colors bg-gray-700 hover:bg-gray-600 text-gray-200 flex items-center justify-center`} onClick={() => handleTipSelect('custom')}>
                    <EditIcon className="w-4 h-4 mr-1" />
                    <span>Custom</span>
                  </button>
                </div>}
              {tipAmount > 0 && <div className="bg-[#65e8a4] bg-opacity-10 rounded-lg p-3 border border-[#65e8a4] border-opacity-20 flex items-start">
                  <StarIcon className="w-4 h-4 text-yellow-400 mr-2 mt-0.5" />
                  <div className="text-sm text-[#65e8a4]">
                    <p className="font-medium">
                      You're adding a ${tipAmount.toFixed(2)} tip
                    </p>
                    <p className="mt-1">
                      Tips increase your chances of getting a personalized
                      response from {fantasy?.star?.name}.
                    </p>
                  </div>
                </div>}
            </div>
          </div>
          <div className="text-center">
            <div className="bg-gray-800 rounded-lg p-4 mb-6 text-left">
              <h4 className="text-sm font-medium mb-2 text-gray-300">
                What to expect:
              </h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start">
                  <CheckIcon className="w-4 h-4 text-[#65e8a4] mr-2 mt-0.5" />
                  <span>
                    Personal response from the real {fantasy?.star?.name}
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="w-4 h-4 text-[#65e8a4] mr-2 mt-0.5" />
                  <span>Notification when they respond to your message</span>
                </li>
                <li className="flex items-start">
                  <CheckIcon className="w-4 h-4 text-[#65e8a4] mr-2 mt-0.5" />
                  <span>Start of a potential ongoing conversation</span>
                </li>
              </ul>
            </div>
            <button onClick={handleSendDM} disabled={isSubmitting} className="bg-[#65e8a4] hover:bg-[#41966a] text-black font-medium py-3 px-8 rounded-lg transition-all inline-flex items-center">
              {isSubmitting ? <>
                  <div className="w-5 h-5 mr-2 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  Sending...
                </> : <>
                  <SendIcon className="w-5 h-5 mr-2" />
                  Send to {fantasy?.star?.name}
                </>}
            </button>
            <p className="mt-4 text-sm text-gray-400">
              {fantasy?.star?.name} typically responds within 24 hours
            </p>
          </div>
        </div>}
    </div>;
};
export default PostCreationSuccess;