import QnAButton from '@feature/Calculator/components/ProductItem/QnAButton';
import { QuoteBottomBtnBox } from '@feature/quotation/components/buttonBoxes/QuoteBottomBtnBox';
import { BlueButton } from '@feature/quotation/components/buttons/BlueButton';
import { WhiteButton } from '@feature/quotation/components/buttons/WhiteButton';
import DetailSelectContainer from '@feature/quotation/components/DetailSelectContainer';
import ModalShoesAddress from '@feature/quotation/components/modals/metadata_modal/ModalShoesAddress';
import QuoteDetailProduct from '@feature/quotation/components/QuoteDetailProduct';
import { useSelectedCart } from '@feature/quotation/hooks/useSelectedCart';
import { useSelectedCartList } from '@feature/quotation/hooks/useSelectedCartList';
import { useSelectedQuotation } from '@feature/quotation/hooks/useSelectedQuotation';
import { getTotalPrice } from '@feature/quotation/utils/getTotalPrice';
import { validateCart } from '@feature/quotation/utils/validateCart';
import { useDeepEffect } from '@hooks/useDeepEffect';
import { Desktop } from '@hooks/useDevice';
import { useModalVisible } from '@hooks/useModalVisible';
import {
  addProductToQuotation,
  adminAddCart,
  adminDetailLog,
  adminLog,
  deleteCart,
  editGroupNo,
  useQuotationDetail,
} from '@modules/mypage/quotation/QuotationAPI';
import { GroupAddProductDto, SelectedProduct } from '@modules/mypage/quotation/QuotationInterface';
import { WmProductEntity } from '@modules/product/product.interface';
import { checkoutClick } from '@modules/user/UserLogAPI';
import theme from '@styles/theme';
import {
  ADD_PRODUCT_MODAL,
  COPY_QUOTE_MODAL,
  QUOTE_COUPON_MODAL,
  QUOTE_META_MODAL,
  QUOTE_OPTION_MODAL,
  QUOTE_WEDDING_SHOES_MODAL,
} from '@utils/modalKeys';
import { getScrollY, openPopup, setScrollY, showPrice } from '@utils/util';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import styled from 'styled-components';

const AddPrdButton = dynamic(() => import('@feature/quotation/components/buttons/AddPrdButton'));
const MyPageLayout = dynamic(() => import('@components/layout/MyPageLayout'));
const Loading = dynamic(() => import('@components/Loading'));
const QuoteDetailBanner = dynamic(() => import('@feature/quotation/components/QuoteDetailBanner'));
const QuoteTotalPrice = dynamic(() => import('@feature/quotation/components/QuoteTotalPrice'));
const ModalAddQuote = dynamic(() => import('feature/quotation/components/modals/ModalAddQuote'));
const ModalCopyQuotation = dynamic(() => import('feature/quotation/components/modals/ModalCopyQuotation'));
const ModalSelectCoupon = dynamic(() => import('feature/quotation/components/modals/ModalSelectCoupon'));
const ModalSelectOption = dynamic(() => import('feature/quotation/components/modals/ModalSelectOption'));
const ModalAddProduct = dynamic(() => import('feature/quotation/components/modals/ModalAddProduct'));
const ModalMetadataIndex = dynamic(() => import('feature/quotation/components/modals/metadata_modal/ModalMetadataIndex'));

interface SelectBoxRefs {
  cart_no: number;
  ref: MutableRefObject<HTMLInputElement>;
}

