type CloseRequestFunc = () => void;

interface Window {
  wedding_talk_close?: CloseRequestFunc;
  KCP_Pay_Execute: (form: any) => void;
  KCP_Pay_Execute_Web: (form: any) => void;
  daum: any;
  kakao: any;
  Kakao: any;
  webkit: any;
  iWeddingApp: any;
}
