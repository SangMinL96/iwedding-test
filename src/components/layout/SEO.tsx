import React from 'react';
import Head from 'next/head';

const SEO = () => {
  return (
    <Head>
      <meta charSet='UTF-8' />
      <base href='/' />
      <meta
        name='viewport'
        content='viewport-fit=cover, width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, target-densitydpi=medium-dpi'
      />
      <meta httpEquiv='content-language' content='ko' />
      <meta name='format-detection' content='telephone=no' />
      <meta name='subject' content='아이웨딩' />
      <meta name='author' content='결혼 준비도 쇼핑처럼 쉽고 간편하게! 아이웨딩' />

      <meta
        name='description'
        content={
          '쇼핑보다 쉬운 결혼준비 : 웨딩 상품 간편구매, 예신후기 가득, 매일 업데이트 되 웨딩 콘텐츠. 결혼 준비가 쉬워지는 방법, 아이웨딩!'
        }
      />
      <meta property='og:site_name' content={'아이웨딩'} />
      <meta property='og:title' content={'아이웨딩'} />
      <meta
        property='og:description'
        content='쇼핑보다 쉬운 결혼 준비: 웨딩 상품 간편구매, 예신후기 가득, 매일 업데이트되는 웨딩 콘텐츠. 결혼 준비가 쉬워지는 방법, 아이웨딩!'
        id='og_desc'
      />
      <meta
        property='og:image'
        content='http://www.iwedding.co.kr/center/website/ibrandplus_seo_image/2019/03/img_1553505409_95793900.jpg'
      />
      <meta property='og:type' content='website' />
      <meta
        name='keywords'
        content='아이웨딩, 결혼준비, 결혼, 웨딩, 예신, 예랑, 드레스, 스튜디오, 웨딩홀, 메이크업, 헤어메이크업, 웨딩촬영, 리허설촬영, 스냅, 예식스냅, 허니문, 신혼여행, 결혼준비체크리스트, 결혼준비과정, 결혼준비순서, 결혼준비비용, 결혼준비카페, 결혼준비기간'
      />
      <title>아이웨딩</title>
    </Head>
  );
};

export default SEO;
