import { jwtInterceptor } from "../jwtInterceptor";


export const getDataProfile = async () => {
  try {
    const response = await jwtInterceptor('Account/ShowProfile');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return error;
  }
};

export const editUser = async (data) => {
    try {
      const response = await jwtInterceptor('Account/UpdateProfile', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    } catch (error) {
      console.error('Error posting data:', error);
      return error;
    }
  };
  