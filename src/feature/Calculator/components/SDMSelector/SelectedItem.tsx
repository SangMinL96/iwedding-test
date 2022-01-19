import { ImageContainer_76 } from '@components/core/containers/ImageContainer_76';
import { useCalculatorState } from '@feature/Calculator/store/calcStore';
import theme from '@styles/theme';
import React from 'react';
import styled from 'styled-components';
import { CategoryItemProps } from './CategoryItem';

const SelectedItem = ({ category, item, onClick }: CategoryItemProps) => {
  const showEstimation = useCalculatorState(state => state.showEstimation);

  return (
    <>
      <Left>
        <Upper>
          <span>{category}</span>
          <span>|</span>
          <span>{item?.ent_name}</span>
        </Upper>
        <Main>{item?.name}</Main>
      </Left>
      <ImageContainer onClick={onClick} disableClick={showEstimation}>
        <Image src={item?.thumb} alt={item?.name} />
      </ImageContainer>
    </>
  );
};

export default React.memo(SelectedItem);

const Left = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 22px 0;
`;

const Upper = styled.div`
  margin: 0 0 4px 0;
  line-height: 19px;
  > span {
    font-size: 13px;
    color: ${theme.black};
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:nth-child(2) {
      margin: 0 6px;
      color: #e6e6ea;
      font-size: 10px;
    }
  }
`;

const Main = styled.p`
  font-size: 15px;
  font-weight: bold;
  line-height: 21px;
`;

const Image = styled.img`
  width: auto;
  border-radius: 8px;
  height: 76px;
  border: 1px rgba(0, 0, 0, 0.01) solid;
`;

const ImageContainer = styled(ImageContainer_76)<{ disableClick: boolean }>`
  position: relative;
  margin-left: 24px;
  height: 76px;
  width: 76px;
  border-radius: 8px;
  border: none;
  ${({ disableClick }) => disableClick && `cursor: default`}
`;
