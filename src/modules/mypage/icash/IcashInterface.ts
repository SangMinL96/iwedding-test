import { ICashMissionStatus } from '@feature/icash/participation_list/participation_list.index';

export class MissionCategory {
  no: string;
  name: string;
  introduction: string;
  sort: number;
  cashText1: string;
  cash1: number;
  duplicate1: number;
  cashText2: string;
  cash2: number;
  duplicate2: number;
  registeDate: Date;
  registerId: string;
  missions: IcashMission[];
}

export class IcashMission {
  no: string;
  category: MissionCategory;
  sort: number;
  name: string;
  cash: number;
  duplication: boolean;
  participationWay: string;
  regulation: string;
  toButtonName: string;
  detailUrlPc: string;
  detailUrlMobile: string;
  appCardNumber: string;
  appUrl: string;
  saveType: boolean | null;
  participantCnt: string;
  registeDate: Date;
  registerId: string;
  missionType: MissionType;
  appType: number;
  listOpen = false;
  isCompleted: boolean;
  open_type: boolean;
}

export enum MissionType {
  ADMIT = 1,
  DIRECT = 2,
}

export class IcashMissionInquire {
  no: number;
  question: string;
  answer: string;
  sort: number;
}

export class MissionType1 {
  icashMissionNo: string;
  type1: boolean;
  type2: boolean;
  type3: boolean;
  type4: boolean;
  type5: boolean;
  type6: boolean;
  type7: boolean;
  type8: boolean;
  type9: boolean;
  type10: boolean;
  type11: boolean;
  type12: boolean;
  type7MenuName: string;
  type8MenuName: string;
}

export class MissionType2 {
  icashMissionNo: string;
  pc: string;
  mobile: string;
  type2AppCardNumber: string;
  type2AppUrl: string;
  type2AppType: string;
}

export class IcashMissionPt {
  no: string;

  status: ICashMissionStatus;
  icashMissionNo: string;

  mission: IcashMission;

  participantName: string;

  participantPhone: string;

  introRcvName: string;

  introRcvPhone: string;

  introSdName: string;

  introSdPhone: string;

  storeId: string;

  deviceType: number;

  snsType: number;

  imgAddName: string;

  imgFileName: string;

  urlInputName: string;

  url: string;

  affiliateDoc: string;

  applicationDate: Date;

  approvalDate: Date;

  cash: number;

  isCompleted: boolean;

  category: string;
}

export class UserICash {
  no: string;

  userId: string;

  history: string;

  addCash: number;

  regDate: Date;

  withId: string;
}

export enum IcashUseStatus {
  SAVE,
  USE,
}

// 작성 후기 포함 업종 선택 타입 (category)
export enum IcashMissionType12Category {
  IWEDDING = '아이웨딩',
  WEDDINGHALL = '웨딩홀',
  STUDIO = '사진', //스튜디오
  DRESS = '드레스', // 드레스
  MAKEUP = '헤어/메이크업', //헤어/메이크업
  VIDEO_ALBUM = '영상앨범', // 영상앨범
  KOR_DRESS = '한복', //한복
  MAN_YEBOK = '예복', //예복
  WOMAN_YEBOK = '여성예복', //여성예복
  GIFT = '예물', //예물
  HONEYMOON = '신혼여행', //신혼여행
  PYEBACK = '폐백음식', //폐백음식
  BOUQUET = '부케/꽃장식', //부케/꽃장식
  MUSIC = '축하연주', //축하연주
  SHOES = '웨딩슈즈', // 웨딩슈즈
  CAR = '웨딩카', // 웨딩카
  APPLIANCES = '혼수가전', //혼수가전
  FURNITURE = '혼수가구', //혼수가구
  YEDAN = '침구', //침구
  PROPOSE = '파티/이벤트', //파티/이벤트
  LETTER = '청첩장', //청첩장
  RETURN_ITEM = '답례품', //답례품
  CARE = '스킨케어/마사지', //스킨케어/마사지
  OVERSEAS_PHOTO = '해외촬영', //해외촬영
}

// category_name
export const getType12CategoryName = (category: IcashMissionType12Category) => {
  switch (category) {
    case IcashMissionType12Category.IWEDDING:
      return '아이웨딩';
    case IcashMissionType12Category.WEDDINGHALL:
      return '웨딩홀';
    case IcashMissionType12Category.STUDIO:
      return '사진';
    case IcashMissionType12Category.DRESS:
      return '드레스';
    case IcashMissionType12Category.MAKEUP:
      return '헤어/메이크업';
    case IcashMissionType12Category.VIDEO_ALBUM:
      return '영상앨범';
    case IcashMissionType12Category.KOR_DRESS:
      return '한복';
    case IcashMissionType12Category.MAN_YEBOK:
      return '남성예복';
    case IcashMissionType12Category.WOMAN_YEBOK:
      return '여성예복';
    case IcashMissionType12Category.GIFT:
      return '예물';
    case IcashMissionType12Category.HONEYMOON:
      return '신혼여행';
    case IcashMissionType12Category.PYEBACK:
      return '폐백/이바지';
    case IcashMissionType12Category.BOUQUET:
      return '부케';
    case IcashMissionType12Category.MUSIC:
      return '연주/사회자';
    case IcashMissionType12Category.SHOES:
      return '웨딩슈즈';
    case IcashMissionType12Category.CAR:
      return '웨딩카';
    case IcashMissionType12Category.APPLIANCES:
      return '가전';
    case IcashMissionType12Category.FURNITURE:
      return '가구';
    case IcashMissionType12Category.YEDAN:
      return '예단';
    case IcashMissionType12Category.PROPOSE:
      return '프러포즈';
    case IcashMissionType12Category.LETTER:
      return '청첩장';
    case IcashMissionType12Category.RETURN_ITEM:
      return '도시락/답례품';
    case IcashMissionType12Category.CARE:
      return '뷰티케어';
    case IcashMissionType12Category.OVERSEAS_PHOTO:
      return '해외촬영';
  }
};
