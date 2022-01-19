import { logViewAnswer } from '@modules/mypage/QnA/QnAApi';
import { QnAProps } from '@modules/mypage/QnA/QnAInterface';
import theme from '@styles/theme';
import React, { SyntheticEvent, useCallback, useState, useRef } from 'react';
import styled from 'styled-components';
import LinkCard from '../LinkCard/LinkCard';
import ListHeader from './ListHeader';

const ListItem = ({ title, request, answer, header, onDelete, ...props }: QnAProps) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const toggleBody = useCallback(() => {
    if (wrapperRef.current === null || bodyRef.current === null) return;
    if (wrapperRef.current.clientHeight > 0) {
      wrapperRef.current.style.height = '0';
    } else {
      wrapperRef.current.style.height = `${bodyRef.current.clientHeight}px`;
    }
  }, [wrapperRef, bodyRef]);

  const onClickQnA = useCallback(
    (e: SyntheticEvent) => {
      e.stopPropagation();
      toggleBody();
      setOpen(!open);

      if (answer?.length > 0) {
        logViewAnswer(Number(props.id));
      }
    },

    [open, answer, toggleBody, setOpen, props.id],
  );
  return (
    <Container>
      <ListHeader {...props} request={request} title={title} header={header} onClick={onClickQnA} open={open} onDelete={onDelete} />
      <Wrapper ref={wrapperRef}>
        <Body ref={bodyRef}>
          {props.contentsUrl ? <LinkCard itemTitle={props.itemTitle} thumbnail={props.thumbnail} url={props.contentsUrl} /> : null}
          <QnA>
            <Left>문의</Left>
            <Right>
              {title}
              <br />
              {request}
              <ImageSection>
                {props.dbImages?.map(image => (
                  <Image key={`${props.id}_${image.id}`} src={image.title} alt={image.title} />
                ))}
                {props.images?.map((image, i) => (
                  <Image key={`${props.id}_image_${i}`} src={image.preview} alt='이미지가 없습니다.' />
                ))}
              </ImageSection>
            </Right>
          </QnA>
          {answer && (
            <QnA>
              <Left>답변</Left>
              <Right dangerouslySetInnerHTML={{ __html: answer }}></Right>
            </QnA>
          )}
        </Body>
      </Wrapper>
    </Container>
  );
};

export default ListItem;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  font-size: 14px;
  width: 100%;
  @media (max-width: ${theme.tablet - 1}px) {
    width: calc(100% - 30px);
    margin: 0 auto;
  }
`;
const Wrapper = styled.div`
  height: 0;
  width: 100%;
  overflow: hidden;
  transition: height 0.35s ease;
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  padding: 60px;
  @media (max-width: ${theme.tablet - 1}px) {
    padding: 40px 15px;
  }
`;
const QnA = styled.section`
  display: flex;
  line-height: 22px;

  @media (max-width: ${theme.tablet - 1}px) {
    flex-direction: column;
  }
`;

const Answer = styled(QnA)`
  padding-bottom: 50px;
`;
const Left = styled.div`
  width: 160px;
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 20px;
  @media (max-width: ${theme.tablet - 1}px) {
    text-align: left;
    margin-bottom: 10px;
  }
`;

const Image = styled.img`
  margin: 10px 0;
  width: 400px;
  height: auto;
  object-fit: cover;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-bottom: 30px;
  @media (max-width: ${theme.tablet - 1}px) {
    width: 100%;
  }
`;

const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 20px 0;
  padding: 0 15px;
  background: #ebebeb;
`;
