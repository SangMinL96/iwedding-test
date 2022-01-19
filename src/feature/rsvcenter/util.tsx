import React from 'react';

export const hanbokList = {
  content2_1: [
    {
      name: (
        <div>
          실속있게 준비할래요<p>평균 50~60만원</p>
        </div>
      ),
      value: '1',
    },
    {
      name: (
        <div id='type1_budget'>
          대중적으로 준비할래요<p>평균 60~80만원</p>
        </div>
      ),
      value: '2',
      bedge: true,
    },
    {
      name: (
        <div>
          고급스럽게 준비할래요<p>평균 80만원 이상</p>
        </div>
      ),
      value: '3',
    },
  ],
  content2_2: [
    {
      name: (
        <div id='type2_budget'>
          실속있게 준비할래요<p>평균 15~20만원</p>
        </div>
      ),
      value: '1',
    },
    {
      name: (
        <div>
          대중적으로 준비할래요<p>평균 20~35만원</p>
        </div>
      ),
      value: '2',
      bedge: true,
    },
    {
      name: (
        <div>
          고급스럽게 준비할래요<p>평균 35만원 이상</p>
        </div>
      ),
      value: '3',
    },
  ],
  content3: [
    {
      name: '행사 일정이 있어요.',
      value: '1',
      checkList: [
        { name: '예식', value: '1' },
        { name: '촬영', value: '2' },
        { name: '가족행사', value: '3' },
        { name: '기타', value: '4' },
      ],
    },
    {
      name: '아직 정해지지 않았어요.',
      value: '0',
    },
  ],
  content4_1: [
    {
      name: '전통적 녹의홍상 새색시 st',
      value: '1',
    },
    {
      name: '파스텔톤의 화사한 퓨전사극 st',
      value: '2',
    },
    {
      name: '나만의 유니크함, 패션화보 st',
      value: '3',
    },
  ],

  content4_2: [
    {
      name: '전문가 추천을 믿고 딱 1곳만 방문하고 싶어요.',
      value: '1',
    },
    {
      name: '몇 군데 비교 상담 후 결정하고 싶어요.',
      value: '2',
    },
  ],
  content4_3: [
    {
      name: (
        <div>
          네 피팅을 꼭 해보고 싶어요.<p>(피팅비가 청구될 수 있음)</p>
        </div>
      ),
      value: '1',
    },
    {
      name: '아니요, 눈으로 보고 결정할래요.',
      value: '2',
    },
  ],
  content4_4: [
    {
      name: '상담을 꼼꼼하게 해주는 샵',
      value: '1',
    },
    {
      name: '원단/디자인 종류가 다양한 샵',
      value: '2',
    },
    {
      name: '이벤트 진행중인 샵',
      value: '3',
    },
    {
      name: '인지도 높은 샵',
      value: '4',
    },
    {
      name: '가성비가 좋은 금액대의 샵',
      value: '5',
    },
    {
      name: '한복 퀄리티가 좋은 샵',
      value: '6',
    },
  ],
  content5: [
    {
      name: (
        <div style={{ fontWeight: 'bold' }}>
          아니오, 아직 정해지지 않았어요.
          <p style={{ fontWeight: 'normal', marginTop: '0.5em' }}>
            고객님의 문의 내역을 확인하여
            <br />
            적합한 업체를 추천해드릴게요.
          </p>
        </div>
      ),
      value: '0',
    },
    {
      name: (
        <div style={{ fontWeight: 'bold' }}>
          네, 생각해둔 한복샵이 있어요.
          <p style={{ fontWeight: 'normal', marginTop: '0.5em' }}>
            방문을 원하는 한복샵을 검색하여
            <br />
            선택해주세요.
          </p>
        </div>
      ),
      value: '1',
    },
  ],
  content6: [
    {
      name: (
        <div style={{ cursor: 'default', color: '#4866E4', fontWeight: 'bold' }}>
          꼭 읽어주세요!
          <p style={{ fontWeight: 'normal', fontSize: '14px', marginTop: '13px', color: '#8C8C8C' }}>
            한 업체당 상담 소요 시간은 30분(대여)~ 1시간(맞춤)이며,
            <br />
            동선과 이동시간을 고려하여 스케줄을 예약해드립니다.
          </p>
        </div>
      ),
      value: '0',
    },
    {
      name: (
        <div style={{ fontWeight: 'bold' }}>
          아직 정해지지 않았어요.
          <p style={{ fontWeight: 'normal', fontSize: '14px', marginTop: '13px' }}>
            예약이 가능한 가장 빠른 주말로 예약해드리며,
            <br />
            문의 답변 링크에서 취소/변경이 가능합니다.
          </p>
        </div>
      ),
      value: '1',
    },
  ],
};

