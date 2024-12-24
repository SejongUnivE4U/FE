import instance from './axios';

// 커뮤니티 생성 API
export const createCommunity = async (communityName: string) => {
  try {
    const response = await instance.post(`/community/create`, null, {
      params: { communityName },
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('커뮤니티 생성 실패:', error);
    throw error;
  }
};

// 커뮤니티 목록 조회 API
export const fetchCommunities = async () => {
  try {
    const response = await instance.get('/community');
    return response.data;
  } catch (error) {
    console.error('커뮤니티 조회 실패:', error);
    throw error;
  }
};
