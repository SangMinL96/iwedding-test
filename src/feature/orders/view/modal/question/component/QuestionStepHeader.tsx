import React, { useCallback } from 'react';
import IconStepCricle from '@svgs/icon_step_circle';
import IconThreeDots from '@svgs/icon_three_dots';
interface StepProps {
  currentStep: number;
}

const QuestionStepHeader = ({ currentStep }: StepProps) => {
  const backgroundColor = useCallback((num: number) => (currentStep === num ? '#4866E4' : '#BEBEBE'), [currentStep]);
  return (
    <div className='step_header'>
      <div className='step_group'>
        <div className={`step_box ${currentStep === 1 ? 'on' : ''}`}>
          <IconStepCricle stepNum='1' backgorundColor={backgroundColor(1)} />
          <span className='step_text'>문의 상품 선택</span>
        </div>
        <div className='three_dots'>
          <IconThreeDots />
        </div>
        <div className={`step_box ${currentStep === 2 ? 'on' : ''}`}>
          <IconStepCricle stepNum='2' backgorundColor={backgroundColor(2)} />
          <span className='step_text'>문의 유형 선택</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionStepHeader;