export const robesList = {
  content2_1: [
    {
      name: (
        <div>
          실속있게 준비할래요<p>평균 80~100만원</p>
        </div>
      ),
      value: '1',
    },
    {
      name: (
        <div id='type1_budget'>
          대중적으로 준비할래요<p>평균 100~150만원</p>
        </div>
      ),
      value: '2',
      bedge: true,
    },
    {
      name: (
        <div>
          고급스럽게 준비할래요<p>평균 150만원이상</p>
        </div>
      ),
      value: '3',
    },
  ],
  content2_2: [
    {
      name: (
        <div>
          실속있게 준비할래요<p>평균 15~20만원</p>
        </div>
      ),
      value: '1',
    },
    {
      name: (
        <div id='type2_budget'>
          대중적으로 준비할래요<p>평균 20~35만원</p>
        </div>
      ),
      value: '2',
      bedge: true,
    },
    {
      name: (
        <div>
          고급스럽게 준비할래요<p>평균 35만원이상</p>
        </div>
      ),
      value: '3',
    },
  ],
  content3: [
    {
      name: '행사 일정이 있어요.',
      value: '1',
      checkList: [
        { name: '예식', value: '1' },
        { name: '촬영', value: '2' },
        { name: '가족행사', value: '3' },
        { name: '기타', value: '4' },
      ],
    },
    {
      name: '아직 정해지지 않았어요.',
      value: '0',
    },
  ],
  content4_1: [
    {
      name: '전통적 녹의홍상 새색시 st',
      value: '1',
    },
    {
      name: '파스텔톤의 화사한 퓨전사극 st',
      value: '2',
    },
    {
      name: '나만의 유니크함, 패션화보 st',
      value: '3',
    },
  ],

  content4_2: [
    {
      name: '전문가 추천을 믿고 딱 1곳만 방문하고 싶어요.',
      value: '1',
    },
    {
      name: '몇 군데 비교 상담 후 결정하고 싶어요.',
      value: '2',
    },
  ],
  content4_3: [
    {
      name: (
        <div>
          네 피팅을 꼭 해보고 싶어요.<p>(피팅비가 청구될 수 있음)</p>
        </div>
      ),
      value: '1',
    },
    {
      name: '아니요, 눈으로 보고 결정할래요.',
      value: '2',
    },
  ],
  content4_4: [
    {
      name: '상담을 꼼꼼하게 해주는 샵',
      value: '1',
    },
    {
      name: '원단/디자인 종류가 다양한 샵',
      value: '2',
    },
    {
      name: '이벤트 진행중인 샵',
      value: '3',
    },
    {
      name: '인지도 높은 샵',
      value: '4',
    },
    {
      name: '가성비가 좋은 금액대의 샵',
      value: '5',
    },
    {
      name: '예복 퀄리티가 좋은 샵',
      value: '6',
    },
  ],
  content5: [
    {
      name: (
        <div style={{ fontWeight: 'bold' }}>
          아니오, 아직 정해지지 않았어요.
          <p style={{ fontWeight: 'normal', marginTop: '0.5em' }}>
            고객님의 문의 내역을 확인하여
            <br />
            적합한 업체를 추천해드릴게요.
          </p>
        </div>
      ),
      value: '0',
    },
    {
      name: (
        <div style={{ fontWeight: 'bold' }}>
          네, 생각해둔 예복샵이 있어요.
          <p style={{ fontWeight: 'normal', marginTop: '0.5em' }}>
            방문을 원하는 예복샵을 검색하여
            <br />
            선택해주세요.
          </p>
        </div>
      ),
      value: '1',
    },
  ],
  content6: [
    {
      name: (
        <div style={{ cursor: 'default', color: '#4866E4', fontWeight: 'bold' }}>
          꼭 읽어주세요!
          <p style={{ fontWeight: 'normal', fontSize: '14px', marginTop: '13px', color: '#8C8C8C' }}>
            한 업체당 상담 소요 시간은 30분(대여)~ 1시간(맞춤)이며,
            <br />
            동선과 이동시간을 고려하여 스케줄을 예약해드립니다.
          </p>
        </div>
      ),
      value: '0',
    },
    {
      name: (
        <div style={{ fontWeight: 'bold' }}>
          아직 정해지지 않았어요.
          <p style={{ fontWeight: 'normal', fontSize: '14px', marginTop: '13px' }}>
            예약이 가능한 가장 빠른 주말로 예약해드리며,
            <br />
            문의 답변 링크에서 취소/변경이 가능합니다.
          </p>
        </div>
      ),
      value: '1',
    },
  ],
};
export const giftList = {
  content2: [
    {
      name: (
        <div>
          실속있게 준비할래요<p>평균 200만원 미만</p>
        </div>
      ),
      value: '1',
    },
    {
      name: (
        <div id='type1_budget'>
          대중적으로 준비할래요<p>평균 200만원~500만원</p>
        </div>
      ),
      value: '2',
      bedge: true,
    },
    {
      name: (
        <div>
          아낌없이 준비할래요<p>평균 500만원~1000만원</p>
        </div>
      ),
      value: '3',
    },
    {
      name: (
        <div>
          고급스럽게 준비할래요<p>평균 1000만원 이상</p>
        </div>
      ),
      value: '4',
    },
  ],

  content3: [
    {
      name: '행사 일정이 있어요.',
      value: '1',
      checkList: [
        { name: '예식', value: '1' },
        { name: '촬영', value: '2' },
        { name: '가족행사', value: '3' },
        { name: '기타', value: '4' },
      ],
    },
    {
      name: '아직 정해지지 않았어요.',
      value: '0',
    },
  ],
  content4_1: [
    {
      name: '군더더기 없고 깔끔한',
      value: '1',
    },
    {
      name: '심플하면서 포인트 있는',
      value: '2',
    },
    {
      name: '화려하고 반짝거리는',
      value: '3',
    },
    {
      name: '유니크하고 레어한',
      value: '4',
    },
  ],

  content4_2: [
    {
      name: '전문가 추천을 믿고 딱 1곳만 방문하고 싶어요.',
      value: '1',
    },
    {
      name: '몇 군데 비교 상담 후 결정하고 싶어요.',
      value: '2',
    },
  ],
  content4_3: [
    {
      name: '상담을 꼼꼼하게 해주는 샵',
      value: '1',
    },
    {
      name: '예물/디자인 종류가 다양한 샵',
      value: '2',
    },
    {
      name: '이벤트 진행중인 샵',
      value: '3',
    },
    {
      name: '인지도 높은 샵',
      value: '4',
    },
    {
      name: '가성비가 좋은 금액대의 샵',
      value: '5',
    },
    {
      name: '예물 퀄리티가 좋은 샵',
      value: '6',
    },
  ],

  content5: [
    {
      name: (
        <div style={{ fontWeight: 'bold' }}>
          아니오, 아직 정해지지 않았어요.
          <p style={{ fontWeight: 'normal', marginTop: '0.5em' }}>
            고객님의 문의 내역을 확인하여
            <br />
            적합한 업체를 추천해드릴게요.
          </p>
        </div>
      ),
      value: '0',
    },
    {
      name: (
        <div style={{ fontWeight: 'bold' }}>
          네, 생각해둔 예물샵이 있어요.
          <p style={{ fontWeight: 'normal', marginTop: '0.5em' }}>
            방문을 원하는 예물샵을 검색하여
            <br />
            선택해주세요.
          </p>
        </div>
      ),
      value: '1',
    },
  ],
  content6: [
    {
      name: (
        <div style={{ cursor: 'default', color: '#4866E4', fontWeight: 'bold' }}>
          꼭 읽어주세요!
          <p style={{ fontWeight: 'normal', fontSize: '14px', marginTop: '13px', color: '#8C8C8C' }}>
            한 업체당 상담 소요 시간은 1시간 내외이며,
            <br />
            동선과 이동시간을 고려하여 스케줄을 예약해드립니다.
          </p>
        </div>
      ),
      value: '0',
    },
    {
      name: (
        <div style={{ fontWeight: 'bold' }}>
          아직 정해지지 않았어요.
          <p style={{ fontWeight: 'normal', fontSize: '14px', marginTop: '13px' }}>
            예약이 가능한 가장 빠른 주말로 예약해드리며,
            <br />
            문의 답변 링크에서 취소/변경이 가능합니다.
          </p>
        </div>
      ),
      value: '1',
    },
  ],
};
export const hallList = {
  content5: [
    {
      name: '동시 예식 (식사와 예식을 같은 장소에서 진행)',
      value: '0',
    },
    {
      name: '분리 예식 (식사와 예식을 다른 장소에서 진행)',
      value: '1',
    },
    {
      name: '상관 없음',
      value: '2',
    },
  ],
};

