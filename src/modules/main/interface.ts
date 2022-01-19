export interface MainDataType {
  idx: string;
  type: string;
  title: string;
  sub_title: string;
  more_btn_view_flag: number;
  more_btn_url_target: string;
  more_btn_pc_url: string;
  more_btn_mobile_url: string;
  more_btn_app_type: string;
  more_btn_app_card_num: string;
  more_btn_app_url: string;
  hashtag_flag: number;
  add_info_flag: number;
  order_badge_flag: number;
  item_list: any;
  slide_or_bottom: number;
  thumbnail_ratio: number;
  coming_soon_type: number;
  type11_logo?: number;
  view_device: number;
  img_below_expose?: string;
}

export interface MainTemplateType {
  templateData: TemplateDataType;
  result: boolean;
}

export interface TemplateDataType {
  no: string;
  prd_cate_name: string;
  icon: string;
  create_time: string;
  update_time: string;
  show: string;
  sort: string;
  url: string;
  main_use: string;
  always: string;
  end_date: string;
}
