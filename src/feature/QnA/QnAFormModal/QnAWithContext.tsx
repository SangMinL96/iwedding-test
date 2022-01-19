import dynamic from 'next/dynamic';
import React from 'react';
import { QnAFormProvider } from '../utils/context';
const QnAForm = dynamic(() => import('./QnAForm'));
const QnAReplaceForm = dynamic(() => import('./QnAReplaceForm'));
/**
 * !Deprecated
 */
const QnAWithContext = ({ handleClose, replaceQnA = false }: any) => {
  return <QnAFormProvider>{replaceQnA ? <QnAReplaceForm /> : <QnAForm handleClose={handleClose} />}</QnAFormProvider>;
};

export default QnAWithContext;
