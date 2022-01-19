import { useQnAParams } from '@feature/QnA/hooks/useQnAParams';
import { Desktop } from '@hooks/useDevice';
import { useModalVisible } from '@hooks/useModalVisible';
import { MainDataType } from '@modules/main/interface';
import { QnACategory } from '@modules/mypage/QnA/QnAInterface';
import { openChat } from '@modules/mypage/quotation/QuotationAPI';
import { QNA_FORM_MODAL } from '@utils/modalKeys';
import { getDate, openNewTab } from '@utils/util';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

const QnAFormModal = dynamic(() => import('@feature/QnA/QnAFormModal'));

type PropsType = {
  data: MainDataType;
  tmpAllData: any;
};

const MainTypeButton = ({ data: { item_list }, tmpAllData }: PropsType) => {
  const isDeskTop = Desktop();
  const { modalVisible: formModalVisible } = useModalVisible(QNA_FORM_MODAL);
  const now = getDate();
  const router = useRouter();
  const { setModalVisible } = useModalVisible(QNA_FORM_MODAL);
  const { setParams } = useQnAParams();
  const onClick = (item: any) => {
    if (item.btn_type === '1') {
      // 랜딩 링크
      if (isDeskTop) {
        if (item.link_type === '1') {
          // url 새창 열기
          openNewTab(item.pc_link);
        } else {
          // url 현재창 열기
          location.href = `${item.pc_link}`;
        }
      } else {
        // url 현재창 열기
        location.href = `${item.mobile_link}`;
      }
    } else if (item.btn_type === '2') {
      openChat(location?.href, false, item.btn_touch_talk_no);
    } else if (item.btn_type === '3') {
      router.push(router.asPath + '#QnAModal');
      // 템플릿 타이틀(tmpAllData.prd_cate_name) 이 문의하기 모달 타이틀이 될 수 있어야함..
      // 속성(브랜드 이벤트 콘텐츠 상품) : (item.btn_property or tmpAllData.category)
      // 업종(드레스,사진 등) : (tmpAllData.category)
      // 상품군(드레스면 드레스 안에 맞춤 대여 뭐 이런거) (tmpAllData.product_type)
      // 업체 (tmpAllData.enterprise)
      // 브랜드 넘버는 어디에서?
      setParams({
        // 업종
        main_category: QnACategory.find(({ id }) => id == item.btn_property).title,
        product_no: String(tmpAllData.product_type),
        enterprise_code: String(tmpAllData.enterprise),
        // brandplus_no: '',
      });
      setModalVisible(true);
    }
  };

  return (
    <>
      <Container>
        {item_list.button.map((item: any) => {
          if (item.end_date !== '0000-00-00' && item.end_date < now && item.always !== '1') {
            return null;
          } else {
            return (
              <a
                className={item_list.button.length > 1 ? 'template_button' : 'template_button one'}
                onClick={() => onClick(item)}
                key={item.btn_name}
              >
                {item.btn_name}
              </a>
            );
          }
        })}
      </Container>
      {formModalVisible && <QnAFormModal visible={formModalVisible} />}
    </>
  );
};

export default MainTypeButton;

const Container = styled.div`
  position: relative;
  overflow: hidden;
  width: 1280px;
  min-width: 1280px;
  margin: 0 auto 80px auto;
  display: flex;
  justify-content: center;
  @media all and (max-width: 1000px) {
    width: 100%;
    min-width: auto;
    margin: 0 auto 50px auto;
    flex-direction: column;
  }
  > a {
    display: inline-block;
    width: 635px;
    height: 100px;
    color: #fff;
    font-size: 26px;
    font-weight: 500;
    background-color: #262626;
    text-align: center;
    line-height: 100px;
    vertical-align: middle;
    cursor: pointer;
    @media all and (max-width: 1280px) {
      width: 100%;
      height: 80px;
      font-size: 18px;
      line-height: 80px;
    }
    &:nth-child(2) {
      background-color: #ff6e77;
    }
  }
  .template_button.one {
    background-color: #ff6e77;
  }
`;
