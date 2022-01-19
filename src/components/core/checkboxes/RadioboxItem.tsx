import theme from '@styles/theme';
import React, { MutableRefObject } from 'react';
import styled from 'styled-components';
import radioUnchecked from '@images/common/radio_circle_unchecked.png';
import radioChecked from '@images/common/radio_circle_checked.png';
import { AddressMetadata, template_input_title } from '@modules/mypage/quotation/QuotationInterface';
import { InputWithClear } from '../inputs';

const Container = styled.div`
  .radio_container {
    width: 100%;
    /* height: 75px; */
    border-bottom: 1px solid #dfdfdf;
    padding: 17.5px 0;
    display: flex;
    align-items: center;
    position: relative;
    @media all and (max-width: ${theme.pc}px) {
      padding-left: 15px;
      padding-right: 15px;
    }
    .radio-box {
      display: inline-block;
      width: 20px;
      height: 20px;
      .radio-item {
        display: inline-flex;
        align-items: center;
        .radio-btn {
          width: 20px;
          height: 20px;
          display: inline-flex;
          input[type='radio'] {
            display: none;
          }
          input[type='radio'] + label {
            display: inline-flex;
            width: 20px;
            height: 20px;
            background: url(${radioUnchecked.src}) no-repeat;
            background-size: 20px;
          }
          input[type='radio']:checked + label {
            display: inline-flex;
            width: 20px;
            height: 20px;
            background: url(${radioChecked.src}) no-repeat;
            background-size: 20px;
          }
        }
      }
    }
    .content_container {
      display: inline-block;
      width: 100%;
      height: 100%;
      vertical-align: top;
      margin-left: 10px;
      position: relative;
      display: flex;
      align-items: center;
      > label {
        width: 100%;
      }
      .title {
        width: calc(100% - 105px);
        display: inline-block;
        font-size: 15px;
        font-weight: 500;
        margin-right: 5px;
      }
      .title.middle {
        vertical-align: middle;
      }
      .sub_title {
        display: inline-block;
        margin-top: 5px;
        font-size: 14px;
        color: #8c8c8c;
        /* vertical-align: middle; */
      }
      .sub_title.less_width {
        width: calc(100% - 105px);
        margin-right: 5px;
      }
      .sub_title.on {
        color: ${props => props.theme.blue};
      }
      .ent_box {
        display: inline-block;
        width: calc(100% - 105px);
        margin-top: 5px;
        font-size: 14px;
        color: ${props => props.theme.blue};
        > span {
          display: block;
          line-height: 20px;
        }
      }
      .datetime_container,
      .date_container,
      .time_container {
        display: inline-block;
        position: absolute;
        right: 0;
        top: -16px;
      }
      .address_btn_container {
        display: inline-block;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
        width: 100px;
        /* justify-content: center;
        align-items: center; */
        .address_btn_txt {
          display: block;
          width: 70px;
          height: 35px;
          margin: 0 auto;
          background-color: #d9d9de;
          color: #fff;
          font-size: 13px;
        }
        .address_btn_txt.on {
          background-color: #262626;
        }
      }
    }
    .content_container.no_mg_left {
      margin-left: 0;
    }
  }
  .radio_container.more_padding {
    padding: 27px 0;
    @media all and (max-width: ${theme.pc}px) {
      padding: 27px 15px;
    }
  }
`;

interface ItemProps {
  title: string;
  defaultCheck?: boolean;
  sub_title?: string;
  onSelect: (title: string) => void;
  onClickSearchAddressBtn?: (title: string) => void;
  is_input?: boolean;
  onChangeText?: (text: string) => void;
  invisible_radio?: boolean;
  id?: string;
  name?: string;
  placeholder?: string;
  ent_name?: string;
  ent_address?: string;
  inputRef?: MutableRefObject<HTMLInputElement>;
  enable_input?: boolean;
  is_address?: boolean;
  meta_address?: AddressMetadata;
  address_btn_txt?: string;
}

const RadioboxItem = ({
  title,
  sub_title,
  defaultCheck,
  is_input,
  onChangeText,
  onSelect,
  invisible_radio,
  address_btn_txt,
  onClickSearchAddressBtn,
  id,
  name,
  is_address,
  placeholder,
  inputRef,
  meta_address,
}: ItemProps) => {
  return (
    title && (
      <Container>
        <div className={'radio_container'}>
          {/*select box*/}
          {!invisible_radio && (
            <div className={`radio-box`}>
              <div className='radio-item'>
                <div className='radio-btn'>
                  {defaultCheck ? (
                    <input type='radio' onChange={() => onSelect(title)} id={id} name={name} defaultChecked={defaultCheck} />
                  ) : (
                    <input type='radio' onChange={() => onSelect(title)} id={id} name={name} />
                  )}
                  <label htmlFor={id} />
                </div>
              </div>
            </div>
          )}
          <div className={!invisible_radio ? 'content_container' : 'content_container no_mg_left'}>
            <label htmlFor={id}>
              <div className={is_input === true ? 'title middle' : 'title'}>{title}</div>
              {/* 본식 일시 미정: on 클래스 삭제 */}
              {sub_title && <div className={is_address ? 'sub_title on less_width' : 'sub_title on'}>{sub_title}</div>}

              {meta_address && title !== template_input_title && (
                <div className='ent_box'>
                  <span className='ent_text'>{meta_address.ent_name}</span>
                  <span className='ent_text'>{meta_address.ent_address.replace('|', ' ')}</span>
                </div>
              )}

              {/*직접입력 일 시 */}
              {meta_address && title == template_input_title && (
                <div className='ent_box'>
                  <span className='ent_text'>{meta_address.ent_name}</span>
                  <span className='ent_text'>{meta_address.ent_address.replace('|', ' ')}</span>
                </div>
              )}

              {meta_address && !meta_address.ent_address && <div className='sub_title'>업체를 선택하세요</div>}
              {/*input box */}
              {is_input && onChangeText && <InputWithClear onChangeText={onChangeText} placeHolder={placeholder} ref={inputRef} />}
              {address_btn_txt && onClickSearchAddressBtn && (
                <div className='address_btn_container'>
                  <button
                    className={`address_btn_txt ${!meta_address || !meta_address.ent_address ? 'on' : ''}`}
                    onClick={() => onClickSearchAddressBtn(title)}
                  >
                    {address_btn_txt}
                  </button>
                </div>
              )}
            </label>
          </div>
        </div>
      </Container>
    )
  );
};

export default React.memo(RadioboxItem);
