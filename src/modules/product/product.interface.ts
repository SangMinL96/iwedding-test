export enum ProductCategoryValue {
  PACKAGE = '패키지', // 패키지
  STUDIO = '사진', //스튜디오
  DRESS = '드레스', // 드레스
  MAKEUP = '헤어/메이크업', //헤어/메이크업
  ROBES = '예복', //예복
  GIFT = '예물', //예물
  KOR_DRESS = '한복', //한복
  VIDEO_ALBUM = '영상앨범', // 영상앨범
  HONEYMOON = '신혼여행', //신혼여행
  BOUQUET = '부케/꽃장식', //부케/꽃장식
  PYEBACK_FOOD = '폐백음식', //폐백음식
  MUSIC = '축하연주', //축하연주
  CAR = '웨딩카', // 웨딩카
  YEDAN = '예단', //예단
  RETURN_ITEM = '답례품', //답례품
  MC = '사회자', //사회자
  SHOES = '웨딩슈즈',
  ETC = '기타', //기타
  HALL = '웨딩홀',
}

export const getProductCategoryName = (category: ProductCategoryValue) => {
  switch (category) {
    case ProductCategoryValue.PACKAGE:
      return '패키지';
    case ProductCategoryValue.STUDIO:
      return '스튜디오';
    case ProductCategoryValue.DRESS:
      return '드레스';
    case ProductCategoryValue.MAKEUP:
      return '헤어/메이크업';
    case ProductCategoryValue.ROBES:
      return '예복';
    case ProductCategoryValue.GIFT:
      return '예물';
    case ProductCategoryValue.KOR_DRESS:
      return '한복';
    case ProductCategoryValue.VIDEO_ALBUM:
      return '영상앨범';
    case ProductCategoryValue.HONEYMOON:
      return '신혼여행';
    case ProductCategoryValue.BOUQUET:
      return '부케';
    case ProductCategoryValue.PYEBACK_FOOD:
      return '폐백음식';
    case ProductCategoryValue.MUSIC:
      return '축하연주';
    case ProductCategoryValue.CAR:
      return '웨딩카';
    case ProductCategoryValue.YEDAN:
      return '예단';
    case ProductCategoryValue.RETURN_ITEM:
      return '답례품';
    case ProductCategoryValue.MC:
      return '사회자';
    case ProductCategoryValue.SHOES:
      return '웨딩슈즈';
    case ProductCategoryValue.ETC:
      return '기타';
    case ProductCategoryValue.HALL:
      return '웨딩홀';
  }
};
export interface WmProductEntity {
  no: number;
  enterprise: WmEnterpriseEntity;
  enterprise_code: string;
  ent_name: string;
  tags: WmProductTagEntity[];

  category: string;
  main_category: number;
  sub_category: string;
  name: string;
  product_code: string;
  thumb: string;

  pic_no: number;
  pic_no_txt: string;

  product_form1: string;
  product_form2: string;
  product_form3: string;
  product_form4: string;

  option1: string;
  option1_etc1: string;
  option1_etc2: string;
  option1_etc3: string;
  option1_etc4: string;

  option1_sdate: Date;
  option1_edate: Date;
  option1_date_type: number;

  sdm_date_type: number;
  sdm_sdate: Date;
  sdm_edate: Date;

  cmt: string;
  cmt2: string;
  cmt3: string;

  info: string;
  detail: string;

  price_txt: string;
  product_price: number;
  cPrice: number;
  price: number;
  event_price: number;

  app_type1: number;
  app_type2: number;
  app_type3: number;

  index_order: number;
  del_ok: number;

  tmp_save: number;
  like_cnt: number;
  view_cnt: number;
  cate_option: number;

  limited_sales: boolean;
  limited_sales_cnt: number;
}

export interface WmProductOptionEntity {
  no: number;
  enterprise: WmEnterpriseEntity;
  main_product: WmProductEntity;
  main_product_no: number;
  sub_product: WmProductEntity;
  sub_product_no: number;
}

export interface WmEnterpriseEntity {
  no: number;
  enterprise_code: string;
  enterprise_name: string;
  enterprise_name2: string;

  represent: string;
  jumin: string;
  enterprise_num: string;
  enterprise_num2: string;

  addr: string;
  email: string;
  phone: string;
  fax: string;

  counseler: string;
  hp: string;
  etc: string;
  off_day: string;
  contract_day: string;

  price_way1: string;
  price_way2: string;
  price_way_cnt: string;

  pic: string;
  map_comment: string;
  link: string;
  fix_hidden: string;

  homepage: string;
  community1: string;
  community2: string;
  holiday: string;

  ent_hour_from: Date;
  ent_hour_to: Date;
  ent_hour_etc: string;
  opening: string;
  entid: string;
  entpasswd: string;

  category_main: number;
  category: string;
  branch: string;
  tax: string;

  ent_type: string;
  ent_item: string;
  item: string;
  del_check: number;
  mini_time: string;
  logo: string;

  introduction: string;
  file1: string;
  file2: string;
  file3: string;
  file4: string;
  file5: string;
  file6: string;
  file7: string;
  file8: string;
  file9: string;
  file10: string;

  commission: string;
  use_check: string;
  coll_v: string;
  coll_p: string;
  coll_n: string;

  check_humax: string;
  check_3m: string;
  average: string;
  picupload: string;
  ceo_hp: string;

  mini_map: string;
  mini_map_cmt: string;
  free_sell: number;
  ent_special: string;
  product_special: string;
  chk_map: string;
  chK_journalize: string;

  ent_style: string;
  ent_focus: string;
  ent_price: string;
  no_guide: string;
  time_created: Date;
  time_modified: Date;

  studio_option: number;
  grade: number;
  product_logo: string;
  view_cnt: number;
  bpchk: number;
  sellchk: number;
  bus_url: string;
  latlng: string;
  premium: number;
  naver_map_exception_chk: number;
  holiday2: string;
}

export interface WmProductTagEntity {
  no: number;
  product: WmProductEntity;
  product_no: number;
  tag_type: number;
  tag: string;
  tag_regdate: Date;
}
