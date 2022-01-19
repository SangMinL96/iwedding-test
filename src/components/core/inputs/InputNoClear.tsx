import React, { useCallback, useState } from 'react';

interface InputWithClearProps {
  onChangeText: (text: string) => void;
  placeHolder?: string;
}

const InputNoClear = ({ onChangeText, placeHolder }: InputWithClearProps) => {
  const [text, setText] = useState('');
  const mOnChangeText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setText(e.target.value);
      onChangeText(e.target.value);
    },
    [setText, onChangeText],
  );
  return (
    <div>
      <div className='input-box'>
        <p className='info-title'>제목</p>
        <div className={text.length > 1 ? 'title-input-box on' : 'title-input-box'}>
          <input type='text' placeholder={placeHolder || ''} id='estimate-title' onChange={mOnChangeText} value={text} />
        </div>
        <div className='item-divide-line' />
      </div>
    </div>
  );
};

export default InputNoClear;
