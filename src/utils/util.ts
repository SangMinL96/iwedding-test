import moment from 'moment';
import moment_timezone from 'moment-timezone';
import eventAll from '@images/common/eventAll.png';
import contentAll from '@images/common/contentAll.png';
moment.tz.setDefault('Asia/Seoul');
moment_timezone.tz.setDefault('Asia/Seoul');
import { isWebview } from '@utils/isWebview';
import router from 'next/router';

export function replaceStringAll(origin: string, from: string, to: string) {
  const regex = new RegExp(from, 'gi');
  return origin.replace(regex, to);
}

export function showPrice(x: number | string | undefined) {
  if (!x) return 0;
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function unixToDateTime(unix: number | string) {
  return moment.unix(Number(unix)).tz('Asia/Seoul').format('YYYY-MM-DD HH:mm');
}

export function validatePhoneFormat(phoneNumber: string) {
  return /^[0-9]{3}[-]+[0-9]{4}[-]+[0-9]{4}$/.test(phoneNumber);
}

export function calDay(addDay: number, targetDate: Date = new Date()) {
  return moment(targetDate).add(addDay, 'days');
}

export function calMonth(addMonth: number, targetDate: Date = new Date()) {
  return moment(targetDate).add(addMonth, 'month');
}

export function calYear(addYear: number, targetDate: Date = new Date()) {
  return moment(targetDate).add(addYear, 'year');
}

export function isBefore(curDate: Date, targetDate: Date = new Date()) {
  return moment(curDate).isBefore(targetDate);
}

export function isAfter(curDate: Date, targetDate: Date = new Date()) {
  return moment(curDate).isAfter(targetDate);
}

export function getDateTodayORdate(toDate?: Date | string) {
  let format = '';
  if (moment_timezone(new Date()).format('YYYY-MM-DD') === moment_timezone(toDate).format('YYYY-MM-DD')) {
    format = '오늘 HH:mm A';
  } else {
    format = 'YYYY-MM-DD HH:mm A';
  }

  if (toDate) return moment_timezone(toDate).format(format);
  return moment_timezone().format(format);
}

export function getDateWithTimeZone(toDate?: Date | string, isUtc = true) {
  const format = 'YYYY-MM-DD';
  if (toDate) {
    if (isUtc) {
      return moment.utc(toDate).format(format);
    } else {
      return moment(toDate).format(format);
    }
  }
  return moment().format(format);
}

export function getDate(toDate?: Date | string, isUtc = true) {
  const format = 'YYYY-MM-DD';
  if (toDate != undefined) {
    if (isUtc) {
      return moment.utc(toDate).format(format);
    } else {
      return moment(toDate).format(format);
    }
  }
  return moment().format(format);
}

export function getDateTime(toDate?: Date | string, isUtc = true) {
  const format = 'YYYY-MM-DD HH:mm';
  if (toDate != undefined) {
    if (isUtc) {
      return moment.utc(toDate).format(format);
    } else {
      return moment(toDate).format(format);
    }
  }
  return moment().format(format);
}

export function getTime(toDate?: Date | string, isUtc = true) {
  const format = 'HH:mm';
  if (toDate != undefined) {
    if (isUtc) {
      return moment.utc(toDate).format(format);
    } else {
      return moment(toDate).format(format);
    }
  }
  return moment().format(format);
}

export function getDateTimeSS(toDate?: Date | string, isUtc = true) {
  const format = 'YYYY-MM-DD HH:mm:ss';
  if (toDate) {
    if (isUtc) {
      return moment.utc(toDate).format(format);
    } else {
      return moment(toDate).format(format);
    }
  }
  return moment().format(format);
}

export function getDateTimeSST(toDate?: Date | string, isUtc = true) {
  const format = 'YYYY-MM-DDTHH:mm:ss';
  if (toDate) {
    if (isUtc) {
      return moment.utc(toDate).format(format);
    } else {
      return moment(toDate).format(format);
    }
  }
  return moment().format(format);
}

export function isEmpty(arg: any): boolean {
  return (
    arg == null || // Check for null or undefined
    arg.length === 0 || // Check for empty String (Bonus check for empty Array)
    (typeof arg === 'object' && Object.keys(arg).length === 0) // Check for empty Object or Array
  );
}

export function isNotEmpty(arg: any): boolean {
  return !(arg == null || arg.length === 0 || (typeof arg === 'object' && Object.keys(arg).length === 0));
}

export function replaceAll(str: string, target: string, to: string): string {
  const regex = new RegExp(`/${target}/gi`);
  return str.replace(regex, to);
}

export function trim(str: string): string {
  return str.replace(/ /gi, '');
}

export function overFlowVisible() {
  if (global.document) {
    const nextBody = document.getElementById('nextBody');
    if (nextBody) nextBody.style.overflow = 'visible';
  }
}

export function overFlowHidden() {
  if (global.document) {
    const nextBody = document.getElementById('nextBody');
    if (nextBody) nextBody.style.overflow = 'hidden';
  }
}

export function schemeOpenUrl(url: string, is_product = false) {
  let hrefUrl = url;
  if (is_product) {
    hrefUrl += '&cart=1&share=1&icard_no=';
  }
  location.href = hrefUrl;
}
export function schemeOrTab(url: string, is_product = false) {
  router.replace(url);
}

export function goToProductPage(ent_code: string, product_no: number) {
  const url = `${process.env.NEXT_PUBLIC_WEB_HOST}/enterprise/prd/${ent_code}/${product_no}`;
  schemeOrTab(url, true);
}

export function goToEntPage(ent_code: string) {
  const url = `${process.env.NEXT_PUBLIC_WEB_HOST}/enterprise/info/${ent_code}`;
  schemeOrTab(url);
}

export function goToBrandPage(brandNum: number) {
  const url = `${process.env.NEXT_PUBLIC_WEB_HOST}/brandplus/brandplus_view/${brandNum}`;
  schemeOrTab(url);
}

export function openNewTab(url: string) {
  window.open(url, '_blank');
}

export function getScrollY() {
  return Math.max(document.body.scrollTop, document.documentElement.scrollTop, document.documentElement.offsetTop);
}

export function setScrollY(num: number) {
  if (typeof window !== 'undefined') setTimeout(() => window.scrollTo({ top: num, behavior: 'smooth' }), 50);
}

export function schemeOpenCard(card_number: number) {
  location.href = `ifamilyicardapp://action?what=opencard&icard_no=${card_number}`;
}

export function copyToClipBoard(str: string) {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}

export const urlReplace = (url: string) => {
  if (url.includes('http://www.ifamily.co.kr')) {
    const setUrl = url.replace('http://www.ifamily.co.kr', '');
    return `http://ifamily.co.kr${setUrl}`;
  } else {
    const setUrl = url.replace('http://ifamily.co.kr', '');
    return `http://ifamily.co.kr${setUrl}`;
  }
};

export const rsvUrlReplace = (url: string) => {
  const setUrl = url.replace('//www.ifamily.co.kr', '');
  return `http://ifamily.co.kr${setUrl}`;
};

export const webViewReplace = (url: string) => {
  global.window && window.location.replace(url);
};

export const deleteAllHash = (url: string) => url.replace(/#.*/, '');

function regexExpEscape(str) {
  return str.replace(/[-[\]{}()*+!<=:?.\/\\^$|#\s,]/g, '\\$&');
}

export const makeBold = (item, searchText) => {
  const regex = new RegExp(regexExpEscape(searchText), 'g');

  return item.replace(regex, `<span className='searchTextStyle'>${searchText}</span>`);
};

export const goAppInstall = (isIos: boolean) => {
  if (isIos) {
    global.window && window.location.replace('https://apps.apple.com/kr/app/%EC%95%84%EC%9D%B4%EC%9B%A8%EB%94%A9/id406943343');
  } else {
    global.window && window.location.replace('https://play.google.com/store/apps/details?id=com.iwedding.app');
  }
};

export const hangleCategory = (category: string) => {
  switch (category) {
    case 'brand':
      return '브랜드';
    case 'product':
      return '상품';
    case 'contents':
      return '콘텐츠';
    case 'event':
      return '이벤트';
    default:
      return '';
  }
};

export const allCategory = (type: string) => {
  if (type === 'event') {
    return { category: '전체', displayName: '전체', thumbnailURL: eventAll };
  } else {
    return { category: '전체', displayName: '전체', thumbnailURL: contentAll };
  }
};

export const openPopup = (url, popUpName) => {
  const width = 500;
  const height = 900;

  // 팝업을 가운데 위치시키기 위해 아래와 같이 값 구하기
  const _left = Math.ceil((global.window && window.screen.width - width) / 2);
  const _top = Math.ceil((global.window && window.screen.height - height) / 2);

  window.open(url, popUpName, 'width=' + width + ', height=' + height);
};
