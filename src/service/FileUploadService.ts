import myAxios from '@utils/MyAxios';

export const uploadFile = (file: any) => {
  const formData = new FormData();
  formData.append('file', file);
  return myAxios.post('/upload/mission', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
