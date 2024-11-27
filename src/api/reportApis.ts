import instance from './axios';

export const uploadImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await instance.post('/symptom/imageUpload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
    throw error;
  }
};

export const fetchDiagnosisReport = async (reportId: number) => {
  try {
    const response = await instance.get(`/diagnosis/user/${reportId}`);
    return response.data;
  } catch (error) {
    console.error('리포트 데이터 가져오기 실패:', error);
    throw error;
  }
};
