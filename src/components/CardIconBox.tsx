import RemainingDays from '@feature/Ibrandplus/RemainingDays';
import theme from '@styles/theme';
import React from 'react';
import styled from 'styled-components';
type PropsType = {
  couponAvailable?: boolean;
  isNew?: boolean;
  isBest?: boolean;
  saleCnt?: string;
  remainDays?: number;
  icon: number | string;
};
function CardIconBox({ couponAvailable, isNew, isBest, saleCnt, icon, remainDays }: PropsType) {
  if (icon != 0 && !isNew && !isBest && !couponAvailable && !saleCnt) return <span />;

  const RenderIcon = () => {
    switch (icon) {
      case 1:
        return '1+1';
      case 2:
        return '타임핫딜';
      case 3:
        return '묶음할인';
      case 4:
        return '일일특가';
      case 5:
        return '긴급공수';
      case 6:
        return '히트상품';
      case 7:
        return '위클리';
      case 8:
        return 'HOT';
      default:
        return 'HOT';
    }
  };
  return (
    <Container>
      {icon != 0 && <IconBox>{RenderIcon()}</IconBox>}
      {isNew && <NewBox>NEW</NewBox>}
      {isBest && <BestBox>BEST</BestBox>}
      {couponAvailable && <CouponAvailableBox>쿠폰</CouponAvailableBox>}
      {saleCnt && <SaleCntBox>{saleCnt}개 남음</SaleCntBox>}
      {remainDays && <RemainingDays days={remainDays} />}
    </Container>
  );
}

export default CardIconBox;

const Container = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
  @media all and (max-width: 1280px) {
    flex-wrap: wrap;
  }
`;
// bg={theme.pink}
// bg={theme.yellow}
// bg={theme.blue}
const IconBox = styled.div`
  padding: 0 5px;
  height: 22px;
  border: 1px solid ${theme.red};
  color: ${theme.red};
  font-size: 11px;
  font-weight: bold;
  margin-right: 3px;
  margin-top: 13px;
  ${props => props.theme.flexCenter};
`;
const NewBox = styled.div`
  padding: 0 5px;
  height: 22px;
  border: 1px solid ${theme.yellow};
  color: ${theme.yellow};
  font-size: 11px;
  font-weight: bold;
  margin-right: 3px;
  margin-top: 13px;
  ${props => props.theme.flexCenter};
`;
const BestBox = styled.div`
  padding: 0 5px;
  height: 22px;
  border: 1px solid ${theme.blue};
  color: ${theme.blue};
  font-size: 11px;
  font-weight: bold;
  margin-right: 3px;
  margin-top: 13px;
  ${props => props.theme.flexCenter};
`;

const CouponAvailableBox = styled.div`
  padding: 0 5px;
  height: 22px;
  border: 1px solid #fc558c;
  color: #fc558c;
  font-size: 11px;
  font-weight: bold;
  margin-right: 3px;
  margin-top: 13px;
  ${props => props.theme.flexCenter};
`;
const SaleCntBox = styled.div`
  padding: 4px 6px;
  height: 22px;
  color: #707070;
  background-color: #ededed;
  font-size: 11px;
  margin-right: 3px;
  margin-top: 13px;
  ${props => props.theme.flexCenter};
`;
