import React from 'react';
import styled from 'styled-components';

interface searchWord {
  word: string;
}

const SearchWordItem = ({ word }: searchWord) => {
  return (
    <Item>
      <a># {word}</a>
    </Item>
  );
};

export default SearchWordItem;

const Item = styled.li`
  display: inline-block;
  vertical-align: top;
  padding: 9px 10px;
  border: 1px solid rgba(0, 77, 220, 0.3);
  border-radius: 7px;
  margin: 5px;
  cursor: pointer;

  font-size: 14px;
  font-weight: bold;
  &:first-child {
    margin-left: 0;
  }
  > a {
    color: #004ddc;
  }
`;
