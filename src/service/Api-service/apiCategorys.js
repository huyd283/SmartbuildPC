import { jwtInterceptor } from "../jwtInterceptor";


export const getDataCate = async () => {
  try {
    const response = await jwtInterceptor('BuildPC/categories');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const postDataCate = async (data) => {
  try {
    const response = await jwtInterceptor('/data', {
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
    throw error;
  }
};
