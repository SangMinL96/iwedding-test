import React, { useCallback, useEffect, useState } from 'react';
import theme from '@styles/theme';
import { showPrice } from '@utils/util';
import { getDate } from '@utils/util';
import styled from 'styled-components';
import deleteTextBtn from '@images/common/delete_text_icon.png';
import { QuotationDetail } from '@modules/mypage/quotation/QuotationInterface';
import { deleteQuotation, updateQuotationName } from '@modules/mypage/quotation/QuotationAPI';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useDeepEffect } from '@hooks/useDeepEffect';

interface Props {
  isRealtime: boolean;
  quotation: QuotationDetail;
  quotationId: string;
  fromTalk: boolean;
}

const QuoteDetailBanner = ({ quotation, quotationId, isRealtime, fromTalk }: Props) => {
  const [quotationName, setQuotationName] = useState('');
  const [visibleUpdateName, setVisibleUpdateName] = useState(false);
  const router = useRouter();

  useDeepEffect(() => {
    if (quotation?.group_name) {
      setQuotationName(quotation.group_name);
    }
  }, [quotation]);

  const onDeleteQuotation = useCallback(() => {
    const isConfirm = confirm('견적함을 삭제하시겠습니까?');
    if (isConfirm) {
      deleteQuotation(quotationId)
        .then(() => {
          router.push('/quotation');
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [quotationId, router]);

  const onUpdateQuotation = useCallback(() => {
    updateQuotationName(quotationId, quotationName)
      .then(r => {
        setVisibleUpdateName(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, [quotationId, quotationName]);

  return (
    <Container>
      <div className='title_container'>
        <span className='title' style={{ display: visibleUpdateName ? 'none' : 'inline-block' }}>
          {quotationName}
        </span>

        {!isRealtime && !fromTalk ? (
          <div className='modify_title_input_box' style={{ display: visibleUpdateName ? 'inline-block' : 'none' }}>
            <input
              type='text'
              className='modify_title_input'
              id='modifyTitleInput'
              value={quotationName}
              onChange={e => setQuotationName(e.target.value)}
            />
            <button
              className='delete_title_btn'
              onClick={() => {
                setVisibleUpdateName(false);
                setQuotationName(quotation?.group_name);
              }}
            >
              <Image unoptimized src={deleteTextBtn} alt='delete' />
            </button>
          </div>
        ) : null}

        {!isRealtime && !fromTalk ? (
          <div className='update_container' style={{ display: visibleUpdateName ? 'none' : 'inline-block' }}>
            <span
              className='update'
              onClick={() => {
                setVisibleUpdateName(true);
                document.getElementById('modifyTitleInput')?.focus();
              }}
            >
              수정
            </span>
            <span className='vertical_line' />
            <span className='delete' onClick={onDeleteQuotation}>
              삭제
            </span>
          </div>
        ) : null}

        {!isRealtime && !fromTalk && (
          <div className='update_container done' style={{ display: visibleUpdateName ? 'block' : 'none' }}>
            <span className='update' onClick={() => onUpdateQuotation()}>
              완료
            </span>
          </div>
        )}
      </div>
      <div className='price_container'>
        <div className='price_title'>최종 혜택가 {showPrice(quotation.group_total_price - quotation.group_total_coupon_price)}원</div>
        <div className='recent_modify'>
          {!fromTalk ? '최근 수정 ' : '아이웨딩에서 보내드립니다. 보낸일자 : '}
          {getDate(!fromTalk ? quotation.group_modified_at : quotation.group_created_at)}
        </div>
      </div>
    </Container>
  );
};

export default React.memo(QuoteDetailBanner);

const Container = styled.div`
  width: 100%;
  background-color: #f5f5f5;
  height: 180px;
  padding: 30px 20px 26px 20px;
  /* border-bottom: 1px solid #dfdfdf; */
  @media all and (min-width: ${theme.pc}px) {
    height: 200px;
    padding: 37px 155px 37px 155px;
  }

  .title_container {
    width: 100%;
    position: relative;
    margin-bottom: 19px;

    .title {
      display: inline-block;
      /* display: none; */
      width: calc(100% - 80px);
      font-size: 17px;
      font-weight: 700;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      @media all and (min-width: ${theme.pc}px) {
        font-size: 19px;
        width: calc(100% - 80px);
      }
    }

    .update_container {
      display: inline-block;
      position: absolute;
      height: 22px;
      right: 0;

      > span {
        font-size: 15px;
        color: ${props => props.theme.blue};
        vertical-align: middle;
        cursor: pointer;
      }

      .vertical_line {
        display: inline-block;
        margin: 0 8px;
        width: 1px;
        height: 15px;
        background-color: ${props => props.theme.blue};
      }
    }

    .update_container.done {
      top: 12px;
      /* display: inline-block; */
      display: none;
    }

    .modify_title_input_box {
      display: none;
      width: calc(100% - 44px);
      height: 42px;
      border: 1px solid #dfdfdf;
      background-color: #fff;

      .modify_title_input {
        appearance: none;
        border: none;
        outline: none;
        width: calc(100% - 31px);
        height: 100%;
        font-size: 19px;
        font-weight: 700;
        padding-left: 10px;
      }

      .delete_title_btn {
        width: 25px;
        height: 100%;

        > img {
          width: 20px;
          height: 20px;
        }
      }
    }
  }

  .price_container {
    width: 100%;
    border: 1px solid #262626;
    height: 80px;
    background-color: #fff;
    text-align: center;
    padding-top: 18px;
    box-shadow: rgba(0, 0, 0, 0.13) 1px 2px 8px;

    .price_title {
      margin-bottom: 7px;
      font-size: 16px;
      font-weight: 700;
      color: #ff3535;
    }

    .recent_modify {
      font-size: 12px;
      color: #8c8c8c;
    }
  }
`;
