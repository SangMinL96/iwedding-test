import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import theme from '@styles/theme';

interface Props {
  companyLogoURL?: string;
  thumbnailURL: string;
  category: string;
  title: string;
  body: ReactNode;
  zzim: boolean;
  download: boolean;
}

const ListItem = ({ companyLogoURL, thumbnailURL, category, title, body, zzim = false, download = false, ...rest }: Props) => {
  return (
    <CardContainer {...rest}>
      {companyLogoURL && (
        <CompanyLogo className='card-logo'>
          <Image src={companyLogoURL} alt='logo' layout='fill' />
        </CompanyLogo>
      )}
      <ImgContainer className='card-thumbnail'>
        <Image src={thumbnailURL} alt={thumbnailURL.slice(10)} layout='fill' />
        <Icon>아이콘</Icon>
      </ImgContainer>
      <Category>{category}</Category>
      <Title className='card-title'>{title}</Title>
      <Body className='card-body'>{body}</Body>
      <ButtonContainer>
        {zzim && <Zzim>찜</Zzim>}
        {download && <Download>다운</Download>}
      </ButtonContainer>
    </CardContainer>
  );
};

export default React.memo(ListItem);

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const CompanyLogo = styled.div`
  ${theme.flexCenter};
`;

const ImgContainer = styled.div`
  margin-right: 20px;
`;

const Icon = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  ${theme.flexCenter};
  background: ${theme.black};
  color: ${theme.lightGray};
`;

const Main = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Category = styled.p``;
const Title = styled.p`
  color: ${theme.black};
`;

const Body = styled.p`
  margin-top: 17px;
  font-size: 14px;
  color: ${theme.gray};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Zzim = styled.button``;
const Download = styled.button``;
