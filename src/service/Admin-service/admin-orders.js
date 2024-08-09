import { jwtInterceptor } from "../jwtInterceptor";

export const getListOrders = async (id) => {
    try {
      const response = await jwtInterceptor('Order/ListOrderCustomer');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      return error;
    }
  };