import myAxios from '@utils/MyAxios';

interface SynologyErrorMsg {
  message: string;
}

export const sendErrorToSynology = async ({ message }: SynologyErrorMsg) => {
  if (process.env.NODE_ENV === 'production') {
    const errorBody = new FormData();
    errorBody.append('message', message);

    await myAxios.post('/api_v1/log/send_alarm', errorBody, {
      baseURL: process.env.NEXT_PUBLIC_WEB_HOST,
      withCredentials: true,
    });
  }
};
