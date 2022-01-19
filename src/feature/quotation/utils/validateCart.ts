import { CartDto } from '@modules/mypage/quotation/QuotationInterface';

export const validateCart = (selectedCart: CartDto[]): boolean => {
  let haveMetadata = false;
  const productWithNoMetadata: string[] = [];

  selectedCart.forEach(sc => {
    if (sc.metadata.length) {
      haveMetadata = true;
    }
  });

  if (haveMetadata) {
    selectedCart.forEach(sc => {
      let noMetadata = false;
      sc.metadata.forEach(meta => {
        if (!meta.metadata.value && !meta.metadata.selected_answer_value) {
          noMetadata = true;
        }
      });
      if (noMetadata) {
        productWithNoMetadata.push(sc.product.name);
      }
    });

    let invalidProducts = '';
    if (productWithNoMetadata.length) {
      invalidProducts = productWithNoMetadata.join();
    }
    if (invalidProducts) {
      alert(invalidProducts + ' 상품의 추가 정보를 입력해주세요');
      return false;
    }
  }

  return true;
};
