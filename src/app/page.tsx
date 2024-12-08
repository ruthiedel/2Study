"use client"
import React from 'react';
import { Homepage } from '@/components';
import Wizard from '@/components/Graghs/Wizard/Wizard';

const SomeComponent = () => {
  const StepOne = () => <div>Step 1: Welcome to the Wizard! 🎉</div>;
  const StepTwo = () => <div>Step 2: Let's add some details! ✍️</div>;
  const StepThree = () => <div>Step 3: Review your progress! 📊</div>;
  const steps = [<StepOne key="1" />, <StepTwo key="2" />, <StepThree key="3" />];

  return (
    <div>
      <Homepage/>
      <Wizard steps={steps} />
    </div>
  );
};

export default SomeComponent;