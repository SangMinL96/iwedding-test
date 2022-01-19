import Head from 'next/head';
import React from 'react';

const EventPageSEO = ({ title, icon }: { title: string; icon: string }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta property='og:description' content='This is a description.' />
      <meta property='og:image' content={`https://iwedding.co.kr${icon}`} />
      <meta property='og:image:width' content='1200' />
      <meta property='og:image:height' content='627' />
    </Head>
  );
};

export default EventPageSEO;
