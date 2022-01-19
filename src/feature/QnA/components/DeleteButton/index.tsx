import React from 'react';
import styled from 'styled-components';
import deleteText from '@images/common/delete_text_icon.png';
import Image from 'next/image';

interface Props {
  onClick: () => void;
}

const index = ({ onClick }: Props) => {
  return (
    <DeleteButton onClick={onClick} type='reset'>
      <Image unoptimized src={deleteText} alt='delete-text-btn' />
    </DeleteButton>
  );
};

export default index;

const Button = styled.button`
  ${props => props.theme.resetBtnStyle}
  background-color: #fff;
  width: 20px;
  height: 20px;
  position: absolute;
  bottom: 15px;
  cursor: pointer;
  > img {
    width: 20px;
    height: 20px;
  }
`;

const DeleteButton = styled(Button)`
  right: 18px;
`;
