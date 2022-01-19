import React from 'react';
import styled from 'styled-components';

const Divider = (props: any) => <Div {...props} />;

export default Divider;

const Div = styled.div`
  width: 100%;
  height: 6px;
  background-color: #e9ecef;
  border-top: 1px solid #dddddd;
`;
