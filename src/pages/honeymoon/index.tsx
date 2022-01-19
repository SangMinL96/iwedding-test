import React from 'react';
import dynamic from 'next/dynamic';

const HoneymoonIndex = dynamic(() => import('@feature/honeymoon/HoneymoonIndex'));

function HoneymoonPage() {
  return <HoneymoonIndex />;
}

export default HoneymoonPage;
