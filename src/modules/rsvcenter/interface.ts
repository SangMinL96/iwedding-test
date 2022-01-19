export interface HanbokShopItf {
  enterprise_code: string;
  enterprise_name: string;
}

export interface InquiryItf {
  comment: string;
  comment_check: string;
  easy_book_no: string;
  enterprise_code: string;
  enterprise_name: string;
  index_order: string;
  thumbnail: string;
  no: string;
  schedule_date: string;
  category: string;
}

export class WhichEnt {
  easy_book_no: string;
  enterprise_code: string;
  enterprise_name: string;
  no: string;
  product_no: string;
}

export class WhichEntType {
  easy_book_no: string;
  no: string;
  type: string;
  type_string: string;
}
export class bookWho {
  cnt: string;
  easy_book_no: string;
  easy_book_who_type: { type: string }[];
  easy_book_who_type_string: string;
  easy_book_who_type_string2: string;
  no: string;
  who: string;
  who_string: string;
}
export class easyBookType {
  category?: any;
  cnt?: string;
  complete?: string;
  complete_time?: string;
  easy_book_who?: bookWho[];
  easy_book_which_ent?: WhichEnt[];
  easy_book_which_ent_type?: WhichEntType[];
  fitting?: string;
  guide?: string;
  product_string?: string;
  type1_budget_string?: string[];
  type2_budget_string?: string[];
  handled_id?: string;
  hide?: string;
  info?: string;
  memo?: string;
  name?: string;
  no?: string;
  phone?: string;
  registe_time?: string;
  type?: string;
  type1_budget?: string;
  type2_budget?: string;
  type3?: string;
  type_string?: string;
  visit_when?: string;
  visit_when_yet?: string;
  visit_when_yet_string?: string;
  visit_yoil?: string;
  web_id?: string;
  when_check?: string;
  when_date?: string;
  when_type?: string;
  which_style?: string;
  with_id?: string;
}
export class responseType {
  category: string;
  comment: string;
  comment_check: string;
  easy_book_no: string;
  enterprise_code: string;
  enterprise_name: string;
  icard_no: string;
  index_order: string;
  no: string;
  phone: string;
  schedule_date: string;
  thumbnail: string;
  visit_check: string;
}
export interface InquiryDetailItf {
  easy_book: { easy_book: easyBookType };
  response: responseType[];
}

export interface HallSearchItf {
  label: string;
  cnt: string;
  id: string;
  value: string;
}
export interface HallTypeItf {
  banquet_code: string;
  direct_check: string;
  drink_fee: string;
  drink_val: string;
  flower_val: string;
  food_val: string;
  food_val_text_arr: [];
  local: string;
  logid: string;
  max_direct_fee: string;
  max_flower_fee1: string;
  max_flower_fee2: string;
  max_flower_fee3: string;
  max_food_fee: string;
  max_person: string;
  max_use_fee: string;
  menu_opt1: string;
  menu_opt2: string;
  min_direct_fee: string;
  min_flower_fee1: string;
  min_flower_fee2: string;
  min_flower_fee3: string;
  min_food_fee: string;
  min_person: string;
  min_use_fee: string;
  name: string;
  need_fee1: string;
  need_fee2: string;
  need_fee3: string;
  need_fee4: string;
  need_other: string;
  need_val: string;
  seat_person: string;
  shape: string;
  shape_text: string;
  style: string;
  time_text: string;
  time_val: string;
  use_val: string;
  weddinghall_code: string;
  week_val: string;
}
