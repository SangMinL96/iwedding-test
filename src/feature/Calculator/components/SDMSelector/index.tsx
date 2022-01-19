import React from 'react';
import styled from 'styled-components';
import { useCalculatorState } from '../../store/calcStore';
import { CategoryItem } from './CategoryItem';

const SDMSelector = () => {
  const calcItems = useCalculatorState(state => state.calcItems);

  return (
    <Container>
      {calcItems.map(item => (
        <CategoryItem category={item.category} item={item.item} key={`categorySelector_${item.category}`} />
      ))}
    </Container>
  );
};

export default SDMSelector;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  margin: auto;
  margin-bottom: 40px;
`;
