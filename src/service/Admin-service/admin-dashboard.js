import { jwtInterceptor } from "../jwtInterceptor";

export const getStatistics = async () => {
    try {
      const response = await jwtInterceptor('Dashboard/GetStatistics');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      return error;
    }
  };