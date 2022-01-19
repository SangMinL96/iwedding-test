import IconStepCricle from '@svgs/icon_step_circle';
import IconThreeDots from '@svgs/icon_three_dots';
import React, { useCallback } from 'react';
interface StepProps {
  currentStep: number;
}

const BalanceStepHeader = ({ currentStep }: StepProps) => {
  const backgroundColor = useCallback((num: number) => (currentStep === num ? '#4866E4' : '#BEBEBE'), [currentStep]);
  return (
    <div className='step_header'>
      <div className='step_group'>
        <div className={`step_box ${currentStep === 1 ? 'on' : ''}`}>
          <IconStepCricle stepNum='1' backgorundColor={backgroundColor(1)} />
          <span className='step_text'>결제 정보 확인</span>
        </div>
        <div className='three_dots'>
          <IconThreeDots />
        </div>
        <div className={`step_box ${currentStep === 2 ? 'on' : ''}`}>
          <IconStepCricle stepNum='2' backgorundColor={backgroundColor(2)} />
          <span className='step_text'>결제 결과 확인</span>
        </div>
      </div>
    </div>
  );
};

export default BalanceStepHeader;
