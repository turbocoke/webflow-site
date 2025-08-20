import React from 'react';
const StepIndicator = ({
  currentStep,
  totalSteps
}) => {
  return <div className="relative">
      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-700">
        <div style={{
        width: `${currentStep / totalSteps * 100}%`
      }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-[#65e8a4] to-[#41966a]"></div>
      </div>
      <div className="text-sm text-gray-400 text-center">
        Step {currentStep} of {totalSteps}
      </div>
    </div>;
};
export default StepIndicator;