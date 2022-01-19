import { DeviceType } from '@modules/CommonInterface';

export const getDeviceType = () => {
  if (typeof window == 'undefined') return;

  const ua = global?.window.navigator.userAgent;

  if (/IWDAPPV4/.test(ua)) return DeviceType.APP; // 3
  if (/Android|iOS|iPhone/.test(ua)) return DeviceType.MOBILE; // 2
  return DeviceType.PC; // 1
};
