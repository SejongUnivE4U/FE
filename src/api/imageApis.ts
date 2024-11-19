import instance from './axios';

export const uploadImageToS3 = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await instance.post('/s3/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.imagePath; // 서버로부터 반환된 URL
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error; // 필요 시 에러를 호출한 곳에서 처리할 수 있도록 던짐
  }
};
