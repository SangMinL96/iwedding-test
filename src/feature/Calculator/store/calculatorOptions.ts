import { WmProductEntity, ProductCategoryValue } from '@modules/product/product.interface';
export interface CalculatorItem {
  category: ProductCategoryValue;
  item: WmProductEntity | undefined;
}

/**
 * 현재는 스드메 계산기이지만,
 * 추후에 (폐백, 부케, 음악)
 *      (남성예복, 여성예복, 한복)
 * 등이 추가될 수 있다하여 범용적으로 쓸 수 있게 만듦
 */
export const SDMOptions: CalculatorItem[] = [
  { category: ProductCategoryValue.STUDIO, item: undefined },
  { category: ProductCategoryValue.DRESS, item: undefined },
  { category: ProductCategoryValue.MAKEUP, item: undefined },
];
export const PBMOptions: CalculatorItem[] = [
  { category: ProductCategoryValue.PYEBACK_FOOD, item: undefined },
  { category: ProductCategoryValue.BOUQUET, item: undefined },
  { category: ProductCategoryValue.MUSIC, item: undefined },
];
export const HAIROptions: CalculatorItem[] = [
  { category: ProductCategoryValue.MAKEUP, item: undefined },
  { category: ProductCategoryValue.MAKEUP, item: undefined },
  { category: ProductCategoryValue.MAKEUP, item: undefined },
];
