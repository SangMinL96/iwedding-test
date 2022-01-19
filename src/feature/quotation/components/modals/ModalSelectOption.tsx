import React, { MouseEventHandler, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { CommonModalProps } from '@modules/CommonInterface';
import Counter from '@components/Counter';
import { GroupOptionSelectDto, GroupProductDto, OptionDto, OptionSelectDto } from '@modules/mypage/quotation/QuotationInterface';
import { fetchAvailableOptions } from '@modules/product/ProductAPI';
import { showPrice } from '@utils/util';
import { applySelectOption } from '@modules/mypage/quotation/QuotationAPI';
import { useOverflowModal } from '@hooks/useOverflowHidden';
import IconX from '@svgs/icon_x';
import IconKeyboardDownArrow from '@svgs/icon_keyboard_down_arrow';
import theme from '@styles/theme';
import AbstractModal from '@components/core/modal/AbstractModal/AbstractModal';
import { useSelectedCart } from '@feature/quotation/hooks/useSelectedCart';
import { useSelectedQuotation } from '@feature/quotation/hooks/useSelectedQuotation';

interface SelectOptionProps extends CommonModalProps {
  onConfirm: () => void;
}

const ModalSelectOption = ({ visible, onClose, onConfirm }: SelectOptionProps) => {
  useOverflowModal(visible);

  //선택한 견적함
  const { selectedQuotation } = useSelectedQuotation();

  //선택한 상품
  const { selectedCart, setSelectedCart } = useSelectedCart();

  //이 모달에서 선택한 옵션 (이미 적용한 옵션은 기본적으로 들어감)
  const [selectedOptions, setSelectedOptions] = useState<OptionDto[]>([]);
  useEffect(() => {
    if (visible && selectedCart?.options?.length) {
      setSelectedOptions(selectedCart.options);
    }
  }, [visible, selectedCart]);

  const changeOptionCnt = (selected_option_no: number, option_cnt: number) => {
    setSelectedOptions(
      selectedOptions.map(so => {
        if (so.product.no == selected_option_no) {
          return { ...so, product_cnt: option_cnt };
        }
        return so;
      }),
    );
  };

  //적용가능한 옵션 리스트
  const [availableOptions, setAvailableOptionList] = useState<GroupProductDto[]>([]);

  useEffect(() => {
    if (visible && selectedCart) {
      fetchAvailableOptions(selectedCart.product.no)
        .then(r => {
          setAvailableOptionList(r.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [selectedCart, visible]);

  //모달 닫으면서 초기화
  const closeOptionModal = () => {
    setSelectedOptions([]);
    setAvailableOptionList([]);
    setSelectedCart(undefined);
    document.body.style.overflow = 'visible';
    onClose();
  };

  const dropdownRef = useRef(null);
  const [optionSelectVisible, setSelectVisible] = useState(false);
  const onClick = () => setSelectVisible(!optionSelectVisible);
  useEffect(() => {
    const pageClickEvent = (e: MouseEventHandler) => {
      // @ts-ignore
      if (dropdownRef && dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
        setSelectVisible(!optionSelectVisible);
      }
    };
    if (optionSelectVisible) {
      // @ts-ignore
      window.addEventListener('click', pageClickEvent);
    }
    return () => {
      // @ts-ignore
      window.removeEventListener('click', pageClickEvent);
    };
  }, [optionSelectVisible]);

  // 옵션 추가
  const selectOption = (option: GroupProductDto) => {
    const optionDto = new OptionDto();
    optionDto.product_cnt = 1;
    optionDto.cart_no = undefined;
    optionDto.product = option;
    setAvailableOptionList(availableOptions.filter(ao => ao.no !== option.no));
    setSelectedOptions(prev => [...prev, optionDto]);
    setSelectVisible(false);
  };

  //옵션 삭제
  const removeOption = (selectedOption: OptionDto) => {
    const productDto = new GroupProductDto();
    productDto.no = selectedOption.product.no;
    productDto.price = selectedOption.product.price;
    productDto.name = selectedOption.product.name;
    const duplicate = availableOptions.some(option => option.no === selectedOption.product.no);
    if (!duplicate) {
      setAvailableOptionList(availableOptions.concat(productDto));
    }
    setSelectedOptions(selectedOptions.filter(sc => sc.product.no !== productDto.no));
  };

  //옵션 선택완료
  const confirmOption = () => {
    if (selectedQuotation && selectedCart) {
      const dto = new GroupOptionSelectDto();
      dto.cart_no = selectedCart.cart_no;
      dto.group_no = selectedQuotation.group_no;
      dto.options = selectedOptions.map(option => {
        const optionDto = new OptionSelectDto();
        optionDto.product_cnt = option.product_cnt;
        optionDto.product_no = option.product.no;
        return optionDto;
      });

      applySelectOption(dto)
        .then(() => {
          closeOptionModal();
          onConfirm();
        })
        .catch(err => {
          console.log(err);
        });
    }
  };
  return (
    <AbstractModal
      visible={visible}
      onClose={closeOptionModal}
      title='옵션 선택'
      confirmText='선택완료'
      cancelText='취소'
      onConfirm={confirmOption}
      canConfirm
      noPadding
    >
      <Container>
        <div className='select-coupon-box'>
          <div className='select-coupon' onClick={onClick}>
            <span>선택 옵션</span>
            <IconKeyboardDownArrow />
          </div>
        </div>

        {/* 가능한 옵션 선택 */}
        <div className={`coupon-menu ${optionSelectVisible ? 'active' : 'inactive'}`} ref={dropdownRef}>
          <ul>
            {availableOptions
              ?.filter(ao => !selectedOptions.map(so => so.product.no).includes(ao.no))
              .map((ao, index) => (
                <li key={index + 'available_option_' + ao.no} onClick={() => selectOption(ao)}>
                  <p className='coupon-title'>{ao.name}</p>
                  {ao.price ? <span className='coupon-price'>{showPrice(ao.price)}원</span> : ''}
                </li>
              ))}
          </ul>
        </div>

        <ul className='selected-coupon-list'>
          {selectedOptions.map((so, index) => (
            <li className='selected-coupon-item' key={index + 'selected_option_pno' + so.product.no}>
              <div className='top-box'>
                <p className='coupon-title'>{so.product.name}</p>
                <button className='delete-coupon-btn' onClick={() => removeOption(so)}>
                  <IconX />
                </button>
              </div>
              <div className='bottom-box'>
                <div className='counter-box'>
                  <Counter
                    initNumber={so.product_cnt}
                    onChangeNumber={number => {
                      changeOptionCnt(so.product.no, number);
                    }}
                  />
                </div>
                <span className='coupon-price'>{showPrice((so.product.price || 0) * so.product_cnt)}원</span>
              </div>
            </li>
          ))}
        </ul>

        <div className={`extra-option-price `}>
          <p>
            옵션 추가 금액
            {/* 여기도 옵션 추가 금액 뒤에 띄어쓰기 */}
            <span> {showPrice(selectedOptions.reduce((acc, option) => (acc += option.product.price * option.product_cnt), 0))}</span>
            <span>원</span>
          </p>
        </div>
      </Container>
    </AbstractModal>
  );
};
export default ModalSelectOption;
const Container = styled.div`
  width: 100%;
  .select-coupon-box {
    width: 100%;
    padding: 20px 30px 0 30px;
    @media all and (max-width: ${theme.pc}px) {
      padding: 20px 15px 0 15px;
    }

    .select-coupon {
      width: 100%;
      height: 45px;
      position: relative;
      border: 1px solid #dfdfdf;
      background-color: #fff;
      font-size: 15px;
      line-height: 45px;
      vertical-align: middle;
      padding-left: 15px;
      cursor: pointer;

      > img {
        display: block;
        position: absolute;
        top: 18px;
        right: 16.5px;
        width: 18px;
        height: 9px;
      }

      > svg {
        display: block;
        position: absolute;
        top: 18px;
        right: 16.5px;
        width: 18px;
        height: 9px;
      }
    }
  }

  .coupon-menu {
    position: absolute;
    z-index: 11;
    background-color: #fbfbfb;
    padding: 0 30px;
    width: 100%;
    opacity: 0;
    visibility: hidden;
    display: none;
    transform: translateY(-20px);
    transition: opacity 0.4s ease, transform 0.4 ease;
    @media all and (max-width: ${theme.pc}px) {
      padding: 0 15px;
    }

    > ul {
      width: 100%;
      overflow-x: hidden;

      li {
        width: 100%;
        padding: 13px 0 13px 15px;
        border: 1px solid #dfdfdf;
        border-top: none;
        background-color: #fff;
        font-size: 14px;
        position: relative;
        cursor: pointer;

        &:last-child {
          //border-bottom: none;
        }

        .coupon-title {
          display: inline-block;
          width: calc(100% - 104px);
          line-height: 18px;
        }

        .coupon-price {
          display: inline-block;
          position: absolute;
          top: 15px;
          right: 15px;
          vertical-align: top;
        }
      }
    }
  }

  .coupon-menu.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    display: block;
  }

  .selected-coupon-list {
    width: 100%;
    padding: 0 30px;
    margin-top: 15px;
    height: 300px;
    overflow-x: hidden;
    overflow-y: scroll;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }

    @media all and (max-width: ${theme.pc}px) {
      padding: 0 15px;
      height: 270px;
    }

    .selected-coupon-item {
      width: 100%;
      position: relative;
      padding: 13px 0 14px 15px;
      border: 1px solid #dfdfdf;
      margin-bottom: 10px;
      padding-left: 15px;
      background-color: #fff;

      .top-box {
        width: 100%;
        position: relative;
        margin-bottom: 10px;

        .coupon-title {
          display: inline-block;
          font-size: 15px;
          line-height: 22px;
          width: calc(100% - 41px);
        }

        .delete-coupon-btn {
          ${props => props.theme.resetBtnStyle};
          display: inline-block;
          width: 41px;
          height: 22px;
          font-size: 18px;
          text-align: center;
          vertical-align: top;
          /* > img {
              width: 10px;
              height: 10px;
            } */

          > svg {
            vertical-align: top;
            margin-top: 5px;
            width: 12px;
            height: 12px;
          }
        }
      }

      .bottom-box {
        width: 100%;
        position: relative;

        .counter-box {
          display: inline-block;
        }

        > .coupon-price {
          display: inline-block;
          position: absolute;
          right: 15px;
          font-size: 15px;
          top: 7px;
        }
      }
    }
  }

  .extra-option-price {
    width: 100%;
    text-align: center;
    font-size: 16px;
    color: #8c8c8c;

    > p {
      > span {
        color: #262626;

        &:first-child {
          font-weight: 700;
        }
      }
    }
  }
`;
