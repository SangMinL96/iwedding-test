import { Divider } from '@components/core/containers/Divider';
import AbstractModal from '@components/core/modal/AbstractModal/AbstractModal';
import { TypeButton } from '@feature/QnA/components/TalkTypeSection/TypeButton';
import { useOverflowModal } from '@hooks/useOverflowHidden';
import deleteText from '@images/common/delete_text_icon.png';
import { createQuotation, useGetQuotationNameKeyword } from '@modules/mypage/quotation/QuotationAPI';
import { overFlowVisible } from '@utils/util';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useCallback, useState } from 'react';
import styled from 'styled-components';
interface ModalProps {
  visible: boolean;
  onClose: () => void;
  inCopyView?: boolean;
}

const ModalCreateQuotation = ({ visible, onClose, inCopyView }: ModalProps) => {
  useOverflowModal(visible);
  const router = useRouter();
  const [currentTitle, setCurrentTitle] = useState('');
  const { data: keywordList } = useGetQuotationNameKeyword(); // 견적함 이름 템플릿 리스트

  const closeModal = useCallback(() => {
    setCurrentTitle('');
    overFlowVisible();
    onClose();
  }, [setCurrentTitle, onClose]);

  const onCreateQuotation = useCallback(async () => {
    if (!currentTitle) {
      return;
    }
    await createQuotation(currentTitle);
    router.back();
  }, [currentTitle, router]);

  const onChangeTitle = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setCurrentTitle(event.target.value);
    },
    [setCurrentTitle],
  );

  const deleteTitle = useCallback(() => {
    setCurrentTitle('');
  }, [setCurrentTitle]);

  const clickSampleTitle = useCallback(
    (title: string) => () => {
      setCurrentTitle(title);
    },
    [setCurrentTitle],
  );

  const onEnter = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key == 'Enter') {
        onCreateQuotation();
      }
    },
    [onCreateQuotation],
  );

  return (
    <AbstractModal
      title='새 견적함 만들기'
      visible={visible}
      isDuplicated={inCopyView}
      onClose={closeModal}
      isFullSize
      confirmText='만들기'
      onConfirm={onCreateQuotation}
      canConfirm={currentTitle?.length > 1}
    >
      <Inner>
        <div className='input-box'>
          <p className='info-title'>제목</p>
          <div className={currentTitle?.length > 1 ? 'title-input-box on' : 'title-input-box'}>
            <input
              type='text'
              placeholder='제목을 입력하세요.'
              id='estimate-title'
              onChange={onChangeTitle}
              value={currentTitle}
              onKeyPress={onEnter}
            />
            {currentTitle?.length > 1 && (
              <button className='delete-text-btn' onClick={deleteTitle}>
                <Image src={deleteText} alt='delete-text-btn' />
              </button>
            )}
          </div>
        </div>
        <CustomDivider />

        {keywordList?.map(({ title: category, value }) => (
          <section key={category}>
            <div className='input-box'>
              <p className='info-title'>{category}</p>
              <div className='info-btn-box'>
                {value?.map(text => (
                  <TypeButton key={text} title={text} onClick={clickSampleTitle(text)} active={currentTitle == text} fontSize={14} />
                ))}
              </div>
            </div>
            <CustomDivider />
          </section>
        ))}
      </Inner>
    </AbstractModal>
  );
};
export default ModalCreateQuotation;

const Inner = styled.div`
  width: 100%;
  .input-box {
    width: 100%;
    position: relative;
    margin-bottom: 20px;

    .info-title {
      font-size: 14px;
      font-weight: 500;
      display: block;
      margin-bottom: 14px;
    }

    .title-input-box {
      width: 100%;
      height: 50px;
      border: 1px solid #dfdfdf;
      position: relative;
      margin-bottom: 33px;

      > input {
        ${props => props.theme.resetBtnStyle}
        width: calc(100% - 33px);
        padding-left: 15px;
        height: 48px;
        font-size: 15px;
        background-color: transparent;
      }

      > button {
        ${props => props.theme.resetBtnStyle}
        background-color: #fff;
        width: 20px;
        height: 20px;
        position: absolute;
        top: 13px;
        right: 13px;
        cursor: pointer;

        > img {
          width: 20px;
          height: 20px;
        }
      }
    }

    .title-input-box.on {
      border: 1px solid #262626;
    }

    .info-btn-box {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 5px;
    }
  }

  margin-bottom: var(--ios-bottom); ;
`;

const CustomDivider = styled(Divider)`
  width: 100%;
  margin-bottom: 20px;
`;
