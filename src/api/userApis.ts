import instance from './axios';

export const fetchUserData = async () => {
  try {
    const response = await instance.get('/user');
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