const QuotationDetail = () => {
  const router = useRouter();
  const isDesktop = Desktop();
  const { id: quotation_id, from_talk, is_realtime } = router.query;
  const [fromTalk, isRealtime] = [!!from_talk, !!is_realtime];
  const { data: quotation, mutate: detailMutate, isValidating } = useQuotationDetail(Number(quotation_id), !!isRealtime);
  const { selectedCartList, setSelectedCartList, clearSelectedCartList } = useSelectedCartList();
  const { selectedQuotation, setSelectedQuotation } = useSelectedQuotation();
  const [selectedPrice, setSelectedPrice] = useState(0);
  //????????? ????????? ????????? ?????????????????????
  useDeepEffect(() => {
    if (quotation) {
      setSelectedQuotation(quotation);
      setSelectedCartList(quotation.carts);
    }
  }, [quotation]);

  useEffect(() => {
    setSelectedPrice(selectedCartList.reduce((acc, cartDto) => (acc += getTotalPrice(cartDto)), 0));
  }, [selectedCartList, selectedQuotation]);

  //Refetch ????????? ??????
  const refetchQuotation = useCallback(async () => {
    const scroll = getScrollY();
    await detailMutate();
    setScrollY(scroll);
  }, [detailMutate]);
  //????????????
  const onDeleteCart = useCallback(
    (cart_nos: number[]) => async () => {
      if (cart_nos?.length) {
        confirmAlert({
          title: '????????? ?????????????????????????',
          buttons: [
            {
              label: '??????',
              onClick: async () => {
                if (selectedQuotation && cart_nos.length) {
                  try {
                    const res = await deleteCart(String(selectedQuotation.group_no), cart_nos);
                    setSelectedCartList(selectedCartList.filter(sc => !cart_nos.includes(sc.cart_no)));
                    refetchQuotation();
                  } catch (error) {
                    console.error('Error occured on onDeleteCart', error);
                  }
                }
                return null;
              },
            },
            {
              label: '??????',
              onClick: () => null,
            },
          ],
        });
      } else {
        confirmAlert({
          title: '????????? ??????????????????.',
          buttons: [
            {
              label: '??????',
              onClick: null,
            },
          ],
        });
      }
    },
    [selectedCartList, setSelectedCartList, selectedQuotation, refetchQuotation],
  );
  // ????????? ????????? ?????? ????????????????????? (Copy Modal?????? ??????)
  const { selectedCart } = useSelectedCart();
  const [selectedCartNo, setSelectedCartNo] = useState<number[]>([]);

  useDeepEffect(() => {
    if (selectedCart) {
      setSelectedCartNo([selectedCart.cart_no]);
    } else if (selectedCartList.length) {
      setSelectedCartNo(selectedCartList.map(sc => sc.cart_no));
    } else {
      setSelectedCartNo([]);
    }
  }, [selectedCartList, selectedCart]);

  const [selectBoxRefs, setSelectBoxRef] = useState<SelectBoxRefs[]>([]);

  //???????????? Ref??????
  const getRefByCartNo = useCallback((cart_no: number) => selectBoxRefs.find(sbr => sbr?.cart_no === cart_no)?.ref, [selectBoxRefs]);

  //???????????? ?????? ??????
  const onClickAllCart = useCallback(
    (checked: boolean, is_init = false) => {
      if (selectedQuotation && selectBoxRefs) {
        let carts = [...selectedQuotation.carts];
        // ????????????????????? ???????????? 0??? ?????? ???????????? ??????
        if (!is_init) {
          carts = carts.filter(({ product }) => !(product.limited_sales && product.limited_sales_cnt == 0));
        }

        carts.forEach(({ cart_no }) => {
          const ref = getRefByCartNo(cart_no);
          if (ref?.current) {
            ref.current.checked = checked;
          }
        });
        if (checked) {
          setSelectedCartList(carts);
        } else {
          clearSelectedCartList();
        }
      }
    },
    [selectBoxRefs, selectedQuotation, getRefByCartNo, setSelectedCartList, clearSelectedCartList],
  );

  //???????????? Refs ??????
  useDeepEffect(() => {
    if (selectedQuotation?.carts?.length) {
      setSelectBoxRef(
        selectedQuotation.carts.map(c => ({
          cart_no: c.cart_no,
          ref: React.createRef<HTMLInputElement>(),
        })),
      );
    } else {
      setSelectBoxRef([]);
    }
  }, [selectedQuotation]);

  /**
   * ?????? ????????????
   */
  const { modalVisible: visibleOptionModal, setModalVisible: setVisibleOptionModal } = useModalVisible(QUOTE_OPTION_MODAL);
  const { modalVisible: visibleMetaModal } = useModalVisible(QUOTE_META_MODAL);
  const { modalVisible: visibleCopyModal, setModalVisible: setVisibleCopyModal } = useModalVisible(COPY_QUOTE_MODAL);
  const { modalVisible: visibleAddProductModal, setModalVisible: setVisibleAddProductModal } = useModalVisible(ADD_PRODUCT_MODAL);
  const { modalVisible: visibleCouponModal, setModalVisible: setVisibleCouponModal } = useModalVisible(QUOTE_COUPON_MODAL);
  const { modalVisible: visibleWSModal, setModalVisible: setVisibleWSModal } = useModalVisible(QUOTE_WEDDING_SHOES_MODAL);

  //????????????
  const checkout = useCallback(async () => {
    const validated = validateCart(selectedCartList);

    if (selectedQuotation && validated) {
      await Promise.all(
        selectedCartList.map(sc =>
          checkoutClick({
            target_quotation_name: selectedQuotation.group_name,
            product_name: sc.product.name,
            enterprise_name: sc.ent_name,
          }),
        ),
      );

      return true;
    }

    return false;
  }, [selectedQuotation, selectedCartList]);

  const handleMyCheckout = useCallback(async () => {
    if (selectedQuotation && selectedCartList.length && selectedPrice) {
      const isValidCheckout = await checkout();

      if (isValidCheckout) {
        const cartNos = selectedCartNo.join();
        location.href = `/cart/checkout?group_no=${selectedQuotation.group_no}&cart_item_no=${cartNos}`;
      }
    }
  }, [selectedQuotation, checkout, selectedCartList.length, selectedCartNo, selectedPrice]);

  const allSelectBtnRef = useRef<any>(null);
  const unCheckAllSelect = useCallback(() => {
    if (allSelectBtnRef?.current) allSelectBtnRef.current.checked = false;
  }, []);
  //???????????? ?????? ?????????
  const showCopyModal = useCallback(() => {
    if (selectedCartNo.length) {
      router.push(router.asPath + '#CopyModal');
      setVisibleCopyModal(true);
    } else {
      confirmAlert({ title: '????????? ??????????????????.', buttons: [{ label: '??????', onClick: null }] });
    }
  }, [setVisibleCopyModal, router, selectedCartNo.length]);
  //?????? ?????? ????????????
  const onAllCopy = useCallback(() => {
    if (selectedQuotation?.carts?.length) {
      if (allSelectBtnRef?.current) {
        allSelectBtnRef.current.checked = true;
      }
      onClickAllCart(true);
      showCopyModal();
    }
  }, [showCopyModal, selectedQuotation, onClickAllCart]);

  const [isMyQuote, setMyQuote] = useState(false);
  const [visibleAddQuote, setVisibleAddQuote] = useState(false);

  useDeepEffect(() => {
    if (selectedQuotation) {
      setMyQuote(selectedQuotation.group_add_cart);
      if (selectedQuotation.group_from) {
        adminDetailLog(selectedQuotation);
      }
      if (!selectedQuotation.group_from) {
        adminLog(selectedQuotation);
      }
    }
  }, [selectedQuotation]);

  const flipGroupAddCart = useCallback(async () => {
    if (selectedQuotation) {
      const response = await editGroupNo(selectedQuotation?.group_no);
      const logText1 = `<a href="https://www.iwedding.co.kr${router.pathname}" target="_blank">::${selectedQuotation.group_name}::???????????????????????????????????????</a>`;
      const logText2 = selectedQuotation?.carts.map(item => `${item.product.category} :::: ${item.ent_code}`).join(' ##### ');
      const log = await adminAddCart(logText1, logText2, selectedQuotation.group_no);
    }
  }, [selectedQuotation, router.pathname]);

  const onOpenAddQuoteModal = useCallback(() => {
    setVisibleAddQuote(true);
    flipGroupAddCart();
    router.push(router.asPath + '#ModalAddQuote');
  }, [setVisibleAddQuote, flipGroupAddCart, router]);

  const onCloseAddQuoteModal = useCallback(() => {
    setVisibleAddQuote(false);
    if (typeof window !== 'undefined') window.location.href = `/quotation/${selectedQuotation?.group_no}?from_talk=true`;
  }, [selectedQuotation?.group_no, setVisibleAddQuote]);

  const addProductFromModal = useCallback(
    async (selectedProduct: WmProductEntity[]) => {
      console.log(`selectedQuotation.group_no`, selectedQuotation?.group_no);
      if (!selectedQuotation?.group_no) {
        return confirmAlert({
          title: '?????? ????????? ?????????????????????.',
          message: '?????? ????????? ????????????.',
          buttons: [{ label: '??????', onClick: () => detailMutate() }],
        });
      }
      const addDto = new GroupAddProductDto();
      addDto.group_nos = [Number(selectedQuotation.group_no)];

      addDto.selectedProducts = selectedProduct.map(sp => {
        const selectProduct = new SelectedProduct();
        selectProduct.product_no = sp.no;
        return selectProduct;
      });

      await addProductToQuotation(addDto);
      detailMutate();
      try {
        clearSelectedCartList();
      } catch (err) {
        confirmAlert({ title: '?????? ?????? ??? ????????? ??????????????????.', buttons: [{ label: '??????', onClick: () => null }] });
        console.log(err);
      }
    },
    [clearSelectedCartList, detailMutate, selectedQuotation?.group_no],
  );

  const onQnaModal = () => {
    if (isDesktop) {
      if (is_realtime) {
        global.window &&
          openPopup(`/request/replace?quotation_no=${quotation_id}&category=?????????&is_realtime=?????????&device=pc`, 'form_web');
      } else {
        global.window && openPopup(`/request/replace?quotation_no=${quotation_id}&category=?????????&device=pc`, 'form_web');
      }
    } else {
      if (is_realtime) {
        router.push(`/request/replace?quotation_no=${quotation_id}&category=?????????&is_realtime=?????????`);
      } else {
        router.push(`/request/replace?quotation_no=${quotation_id}&category=?????????`);
      }
    }
  };

  return (
    <>
      <MyPageLayout title='????????? ????????????'>
        {isValidating ? (
          <Loading body='????????? ????????? ???????????? ??? ?????????.' />
        ) : selectedQuotation ? (
          <Inner>
            <QuoteDetailBanner
              quotation={selectedQuotation}
              quotationId={String(selectedQuotation.group_no)}
              isRealtime={isRealtime}
              fromTalk={!!fromTalk}
            />
            {!fromTalk ? (
              <DetailSelectContainer
                allSelectBtnRef={allSelectBtnRef}
                onClickAllCart={onClickAllCart}
                onDeleteCart={onDeleteCart}
                showCopyModal={showCopyModal}
                selectedCartNo={selectedCartNo}
                isRealtime={isRealtime}
              />
            ) : null}
            <ItemContainer>
              {selectedQuotation?.carts?.map(cart => (
                <QuoteDetailProduct
                  key={cart.cart_no}
                  cart={cart}
                  quotation={selectedQuotation}
                  unCheckAllSelect={unCheckAllSelect}
                  checkBoxRef={getRefByCartNo(cart.cart_no)}
                  onDeleteCart={onDeleteCart}
                  isRealtime={isRealtime}
                  fromTalk={!!fromTalk}
                />
              ))}
            </ItemContainer>
            {!isDesktop && !isRealtime && !fromTalk ? (
              <BtnBox>
                <AddPrdButton fontSize={15} />
              </BtnBox>
            ) : null}
            <QuoteTotalPrice
              total={selectedQuotation.group_total_price}
              coupon={selectedQuotation.group_total_coupon_price}
              fontSize={16}
            />
            <QuoteBottomBtnBox isMobile={!isDesktop} fromTalk={!!fromTalk} disableFixed={selectedQuotation?.carts?.length < 2}>
              {fromTalk ? (
                <>
                  {!isMyQuote && (
                    <WhiteButton onClick={onOpenAddQuoteModal}>
                      <span>??? ????????????</span>
                      <span>????????????</span>
                    </WhiteButton>
                  )}
                  <BlueButton onClick={handleMyCheckout} disabled={!selectedPrice}>
                    <span>?????? ????????? {showPrice(selectedPrice)}???</span>
                    <span>?????? ?????? ????????????</span>
                  </BlueButton>
                </>
              ) : !isRealtime ? (
                <>
                  {isDesktop && <AddPrdButton smallBtn />}
                  <BlueButton onClick={handleMyCheckout} disabled={!selectedPrice}>
                    <span>?????? ????????? {showPrice(selectedPrice)}???</span>
                    <span>?????? ?????? ????????????</span>
                  </BlueButton>
                </>
              ) : (
                <>
                  <WhiteButton onClick={showCopyModal}>?????? ?????? ??????</WhiteButton>
                  <BlueButton onClick={onAllCopy}>?????? ?????? ??????</BlueButton>
                </>
              )}
            </QuoteBottomBtnBox>
            {quotation?.carts?.length > 0 && (
              <BtnBox onClick={onQnaModal}>
                <ReplaceQnaBtn>????????????</ReplaceQnaBtn>
              </BtnBox>
            )}
          </Inner>
        ) : null}
      </MyPageLayout>

      {/* ??? ????????? ?????? ?????? */}
      {visibleAddQuote && <ModalAddQuote visible={visibleAddQuote} onClose={onCloseAddQuoteModal} />}

      {/* ???????????? ???????????? ?????? */}
      {visibleWSModal && <ModalShoesAddress />}
      {/*???????????? ??????*/}
      {visibleMetaModal && <ModalMetadataIndex onComplete={refetchQuotation} />}

      {/*?????? ?????? ??????*/}
      {visibleCopyModal && (
        <ModalCopyQuotation
          selectedCartNo={selectedCartNo}
          visible={visibleCopyModal}
          onClose={() => setVisibleCopyModal(false)}
          is_realtime={isRealtime}
        />
      )}

      {/*?????? ?????? */}
      {visibleCouponModal && (
        <ModalSelectCoupon visible={visibleCouponModal} onClose={() => setVisibleCouponModal(false)} onConfirm={refetchQuotation} />
      )}

      {/*?????? ?????? */}
      {visibleOptionModal && (
        <ModalSelectOption visible={visibleOptionModal} onClose={() => setVisibleOptionModal(false)} onConfirm={refetchQuotation} />
      )}

      {/*?????? ?????? ?????? */}
      {visibleAddProductModal && (
        <ModalAddProduct
          visible={true}
          onClose={() => setVisibleAddProductModal(false)}
          onConfirm={selectedProduct => addProductFromModal(selectedProduct)}
        />
      )}
    </>
  );
};

export default QuotationDetail;
const QnABtn = styled(QnAButton)`
  width: 100%;
  height: 50px;
  border: 1px solid #dfdfdf;
  color: ${theme.black};
  font-size: 16px;
`;
const Inner = styled.div`
  padding-bottom: 2rem;
  ${theme.hideScroll};
`;
const ItemContainer = styled.div`
  width: 100%;

  div {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .category {
      padding-bottom: 17px;
      display: inline-block;
      width: 100%;
      height: 67px;
      border-bottom: 2px solid #262626;
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 20px;
      align-self: center;
      @media all and (min-width: ${theme.pc}px) {
        display: inline-block;
        width: 100%;
        height: auto;
        padding-bottom: 5px;
        font-size: 20px;
      }
    }
  }
`;

const BtnBox = styled.div`
  width: 100%;
  padding: 22px 15px;
  margin: 0 auto;
  cursor: pointer;
  @media all and (min-width: ${theme.pc}px) {
    width: 345px;
    padding: 22px 0;
    margin: 0 auto;
  }
`;
const ReplaceQnaBtn = styled.div`
  width: 100%;
  height: 50px;
  border: 1px solid #dfdfdf;
  color: #262626;
  font-size: 16px;
  ${props => props.theme.flexCenter};
`;
