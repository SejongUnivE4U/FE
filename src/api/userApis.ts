import instance from './axios';

// 홈 페이지 유저 데이터 가져오기 API
export const fetchUserData = async () => {
  try {
    const response = await instance.get('/user');
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
