import { CartDto } from '@modules/mypage/quotation/QuotationInterface';

export const validateMetadata = (selectedCart: CartDto[]): string | null => {
  let haveMetadata = false;
  const productWithNoMetadata: string[] = [];

  selectedCart.forEach(sc => {
    if (sc.metadata.length) {
      haveMetadata = true;
    }
  });

  if (haveMetadata) {
    selectedCart.forEach(sc => {
      let notHavMetadata = false;
      sc.metadata.forEach(meta => {
        if (!meta.metadata.value && !meta.metadata.selected_answer_value) {
          notHavMetadata = true;
        }
      });
      if (notHavMetadata) {
        productWithNoMetadata.push(sc.product.name);
      }
    });
    if (productWithNoMetadata.length) {
      return productWithNoMetadata.join();
    }
  }

  return null;
};
