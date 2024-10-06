'use client'

import useSettingsStore from '@/stores/useSettingsStore';
import Step1 from "../steps/Step1";
import Step2 from "../steps/Step2";
import Step3 from "../steps/Step3";
import Step4 from "../steps/Step4";

const Texts = () => {
  const { currentStep, setCurrentStep } = useSettingsStore();

  return (
    <section className="absolute grid place-items-center w-1/2 z-10 top-0 right-0 h-full p-4 select-none pointer-events-none">
      <div className="w-3/5">
        { currentStep === 1 ? (
          <Step1 />
        ) : currentStep === 2 ? (
          <Step2 />
        ) :  currentStep === 3 ? (
          <Step3 />
        ) : ( 
          <Step4 />
        )}
      </div>
    </section>
  );
};

export default Texts;
