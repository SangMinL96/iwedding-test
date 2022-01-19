import { useDeepEffect } from '@hooks/useDeepEffect';
import { IdTitle, ImageProps, QnACategory } from '@modules/mypage/QnA/QnAInterface';
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { useSelectedQnA } from '../hooks/useSelectedQnA';

/**
 * !Deprecated
 */
export const useQnAFormState = () => {
  const [category, setCategory] = useState<IdTitle>(QnACategory[0]); // 기타/브랜드/컨텐츠/이벤트/상품
  const [mainCategory, setMainCategory] = useState('패키지'); // 기타 문의하기 -> 업종
  const [formTitle, setFromTitle] = useState<string>(); // 기타 문의하기 -> 업종
  const [brand, setBrand] = useState<string>();
  const [enterprise, setEnter] = useState<string>();
  const [product, setProduct] = useState<number>(); // etc)업체명/상품명/브랜드명 등
  const [talkType, setTalkType] = useState<IdTitle>();
  const [title, setTitle] = useState('');
  const [request, setRequest] = useState('');
  const [images, setImages] = useState<ImageProps[]>([]);
  const [isFormValid, setFormValid] = useState(false);

  useEffect(() => {
    setFormValid((!!mainCategory || brand || enterprise || product) && talkType != undefined && title.length > 0 && request.length > 0);
  }, [mainCategory, talkType, title, request, brand, enterprise, product]);

  const addImage = (image: ImageProps) => setImages([...images, image]);
  const removeImage = (imageToRemove: ImageProps) => setImages(images.filter(({ image }) => image.name != imageToRemove.image.name));
  const resetForm = () => {
    setSelectedQnA(null);
    setCategory(QnACategory[0]);
    setMainCategory('패키지');
    setProduct(null);
    setTalkType(null);
    setTitle('');
    setRequest('');
    setImages([]);
    setDBImages([]);
    setDeletedDBImages([]);
  };

  /**
   * 문의하기 수정 페이지 용
   * DB에서 오는 이미지 파일들은 'string'이지만, 유저가 실시간으로 올리는 이미지는 'File',
   * 따라서 Edit Modal에서는, ImageSection에 DB에서 오는 이미지배열(dbImages) 뒤에 유저의 실시간 이미지(images)를 넣음.
   * 수정/삭제의 경우, PHP로 attach_image{i}_del을 보내줘야 하기 때문에,
   * 몇 번째 파일이 삭제되었는지 `deletedDBImages`로 추적.
   * 수정 완료시에는
   */
  const { selectedQnA, setSelectedQnA } = useSelectedQnA();
  const [dbImages, setDBImages] = useState<IdTitle[]>([]);
  const [deletedDBImages, setDeletedDBImages] = useState<number[]>([]);
  const removeDBImage = useCallback(
    (dbImageToRemove: IdTitle) => {
      setDBImages(dbImages.filter(dbi => dbi.id !== dbImageToRemove.id));
      setDeletedDBImages([...deletedDBImages, dbImageToRemove.id]);
    },
    [setDBImages, dbImages, setDeletedDBImages, deletedDBImages],
  );

  useDeepEffect(() => {
    if (selectedQnA) {
      setCategory(selectedQnA.contentsCategory);
      if (selectedQnA?.brand) setBrand(selectedQnA.brand);
      if (selectedQnA?.enterprise) setEnter(selectedQnA.enterprise);
      if (selectedQnA?.product) setProduct(selectedQnA.product);
      if (selectedQnA?.mainCategory) setMainCategory(selectedQnA.mainCategory);
      setTalkType(selectedQnA.talkType);
      setTitle(selectedQnA.title);
      setRequest(selectedQnA.request);
      setDBImages(selectedQnA.dbImages);
    }
  }, [selectedQnA]);

  return {
    isFormValid,
    category,
    mainCategory,
    brand,
    enterprise,
    formTitle,
    product,
    talkType,
    title,
    request,
    images,
    setCategory,
    setMainCategory,
    setFromTitle,
    setBrand,
    setEnter,
    setProduct,
    setTalkType,
    setTitle,
    setRequest,
    addImage,
    dbImages,
    deletedDBImages,
    removeImage,
    removeDBImage,
    resetForm,
  };
};

const QnAFormContext = createContext<ReturnType<typeof useQnAFormState>>(null);

export const useQnAFormContext = () => useContext(QnAFormContext)!;
export const QnAFormProvider = ({ children }: { children: ReactNode }) => (
  <QnAFormContext.Provider value={useQnAFormState()}>{children}</QnAFormContext.Provider>
);
