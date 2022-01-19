export const CALC_OPEN_LOG_TYPES = [755, 756, 757];
export const CALC_COMPLETE_LOG_TYPES = [752, 753, 754];
export interface CalcLogProps {
  log_type_no: number;
  log_category1: string;
  log_category2: string;
  log_description: string;
  log_text1: string; // 내용
  log_text2: string; // 업종
  log_int1?: string; // 상품군/견적서번호/etc
}
