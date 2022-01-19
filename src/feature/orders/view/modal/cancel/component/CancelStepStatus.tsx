import React, { useCallback } from 'react';
import IconStepCricle from '@svgs/icon_step_circle';
import IconThreeDots from '@svgs/icon_three_dots';

interface StepProps {
  currentStep: number;
}
const CancelStepStatus = ({ currentStep }: StepProps) => {
  const stepTitle = ['위약금 규정 확인', '취소 사유 선택', '취소 요청 확인'];
  const stepClass = useCallback(
    number => {
      return `step_box ${number === currentStep ? 'on' : ''}`;
    },
    [currentStep],
  );

  const stepColor = useCallback(
    number => {
      return number === currentStep ? '#4866E4' : '#BEBEBE';
    },
    [currentStep],
  );

  return (
    <div className='step_header'>
      <div className='step_group'>
        {stepTitle.map((title, index) => (
          <React.Fragment key={title}>
            <div className={stepClass(index + 1)} key={title}>
              <IconStepCricle stepNum={(index + 1).toString()} backgorundColor={stepColor(index + 1)} />
              <span className='step_text'>{title}</span>
            </div>
            {index !== stepTitle.length - 1 && (
              <div className='three_dots'>
                <IconThreeDots />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default CancelStepStatus;
