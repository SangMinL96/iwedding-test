import React, { useCallback, useMemo, useState } from 'react';
import styled from 'styled-components';
import Liner from '../../../component/Liner';
import CancelStep1 from './component/CancelStep1';
import CancelStep2, { Reason } from './component/CancelStep2';
import CancelStep3 from './component/CancelStep3';
import CancelStepStatus from './component/CancelStepStatus';
import CancelFinish from './component/CancelFinish';
import { loggingOrderGoodsCancelRequest } from '@modules/user/UserLogAPI';
import theme from '@styles/theme';
import { CommonModalProps } from '@modules/CommonInterface';
import { useRouter } from 'next/router';
import { getDateTime } from '@utils/util';
import { openChat } from '@modules/mypage/quotation/QuotationAPI';
import { CANCEL_ERROR, CANCEL_NOT_FOUND_ORDER } from '@utils/AlertMessage';
import { DecodedProduct, WeddingOrderGoods } from '@modules/mypage/order/order.interface';
import { cancelRequesting, cancelRequestingFreeOrder, useOrder } from '@modules/mypage/order/order.api';
import AbstractModal from '@components/core/modal/AbstractModal/AbstractModal';

interface AvailableProps extends CommonModalProps {
  onConfirm: () => void;
  goods: WeddingOrderGoods;
}
enum CancelStep {
  CHECK_CONTRACT = 1,
  SELECT_REASON,
  REQUEST_CANCEL,
  FINISH_CANCEL,
}

