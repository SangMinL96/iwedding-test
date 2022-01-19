import { useModalVisible } from '@hooks/useModalVisible';
import upArrowBlack from '@images/common/up_arrow_black.png';
import upArrowGray from '@images/common/up_arrow_gray.png';
import { EnterpriseDto } from '@modules/enterprise/enterprise.interface';
import { WmProductEntity } from '@modules/product/product.interface';
import theme from '@styles/theme';
import IconDeleteCircle from '@svgs/icon_delete_circle';
import { FLOATING_BUTTON } from '@utils/modalKeys';
import Image from 'next/image';
import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';

interface Props {
  list: (WmProductEntity | EnterpriseDto)[];
  onDeleteProduct: (any) => () => void;
  onConfirm: () => void;
  title?: string;
  noFooter?: boolean;
}

const FloatingSection = ({ list, onDeleteProduct, onConfirm, title = '선택한 상품', noFooter = false }: Props) => {
  const { modalVisible: visible, setModalVisible: setVisible } = useModalVisible(FLOATING_BUTTON);

  const onClickFloater = useCallback(() => {
    if (list.length) setVisible(!visible);
  }, [list, setVisible, visible]);

  const Item = list.length && 'product_price' in list[0] ? ProductItem : EnterpriseItem;

  return (
    <>
      <FloatingBox visible={visible}>
        <button className='floating_btn' onClick={onClickFloater}>
          <p>
            {title} <span>{list.length}</span>
          </p>
          <Image
            src={visible ? upArrowBlack : upArrowGray}
            alt='upArrow'
            width={9.5}
            height={6}
            className={visible ? 'reverse' : 'default'}
          />
        </button>
      </FloatingBox>
      <FloatingWrapper visible={visible}>
        <div className='selected_modal'>
          <div className='selected_list'>
            {list.map(sp => (
              <div className='selected_item' key={'selected_' + sp.no}>
                <button className='selected_cancel' onClick={onDeleteProduct(sp)}>
                  <IconDeleteCircle />
                </button>
                <div className='content'>
                  <Item item={sp as any} />
                </div>
              </div>
            ))}
          </div>
          {!noFooter
            ? list.length > 0 && (
                <div className={`footer`}>
                  <button className='cancel_btn' onClick={onClickFloater}>
                    취소
                  </button>
                  <button className='confirm_btn' onClick={onConfirm}>
                    선택 완료
                  </button>
                </div>
              )
            : null}
        </div>
      </FloatingWrapper>
    </>
  );
};

const ProductItem = ({ item }: { item: WmProductEntity }) => (
  <>
    <div className='category'>
      [{item.category}] {item.ent_name}
    </div>
    <div className='name'>{item.name}</div>
  </>
);

const EnterpriseItem = ({ item }: { item: EnterpriseDto }) => (
  <>
    <div className='category'>{item.category}</div>
    <div className='name'>{item.enterprise_name}</div>
  </>
);

export default FloatingSection;

const FloatingBox = styled.div<{ visible: boolean }>`
  width: 200px;
  position: absolute;
  bottom: calc(var(--ios-bottom) + 20px);
  transition: all 0.3s;
  left: 50%;
  transform: translateX(-50%);

  .floating_btn {
    display: block;
    width: 200px;
    height: 50px;
    border: 1px solid #262626;
    color: ${theme.black};
    margin: 0 auto;
    border-radius: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 17.5px 0 16px;
    box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.2);

    > p {
      font-size: 14px;
      font-weight: 700;

      > span {
        color: #fd4381;
      }
    }

    > span {
      > img.reverse {
        transform: rotate(180deg);
      }
    }
  }

  ${({ visible }) =>
    visible &&
    css`
      bottom: calc(300px + var(--ios-bottom));
    `}
`;

const FloatingWrapper = styled.div<{ visible: boolean }>`
  width: 100%;
  position: absolute;
  bottom: calc(-283px + var(--ios-bottom));
  transition: all 0.3s;

  > div.selected_modal {
    margin-top: 20px;
    display: block;
    width: 100%;
    height: 283px;
    overflow-x: hidden;
    z-index: 100002;

    padding: 0 15px;
    border-top: 1px solid #dfdfdf;
    background-color: #fff;

    > div.selected_list {
      width: 100%;
      min-height: 192px;
      overflow-y: scroll;
      ${theme.hideScroll};

      > div.selected_item {
        width: 100%;
        height: 70px;
        border-bottom: 1px solid #f5f5f5;
        display: flex;
        align-items: center;

        .selected_cancel {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          display: inline-block;
          margin-right: 10px;

          > img {
            width: 25px;
            height: 25px;
          }
        }

        .content {
          width: calc(100% - 35px);

          .category {
            font-size: 11px;
            color: #8c8c8c;
            margin-bottom: 3px;
          }

          .name {
            width: calc(100% - 17px);
            display: block;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            font-size: 15px;
            font-weight: 700;
          }
        }
      }
    }
    > div.footer {
      background-color: #fff;
      width: 100%;
      height: 90px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: absolute;
      bottom: 0;
      z-index: 1;

      > button {
        display: inline-block;
        height: 50px;
        font-size: 16px;
      }

      > button.cancel_btn {
        width: 30%;
        border: 1px solid #dfdfdf;
        color: ${theme.black};
        background-color: #fff;
        margin-right: 5px;
      }

      > button.confirm_btn {
        color: #fff;
        width: 69%;
        margin-right: 30px;
        background-color: ${props => props.theme.blue};
      }
    }
  }

  ${({ visible }) =>
    visible &&
    css`
      bottom: var(--ios-bottom);
    `}
`;
