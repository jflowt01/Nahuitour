import React from 'react';
import { Check } from 'lucide-react';

export const ProgressStepper = ({ steps, currentStep }) => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between relative">
        <div className="absolute top-5 left-0 w-full h-0.5 bg-muted -z-10">
          <div
            className="h-full bg-primary transition-smooth"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={stepNumber} className="flex flex-col items-center relative">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-smooth ${
                  isCompleted
                    ? 'bg-primary text-primary-foreground'
                    : isCurrent
                    ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {isCompleted ? <Check className="h-5 w-5" /> : stepNumber}
              </div>
              <span className="text-xs font-medium mt-2 text-center max-w-[80px] sm:max-w-none">
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};