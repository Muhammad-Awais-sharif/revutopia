import { cn } from '../../utils/clsx.utils';
import { FormStepsProps } from './form-steps.types';

export function FormSteps({ steps }: FormStepsProps) {
  return (
    <div className="flex w-full items-center">
      {steps.map((step, index) => (
        <div key={step.id} className="flex flex-col items-start gap-2.5 flex-1">
          <div className="flex flex-col items-center justify-center gap-2 w-full">
            <div className="flex items-start w-full">
              <div className="inline-flex items-center justify-center">
                <div
                  className={cn(
                    'w-4 h-4 rounded-full',
                    step.completed ? 'bg-[#2A9D8F]' : 'bg-[#E4E3E3]'
                  )}
                />
              </div>
              {index < steps.length - 1 && (
                <div className="flex h-4 items-center flex-1">
                  <div
                    className={cn(
                      'flex-1 h-0.5',
                      step.completed ? 'bg-[#2A9D8F]' : 'bg-[#E4E3E3]'
                    )}
                  />
                </div>
              )}
            </div>

            <div className="flex items-center w-full">
              <div
                className={cn(
                  "w-fit font-['Poppins'] text-base text-center leading-[18px] whitespace-nowrap",
                  step.active
                    ? 'font-medium text-[#2A9D8F]'
                    : 'font-normal text-[#7C8BA0]'
                )}
              >
                {step.name}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
