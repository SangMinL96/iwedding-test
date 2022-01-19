import { Desktop } from '@hooks/useDevice';
import { deleteQnA } from '@modules/mypage/QnA/QnAApi';
import { QnAProps } from '@modules/mypage/QnA/QnAInterface';
import React, { SyntheticEvent } from 'react';
import styled from 'styled-components';
import ListHeader from './ListHeader';
import ListItem from './ListItem';

const QnAList = ({ list, setFilteredList }: { list: QnAProps[]; setFilteredList: any }) => {
  const isDesktop = Desktop();

  // 새로고침없이 삭제를 즉각 반영하기 위한 state

  const handleDelete = (id: number) => async (e: SyntheticEvent) => {
    e.stopPropagation();
    const yes = confirm('문의 내용을 정말 삭제하시겠습니까?');
    if (yes) {
      const result = await deleteQnA(Number(id));
      if (result) {
        setFilteredList(prev => prev.filter(cl => cl.id !== id));
      }
    }
    // e.stopPropagation();
    // confirmAlert({
    //   title: `문의 내용을 정말 삭제하겠습니까?`,
    //   buttons: [
    //     {
    //       label: '확인',
    //       onClick: async () => {
    //         const result = await deleteQnA(Number(id)); // boolean
    //         if (result) {
    //           setCurrentList(currentList.filter(cl => cl.id !== id));
    //         }
    //       },
    //     },
    //     { label: '취소', onClick: () => null },
    //   ],
    // });
  };
  return (
    <Container>
      {isDesktop && (
        <ListHeader
          displayID='No'
          contentsCategory={{ id: -1, title: '문의 페이지' }}
          mainCategory='업종'
          talkType={{ id: -1, title: '문의 유형' }}
          created='작성일시'
          title=''
          request='문의 내용 및 답변'
          editable={false}
          header
        />
      )}
      {list?.map(listItem => (
        <ListItem {...listItem} key={listItem.id} onDelete={handleDelete} />
      ))}
    </Container>
  );
};

export default React.memo(QnAList);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 80px;

  > div:last-child {
    border-bottom: 1px solid #dfdfdf;
  }
`;
