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
    return error;
  }
};
export const getDataStore = async () => {
  try {
    const response = await jwtInterceptor('Store/GetAllStores');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return error;
  }
};
export const listAllCate = async () => {
  try {
    const response = await jwtInterceptor('Category/GetAllCategories');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    return error;
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
    return error;
  }
};
