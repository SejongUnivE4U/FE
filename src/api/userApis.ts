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

// export const changePassword = async (password: string) => {
//   try {
//     const response = await instance.post('/user/set-info', { password });
//     return response.data;
//   } catch (error) {
//     console.error('Error changing password:', error);
//     throw error;
//   }
// };
