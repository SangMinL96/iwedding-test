import { QnAParams, useFormStore } from '@feature/QnA/hooks/useFormStore';
import { WhiteButton } from '@feature/quotation/components/buttons/WhiteButton';
import { Desktop } from '@hooks/useDevice';
import { useModalVisible } from '@hooks/useModalVisible';
import { QnAHeaderProps } from '@modules/mypage/QnA/QnAInterface';
import theme from '@styles/theme';
import { QNA_EDIT_MODAL } from '@utils/modalKeys';
import { useRouter } from 'next/router';
import React, { SyntheticEvent } from 'react';
import styled, { css } from 'styled-components';
import shallow from 'zustand/shallow';

const ListHeader = ({
  id,
  displayID,
  contentsCategory,
  mainCategory,
  brand,
  enterprise,
  product,
  talkType,
  created,
  title,
  request,
  dbImages,
  header = false,
  onClick,
  onDelete,
  quotation_no,
  list_no,
  open,
  order_no,
  goods_no,
  status,
  editable = true,
}: QnAHeaderProps) => {
  const isDesktop = Desktop();
  const { setModalVisible } = useModalVisible(QNA_EDIT_MODAL);
  const [setID, setCategory, setMainCategory, setParams, setTalkType, setTitle, setBody, setDBImages, setFormTitle] = useFormStore(
    state => [
      state.setID,
      state.setCategory,
      state.setMainCategory,
      state.setParams,
      state.setTalkType,
      state.setTitle,
      state.setBody,
      state.setDBImages,
      state.setFormTitle,
    ],
    shallow,
  );
  const router = useRouter();
  const onClickEdit = (e: SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setID(id);
    setCategory(contentsCategory);
    const params: Partial<QnAParams> = {};
    if (brand) params.brandNo = brand;
    if (enterprise) params.enterCode = enterprise;
    if (product) params.productNo = product;

    setMainCategory(mainCategory);
    setTalkType(talkType);
    setTitle(title);
    setBody(request);
    if (contentsCategory.id === 5) {
      if (quotation_no) params.quotation_no = quotation_no;
    }
    if (contentsCategory.id === 7) {
      if (list_no) params.list_no = list_no;
    }
    if (contentsCategory.id === 8) {
      if (order_no) params.order_no = order_no;
      if (goods_no) params.goods_no = goods_no;
    }
    setParams({ ...params });
    setDBImages(dbImages);
    setModalVisible(true);
    router.push(router.asPath + '#EditModal');
  };
  return (
    <Container onClick={onClick} open={!!open} header={!!header}>
      {!isDesktop ? (
        <>
          <MobileWrapper>
            <Types header={false}>
              {contentsCategory?.title || '기타'} {mainCategory ? `| ${mainCategory}` : ''} | {talkType?.title || '문의 유형'}
            </Types>
            <RequestTitle>{title}</RequestTitle>
            <MobileBottom>
              {created} | <Status editable={editable}>{status}</Status>
            </MobileBottom>
          </MobileWrapper>
          <Edit>
            <WhiteButton disabled={!editable} onClick={onClickEdit}>
              수정
            </WhiteButton>
            <WhiteButton disabled={!editable} onClick={onDelete(Number(id))}>
              삭제
            </WhiteButton>
          </Edit>
        </>
      ) : (
        <>
          <ID>{displayID}</ID>
          <Types header={header}>
            <p>
              {contentsCategory?.title || '기타'} {mainCategory ? `| ${mainCategory}` : ''}
            </p>
            <p>{talkType?.title || '문의 유형'}</p>
          </Types>
          <Main>
            <Created header={header}>{created}</Created>
            <RequestTitle>
              {title}
              {header && <>{request}</>}
            </RequestTitle>
          </Main>
          <Status editable={editable} header={header}>
            {header ? '답변 상태' : status}
          </Status>
          <Edit>
            {header ? (
              <p>수정/삭제</p>
            ) : (
              <>
                <WhiteButton disabled={!editable} onClick={onClickEdit}>
                  수정
                </WhiteButton>
                <WhiteButton disabled={!editable} onClick={onDelete(Number(id))}>
                  삭제
                </WhiteButton>
              </>
            )}
          </Edit>
        </>
      )}
    </Container>
  );
};

export default ListHeader;

const Container = styled.div<{ open: boolean; header: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 76px;
  width: 100%;
  font-size: 15px;
  background-color: ${({ open }) => (open ? '#fafafa' : 'white')};
  border-top: 1px solid #dfdfdf;
  border-bottom: ${({ open }) => open && `1px solid #dfdfdf`};
  cursor: ${({ header }) => !header && `pointer`};
  ${({ header }) =>
    header &&
    css`
      height: 60px;
      font-size: 13px;
      font-weight: bold;
    `}

  @media (max-width: ${theme.tablet - 1}px) {
    padding: 15px 0;
    height: 130px;
    justify-content: space-between;
    margin: 0 auto;
  }
`;

const MobileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  height: 100%;
  max-width: calc(100% - 80px);
`;

const MobileBottom = styled.div`
  font-size: 13px;
  color: #8c8c8c;
`;
const ID = styled.span`
  width: 60px;
  font-size: 14px;
  text-align: center;
`;
const Types = styled.div<{ header: boolean }>`
  display: flex;
  flex-direction: column;
  width: 140px;

  > p:nth-child(1) {
    font-size: 13px;
    color: ${({ header }) => !header && `#8c8c8c`};
    margin-bottom: 6px;
  }

  @media (max-width: ${theme.tablet - 1}px) {
    font-size: 13px;
    color: #8c8c8c;
    width: 100%;
  }
`;
const Created = styled.p<{ header: boolean }>`
  font-size: 13px;
  color: ${({ header }) => !header && `#8c8c8c`};
  margin-bottom: 6px;
`;
const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: 325px;
  margin: 0 20px;
  @media (max-width: ${theme.tablet - 1}px) {
    margin: 0;
    width: 100%;
  }
`;
const RequestTitle = styled.p<{ header?: boolean }>`
  padding: 0 auto;
  ${theme.textEllipsis};
`;
const Status = styled.span<{ header?: boolean; editable: boolean }>`
  width: 100px;
  text-align: center;
  ${({ editable, header }) => !editable && !header && `color: #4866e4; font-weight: bold;`}
`;
const Edit = styled.div`
  display: flex;
  justify-content: space-around;
  width: 125px;
  z-index: 4;
  > button {
    width: 50px;
    min-height: 34px;
    max-height: 34px;
  }

  @media (max-width: ${theme.tablet - 1}px) {
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 80px;
    height: 100%;
    padding: 0 15px;
  }
`;
