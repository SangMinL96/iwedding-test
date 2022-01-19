import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

const ButtonBox = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

export default ButtonBox;
const Container = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > button {
    width: 90px;
    height: 30px;
    font-size: 13px;
  }
  .qaBtn {
    width: 90px;
    height: 30px;
    font-size: 13px;
    border: 1px solid #dfdfdf;
    color: #262626;
    ${props => props.theme.flexCenter};
  }
`;
