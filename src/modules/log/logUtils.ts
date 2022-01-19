import { DeviceType } from '@modules/CommonInterface';
import { getDeviceType } from '@utils/getDeviceType';

export const WEB_LOG_USER2_URL = 'js_data/web_log_user2';

export const getLoggerDeviceType = () => {
  const device = getDeviceType();

  return device === DeviceType.APP ? 0 : device;
};

export const loggerDeviceCategory = ['APP(아이웨딩)', 'PC웹(iwedding)', 'Mobile웹(iwedding)'];
