import AbstractModal from '@components/core/modal/AbstractModal/AbstractModal';
import { Desktop } from '@hooks/useDevice';
import { CommonModalProps } from '@modules/CommonInterface';
import { DecodedProduct, WeddingOrder } from '@modules/mypage/order/order.interface';
import theme from '@styles/theme';
import { openPopup } from '@utils/util';
import router, { useRouter } from 'next/router';
import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import Liner from '../../../component/Liner';
import QuestionGoodsListItem from './component/QuestionGoodsListItem';

interface AvailableProps extends CommonModalProps {
  onConfirm: () => void;
  order: WeddingOrder;
  setVisibleTalk?: any;
}
const ModalOrderQuestionIndex = ({ order, visible, onClose, onConfirm, setVisibleTalk }: AvailableProps) => {
  const {
    query: { no },
  } = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedGoods, setSelectedGoods] = useState<string>('');
  const [selectedQuestion, setSelectedQuestion] = useState<{ str: string; id: string }>();
  const isDeskTop = Desktop();
  const handleCheckboxChange = (goods_no: string) => {
    setSelectedGoods(prev => (prev === goods_no ? '' : goods_no));
  };

  const canNext = useMemo(() => {
    if (currentStep === 1) {
      return selectedGoods.length > 0;
    } else if (currentStep === 2) {
      return selectedQuestion != null;
    }
    return false;
  }, [currentStep, selectedGoods, selectedQuestion]);

  const onBack = () => {
    router.back();
  };

  const clear = useCallback(() => {
    setSelectedGoods('');
    setSelectedQuestion(undefined);
    setCurrentStep(1);
  }, [setSelectedGoods, setSelectedQuestion, setCurrentStep]);

  // const questionTalkStr = useMemo(() => {
  //   if (order && selectedGoods && selectedQuestion) {
  //     const goodNames = selectedGoods.map(good => good.decodedProduct.name).join('\n ');
  //     return `- 결제 일시 : ${getDate(order.reg_date)}\n- 문의 상품:\n${goodNames}\n- 문의유형 : ${
  //       selectedQuestion.str
  //     } \n\n 상세 문의 사항을 메시지로 입력하세요.`;
  //   }
  // }, [selectedGoods, order, selectedQuestion]);

  const confirm = () => {
    if (selectedGoods !== '') {
      if (isDeskTop) {
        global.window && openPopup(`/request/replace?order_no=${no}&goods_no=${selectedGoods}&category=결제내역&device=pc`, 'form_web');
      } else {
        router.push(`/request/replace?order_no=${no}&goods_no=${selectedGoods}&category=결제내역`);
      }
      setVisibleTalk(false);
    }
    // if (currentStep === 2) {
    //   if (selectedGoods.length && selectedQuestion) {
    //     if (questionTalkStr) {
    //       openChat(questionTalkStr);
    //       const goodNames = selectedGoods
    //         .map(good => {
    //           return printProductUrl(good.decodedProduct);
    //         })
    //         .join('\n ');
    //       orderGoodsQuestion({
    //         questionStr: `- 결제 일시 : ${getDate(order.reg_date)} <br/> - 문의 상품: <br/> ${goodNames} <br/> - 문의유형 : ${
    //           selectedQuestion.str
    //         } `,
    //         selectedGoods: selectedGoods,
    //       });
    //     } else {
    //       alert('죄송합니다. 문의할 내용을 찾을 수 없습니다.');
    //     }
    //     clear();
    //     router.back();
    //   }
    // }
  };

  const printProductUrl = (decodedProduct: DecodedProduct) => {
    return decodedProduct.enterprise_code && decodedProduct.no
      ? `<a href="${`https://iwedding.co.kr/enterprise/prd/${decodedProduct.enterprise_code}/${decodedProduct.no}`}">${
          decodedProduct.name
        }</a>`
      : decodedProduct.name;
  };

  const handleClose = () => {
    clear();
    onClose();
  };
  return (
    <AbstractModal
      noPadding
      visible={visible}
      onClose={handleClose}
      onBack={onBack}
      title='결제 상품 문의하기'
      isFullSize
      cancelText={'닫기'}
      confirmText={'문의하기'}
      onConfirm={confirm}
      canConfirm={canNext}
    >
      <Container>
        {/* <QuestionStepHeader currentStep={currentStep} /> */}
        <Liner />
        <div className='talk_container'>
          <div className='talk_header'>
            <p>{'문의를 원하시는 상품을 선택하세요.'}</p>
          </div>

          {order.goods.map((good, i) => (
            <QuestionGoodsListItem
              key={`${order.order_no}_${good.goods_no}`}
              good={good}
              checked={String(good.goods_no) === String(selectedGoods)}
              onChange={handleCheckboxChange}
            />
          ))}
        </div>
      </Container>
    </AbstractModal>
  );
};

export default ModalOrderQuestionIndex;

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #fff;
  .step_header {
    width: 100%;
    position: relative;
    padding: 27px 0;
    border-top: 1px solid #dfdfdf;
    @media all and (max-width: ${theme.pc}px) {
      border-top: 0;
    }
    .step_group {
      width: 193px;
      height: 46px;
      margin: 0 auto;
      > div {
        display: inline-block;
      }
      .step_box {
        text-align: center;
        .step_text {
          display: block;
          font-size: 13px;
          margin-top: 5px;
          color: #8c8c8c;
        }
      }
      .step_box.on {
        .step_text {
          font-weight: 700;
          color: #262626;
        }
      }
      .three_dots {
        vertical-align: top;
        margin: 0 10px;
      }
    }
  }
  .lg_divide_line {
    width: 100%;
    height: 8px;
    background-color: #e9ecef;
  }

  .talk_container {
    width: 100%;
    position: relative;
    background-color: #fff;
    padding: 0 30px 10px 30px;
    @media all and (max-width: ${theme.pc}px) {
      padding: 0 15px 10px 15px;
    }

    .inquiry_type_form {
      width: 100%;
      position: relative;
      .inquiry_type {
        width: 100%;
        padding: 20px 0;
        border-bottom: 1px solid #dfdfdf;
        cursor: pointer;
        > div {
          display: inline-block;
          cursor: pointer;
        }
        .radio_label {
          display: inline-block;
          font-size: 15px;
          vertical-align: top;
          margin-left: 10px;
          cursor: pointer;
        }
      }
    }

    .talk_header {
      width: 100%;
      padding: 30px 0;
      font-size: 16px;
      font-weight: 700;
      border-bottom: 1px solid #dfdfdf;
    }
    .item_area {
      -webkit-tap-highlight-color: transparent;
      width: 100%;
      padding: 20px 0;
      border-bottom: 1px solid #dfdfdf;
      .item_check_box {
        margin-bottom: 5px;
      }
      .info-item-box {
        width: 100%;
        position: relative;
        .info-box {
          width: 100%;
          position: relative;
          > label {
            display: block;
            position: relative;
            width: 100%;
            height: 100%;
            cursor: pointer;
            @media all and (max-width: ${theme.pc}px) {
              display: flex;
              flex-wrap: wrap;
            }
            .top_info_box {
              width: 100%;
              display: inline-block;
              position: relative;
              @media all and (max-width: ${theme.pc}px) {
                display: flex;
              }
              .info-img {
                display: inline-block;
                width: 75px;
                height: 75px;
                > span {
                  position: relative;
                  display: block;
                  width: 100%;
                  height: 100%;
                  > img {
                    height: 100%;
                    position: absolute;
                    left: 50%;
                    transform: translateX(-50%);
                  }
                }
              }
              .info-text-box {
                display: inline-block;
                width: calc(100% - 105px);
                vertical-align: top;
                padding-top: 5px;
                margin-right: 30px;
                @media all and (max-width: ${theme.pc}px) {
                  /* margin-right: 30px; */
                }
                .category-text {
                  display: block;
                  font-size: 14px;
                  font-weight: 300;
                  color: ${props => props.theme.gray};
                  margin-bottom: 3px;
                  @media all and (max-width: ${theme.pc}px) {
                    font-size: 13px;
                    margin-bottom: 3px;
                  }
                }
                .title-text {
                  font-size: 15px;
                  font-weight: 500;
                  line-height: 22px;
                  display: block;
                }
              }
            }
            .bottom_info_box {
              width: 100%;
              display: inline-block;
              margin-top: 20px;
              @media all and (max-width: ${theme.pc}px) {
                display: flex;
                flex-wrap: wrap;
              }
              .row_group {
                width: 100%;
                position: relative;
                > span {
                  display: block;
                  font-size: 15px;
                }
                .info_content {
                  position: absolute;
                  top: 0;
                  right: 0;
                  font-weight: 700;
                }
              }
              .final_cancel_reason {
                font-size: 15px;
                font-weight: 500;
                line-height: 22px;
                margin-top: 20px;
                color: ${props => props.theme.red};
              }
            }
          }
        }
      }
    }
  }
`;
