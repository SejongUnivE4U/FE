import instance from './axios';

// 이미지 업로드 API
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

// 리포트 데이터 가져오기 API
export const fetchDiagnosisReport = async (reportId: number) => {
  try {
    const response = await instance.get(`/diagnosis/user/${reportId}`);
    return response.data;
  } catch (error) {
    console.error('리포트 데이터 가져오기 실패:', error);
    throw error;
  }
};

// 증상 제출 API
export const submitSymptom = async (
  painLevel: number,
  symptomText: string[],
  symptomArea: string[],
) => {
  try {
    const queryParams = new URLSearchParams({
      painLevel: String(painLevel),
      symptomText: JSON.stringify(symptomText),
      symptomArea: JSON.stringify(symptomArea),
    });

    const response = await instance.post(`/symptom/submit?${queryParams}`);
    return response.data;
  } catch (error) {
    console.error('증상 데이터 제출 실패:', error);
    throw error;
  }
};

// 전체 리포트 리스트 가져오기 API
export const fetchAllDiagnosisReports = async () => {
  try {
    const response = await instance.get('/diagnosis/user');
    return response.data;
  } catch (error) {
    console.error('전체 리포트 리스트 가져오기 실패:', error);
    throw error;
  }
};