//스크롤 ref... 빨간줄은...
export const onValidateScroll = validate => {
  //타입 에러때매 돔 선택자 미리 선언
  const easy_book_which_product = document?.getElementById('easy_book_which_product') as HTMLElement;
  const easy_book_who = document?.getElementById('easy_book_who') as HTMLElement;
  const type1_budget = document?.getElementById('type1_budget') as HTMLElement;
  const type2_budget = document?.getElementById('type2_budget') as HTMLElement;
  const when_check = document?.getElementById('when_check') as HTMLElement;
  const which_style = document?.getElementById('which_style') as HTMLElement;
  const cnt = document?.getElementById('cnt') as HTMLElement;
  const fitting = document?.getElementById('fitting') as HTMLElement;
  const easy_book_which_ent_type = document?.getElementById('easy_book_which_ent_type') as HTMLElement;
  const type3 = document?.getElementById('type3') as HTMLElement;
  const visit_when = document?.getElementById('visit_when') as HTMLElement;

  //스크롤탑
  if (!validate['easy_book_which_product']) return easy_book_which_product.scrollIntoView({ block: 'center' });
  if (!validate['easy_book_who']) return easy_book_who.scrollIntoView({ block: 'center' });
  //========== 얘네들은 현재 파일 util.tsx 에 리스트에 있는 html요소에 아이디를 넣엇습니다잇 =============//
  if (!validate['easy_book.type1_budget']) return type1_budget.scrollIntoView({ block: 'center' });
  if (!validate['easy_book.type2_budget']) return type2_budget.scrollIntoView({ block: 'center' });
  //=================================================================================//
  if (!validate['easy_book.when_check']) return when_check.scrollIntoView({ block: 'center' });
  if (!validate['easy_book.which_style']) return which_style.scrollIntoView({ block: 'center' });
  if (!validate['easy_book.cnt']) return cnt.scrollIntoView({ block: 'center' });
  if (!validate['easy_book.fitting']) return fitting.scrollIntoView({ block: 'center' });
  if (!validate['easy_book_which_ent_type']) return easy_book_which_ent_type.scrollIntoView({ block: 'center' });
  if (!validate['easy_book.type3']) return type3.scrollIntoView({ block: 'center' });
  if (!validate['easy_book.visit_when_yet']) return visit_when.scrollIntoView({ block: 'center' });
};