const ModalCancelIndex = ({ goods, visible, onClose, isFullSize, onConfirm }: AvailableProps) => {
  const {
    query: { no, is_free },
  } = useRouter();

  const { data: order, isValidating, revalidate } = useOrder(no as string, is_free as string);

  const [currentStep, setCurrentStep] = useState(CancelStep.CHECK_CONTRACT);

  const [isViewContract, setIsViewContract] = useState(false);
  const [selectedReason, setSelectedReason] = useState<Reason>();
  const canNext = useMemo(() => {
    if (currentStep === CancelStep.CHECK_CONTRACT) {
      return isViewContract;
    } else if (currentStep === CancelStep.SELECT_REASON) {
      return selectedReason != null;
    } else if (currentStep === CancelStep.REQUEST_CANCEL || currentStep === CancelStep.FINISH_CANCEL) {
      return true;
    }
    return false;
  }, [currentStep, isViewContract, selectedReason]);

  const clear = () => {
    setCurrentStep(CancelStep.CHECK_CONTRACT);
    setIsViewContract(false);
    setSelectedReason(undefined);
  };

  const cancelStr = useMemo(() => {
    if (order && goods) {
      return `결제 취소 요청합니다.
     -결제 일시: ::${getDateTime(order.reg_date)}::\n
     -취소 요청 상품:  ::${goods.decodedProduct.name}::\n
     -취소 유형: ::${selectedReason?.str}::\n\n
     상세 요청 사항은 메시지로 입력하세요.`;
    }
  }, [order, goods, selectedReason]);

  const close = useCallback(() => {
    if (currentStep === CancelStep.CHECK_CONTRACT || currentStep === CancelStep.FINISH_CANCEL) {
      onClose();
      clear();
    } else {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep, onClose, setCurrentStep]);

  const confirm = useCallback(() => {
    if (currentStep > CancelStep.FINISH_CANCEL) {
      return;
    }
    if (currentStep == CancelStep.REQUEST_CANCEL) {
      if (cancelStr) {
        openChat(cancelStr);
        if (order) {
          if (order.is_free_order) {
            cancelRequestingFreeOrder(order.order_no, goods.goods_no)
              .then(r => {
                onConfirm();
              })
              .catch(err => {
                alert(CANCEL_ERROR);
                console.log(err);
                close();
              });
          } else {
            cancelRequesting(order.order_no, goods.goods_no)
              .then(r => {
                console.log(r);
                onConfirm();
              })
              .catch(err => {
                console.log(err);
                alert(CANCEL_ERROR);
                close();
              });
          }
        }

        if (order)
          loggingOrderGoodsCancelRequest({
            cancelStr: `-결제 일시: ::${getDateTime(order.reg_date)}::<br/>
     -취소 요청 상품:  ::${printProductUrl(goods.decodedProduct)}::<br/>
     -취소 유형: ::${selectedReason?.str}::<br/><br/>`,
            selectedGoods: [goods],
          });
      } else {
        alert(CANCEL_NOT_FOUND_ORDER);
      }
    }
    if (currentStep == CancelStep.FINISH_CANCEL) {
      close();
    }
    setCurrentStep(currentStep + 1);
  }, [currentStep, cancelStr, order, setCurrentStep, close, goods, onConfirm, selectedReason?.str]);

  const printProductUrl = (decodedProduct: DecodedProduct) => {
    return decodedProduct.enterprise_code && decodedProduct.no
      ? `<a href="${`https://iwedding.co.kr/enterprise/prd/${decodedProduct.enterprise_code}/${decodedProduct.no}`}">${
          decodedProduct.name
        }</a>`
      : decodedProduct.name;
  };
  return (
    <>
      <AbstractModal
        noPadding
        visible={visible}
        onClose={() => {
          clear();
          onClose();
        }}
        title='결제 취소 요청'
        isFullSize={isFullSize}
        stepFooter={currentStep !== 4}
        oneButtonFooter={currentStep === 4}
        cancelText='이전'
        confirmText={currentStep === 4 ? '완료' : currentStep !== 3 ? '다음 단계 >' : '결제 취소 요청'}
        onConfirm={confirm}
        canConfirm={canNext}
        onBack={close}
      >
        <Container>
          {currentStep !== 4 && <CancelStepStatus currentStep={currentStep} />}
          <Liner />
          {currentStep === 1 ? (
            <CancelStep1
              goods={goods}
              canNext={() => {
                setIsViewContract(true);
              }}
            />
          ) : currentStep === 2 ? (
            <CancelStep2
              canNext={reason => {
                setSelectedReason(reason);
              }}
              selectedReason={selectedReason}
              goods={goods}
            />
          ) : currentStep === 3 ? (
            <CancelStep3 selectedReason={selectedReason} goods={goods} />
          ) : (
            <CancelFinish />
          )}
        </Container>
      </AbstractModal>
    </>
  );
};

export default ModalCancelIndex;
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
      width: 314px;
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
        margin: 0 9px;
      }
    }
  }
  .lg_divide_line {
    width: 100%;
    height: 8px;
    background-color: #e9ecef;
  }

  .cancel_container {
    width: 100%;
    position: relative;
    background-color: #fff;
    padding: 0 30px 10px 30px;
    @media all and (max-width: ${theme.pc}px) {
      padding: 0 15px 10px 15px;
    }
    .cancel_header {
      width: 100%;
      padding: 30px 0;
      font-size: 16px;
      font-weight: 700;
      border-bottom: 1px solid #dfdfdf;
      > .description {
        margin-top: 10px;
        display: block;
        font-size: 13px;
        color: #8c8c8c;
        line-height: 19px;
        font-weight: 400;
      }
    }

    .item_area {
      width: 100%;
      padding: 15px 0 20px 0;
      border-bottom: 1px solid #dfdfdf;
      .info-item-box {
        width: 100%;
        position: relative;
        .info-box {
          width: 100%;
          position: relative;
          > a {
            display: block;
            position: relative;
            width: 100%;
            height: 100%;
            @media all and (max-width: ${theme.pc}px) {
              display: flex;
              flex-wrap: wrap;
            }
            .top_info_box {
              width: 100%;
              display: inline-block;
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
                width: calc(100% - 90px);
                vertical-align: top;
                padding-top: 15px;
                margin-right: 15px;
                @media all and (max-width: ${theme.pc}px) {
                  margin-bottom: 13px;
                  margin-right: 12px;
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
                  color: #262626;
                  font-size: 15px;
                  font-weight: 500;
                  line-height: 22px;
                  display: block;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  overflow: hidden;
                  margin-bottom: 8px;
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
                  color: #262626;
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
              .view_penalty_btn {
                ${props => props.theme.resetBtnStyle};
                margin-top: 10px;
                display: block;
                padding: 8px 13px;
                border: 1px solid ${props => props.theme.blue};
                font-size: 13px;
                color: ${props => props.theme.blue};
                font-weight: 700;
              }
            }
          }
        }
      }
    }
  }
`;
