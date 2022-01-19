import Head from 'next/head';
import React from 'react';

const SiteTitle = ({ title }: { title: string }) => {
  return (
    <Head>
      <title>아이웨딩 | {title}</title>
    </Head>
  );
};

export default SiteTitle;
